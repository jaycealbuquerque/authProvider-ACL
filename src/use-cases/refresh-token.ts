import { sign, verify } from 'jsonwebtoken'
import { env } from '../env'
import { PrismaUserTokenRepository } from '../repositories/prisma/prisma-users-token-repository'
import { AppError } from '../erros/AppError'
import dayjs from 'dayjs'

export class RefreshTokenUseCase {
  async execute(token: string) {
    const { email, sub } = verify(token, env.SECRET_REFRESH_TOKEN)

    const prismaUserTokenRepository = new PrismaUserTokenRepository()
    const user_id = sub
    const userToken =
      await prismaUserTokenRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      )
    if (!userToken) {
      throw new AppError('Refresh Token does not exists!')
    }

    await prismaUserTokenRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, env.SECRET_REFRESH_TOKEN, {
      subject: user_id,
      expiresIn: env.EXPIRES_IN_REFRESH_TOKEN,
    })

    const refresh_token_expires_date = dayjs().add(1).toDate()

    await prismaUserTokenRepository.create({
      user_id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    })

    const newToken = sign({}, env.SECRET_REFRESH_TOKEN, {
      subject: user_id,
      expiresIn: env.EXPIRES_IN_REFRESH_TOKEN,
    })

    return {
      refresh_token,
      token: newToken,
    }
  }
}

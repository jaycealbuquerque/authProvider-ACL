import { sign, verify } from 'jsonwebtoken'
import { env } from '../../env'
import { AppError } from '../../erros/AppError'
import dayjs from 'dayjs'
import { IUsersTokenRepository } from '../../repositories/IUsersTokenRepository'

export class RefreshTokenUseCase {
  constructor(private UsersTokenRepository: IUsersTokenRepository) {}

  async execute(token: string) {
    const { email, sub } = verify(token, env.SECRET_REFRESH_TOKEN)

    const user_id = sub
    const userToken =
      await this.UsersTokenRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      )
    if (!userToken) {
      throw new AppError('Refresh Token does not exists!')
    }

    await this.UsersTokenRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, env.SECRET_REFRESH_TOKEN, {
      subject: user_id,
      expiresIn: env.EXPIRES_IN_REFRESH_TOKEN,
    })

    const refresh_token_expires_date = dayjs().add(1, 'days').toDate()

    await this.UsersTokenRepository.create({
      user_id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    })

    const newToken = sign({}, env.JWT_SECRET, {
      subject: user_id,
      expiresIn: env.EXPIRES_IN_TOKEN,
    })

    return {
      refresh_token,
      token: newToken,
    }
  }
}

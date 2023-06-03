import dayjs from 'dayjs'
import { AppError } from '../erros/AppError'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { PrismaUserTokenRepository } from '../repositories/prisma/prisma-users-token-repository'
import { hash } from 'bcryptjs'
import { User } from '@prisma/client'

interface IRequest {
  token: string
  password: string
}

export class ResetPasswordUserUseCase {
  async execute({ token, password }: IRequest): Promise<void> {
    const prismaUsersRepository = new PrismaUsersRepository()
    const prismaUserTokenRepository = new PrismaUserTokenRepository()
    console.log(token, password)
    const userToken = await prismaUserTokenRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError('Token invalid!')
    }

    if (dayjs(userToken.expires_date).isBefore(dayjs().toDate())) {
      throw new AppError('Token expired!')
    }

    const user = (await prismaUsersRepository.findById(
      userToken.user_id,
    )) as User

    const password_hash = await hash(password, 8)

    await prismaUsersRepository.updatePassword(user.id, password_hash)

    await prismaUserTokenRepository.deleteById(userToken.id)
  }
}

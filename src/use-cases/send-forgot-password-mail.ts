import dayjs from 'dayjs'
import { AppError } from '../erros/AppError'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { uuid as uuidv4 } from 'uuidv4'
import { PrismaUserTokenRepository } from '../repositories/prisma/prisma-users-token-repository'

export class SendForgotPasswordUseCase {
  public async execute(email: string) {
    const prismaUsersRepository = new PrismaUsersRepository()
    const prismaUserTokenRepository = new PrismaUserTokenRepository()

    const user = await prismaUsersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User does not exists!')
    }
    const token = uuidv4()

    const expires_date = dayjs().add(1, 'hour').toDate()

    await prismaUserTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    })

    return { user }
  }
}

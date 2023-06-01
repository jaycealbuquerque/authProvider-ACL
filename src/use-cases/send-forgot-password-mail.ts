import dayjs from 'dayjs'
import { AppError } from '../erros/AppError'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { v4 as uuidV4 } from 'uuid'
import { PrismaUserTokenRepository } from '../repositories/prisma/prisma-users-token-repository'
import { EtherealMailProvider } from '../providers/mailProvider/ethereal-mail-provider'

export class SendForgotPasswordUseCase {
  public async execute(email: string) {
    const prismaUsersRepository = new PrismaUsersRepository()
    const prismaUserTokenRepository = new PrismaUserTokenRepository()
    const etherealMailProvider = new EtherealMailProvider()

    const user = await prismaUsersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User does not exists!')
    }
    const token = uuidV4()

    const expires_date = dayjs().add(1, 'hour').toDate()

    await prismaUserTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    })

    await etherealMailProvider.sendMail(
      email,
      'recuperação de senha',
      `O link para resetar a senha é ${token}`,
    )

    return { user }
  }
}

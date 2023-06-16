import { EtherealMailProvider } from '../../providers/mailProvider/ethereal-mail-provider'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { PrismaUserTokenRepository } from '../../repositories/prisma/prisma-users-token-repository'
import { SendForgotPasswordUseCase } from '../send-forgot-password-mail'

export function makeSendForgotPasswordUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaUserTokenRepository = new PrismaUserTokenRepository()
  const etherealMailProvider = new EtherealMailProvider()

  const sendForgotPassword = new SendForgotPasswordUseCase(
    prismaUsersRepository,
    prismaUserTokenRepository,
    etherealMailProvider,
  )
  return sendForgotPassword
}

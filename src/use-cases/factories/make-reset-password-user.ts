import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { PrismaUserTokenRepository } from '../../repositories/prisma/prisma-users-token-repository'
import { ResetPasswordUserUseCase } from '../reset-password-user'

export function makeResetPasswordUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaUserTokenRepository = new PrismaUserTokenRepository()
  const resetPasswordUserUseCase = new ResetPasswordUserUseCase(
    prismaUsersRepository,
    prismaUserTokenRepository,
  )
  return resetPasswordUserUseCase
}

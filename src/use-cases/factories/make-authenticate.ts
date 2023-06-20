import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { PrismaUserTokenRepository } from '../../repositories/prisma/prisma-users-token-repository'
import { AuthenticateUseCase } from '../users/authenticate'

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaUserTokenRepository = new PrismaUserTokenRepository()

  const authenticateUseCase = new AuthenticateUseCase(
    prismaUsersRepository,
    prismaUserTokenRepository,
  )
  return authenticateUseCase
}

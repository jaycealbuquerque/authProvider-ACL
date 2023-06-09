import { PrismaUserTokenRepository } from '../../repositories/prisma/prisma-users-token-repository'
import { RefreshTokenUseCase } from '../users/refresh-token'

export function makeRefreshTokenUseCase() {
  const prismaUserTokenRepository = new PrismaUserTokenRepository()
  const refreshTokenUseCase = new RefreshTokenUseCase(prismaUserTokenRepository)
  return refreshTokenUseCase
}

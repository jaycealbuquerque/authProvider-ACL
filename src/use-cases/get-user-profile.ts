import { User } from '@prisma/client'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { AppError } from '../erros/AppError'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}
export class GetUserProfileUseCase {
  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const prismaUsersRepository = new PrismaUsersRepository()

    const user = await prismaUsersRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found.')
    }

    return { user }
  }
}

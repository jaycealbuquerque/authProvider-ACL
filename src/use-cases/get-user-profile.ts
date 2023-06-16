import { User } from '@prisma/client'
import { AppError } from '../erros/AppError'
import { IUsersRepository } from '../repositories/IUsersRepository'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}
export class GetUserProfileUseCase {
  constructor(private UsersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.UsersRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found.')
    }

    return { user }
  }
}

import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'

interface UserACLRequest {
  userId: string
  roles: string[]
  permissions: string[]
}

export class CreateUserAccessControllistUseCase {
  async execute({ userId, roles, permissions }: UserACLRequest) {
    const prismaUsersRepository = new PrismaUsersRepository()

    const user = await prismaUsersRepository.findById(userId)

    return user
  }
}

import { AppError } from '../erros/AppError'
import { PrismaPermissionsRepository } from '../repositories/prisma/prisma-permissions-repository'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'

interface UserACLRequest {
  userId: string
  role: string
}

export class CreateUserAccessControllistUseCase {
  async execute({ userId, role }: UserACLRequest) {
    const prismaUsersRepository = new PrismaUsersRepository()
    // const prismaPermissionsRepository = new PrismaPermissionsRepository()

    const user = await prismaUsersRepository.findById(userId)

    if (!user) {
      throw new AppError('User does not exists!')
    }

    const userss = await prismaUsersRepository.userACL(userId, role)

    return userss
  }
}

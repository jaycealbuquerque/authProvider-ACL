import { AppError } from '../erros/AppError'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'

interface UserACLRequest {
  userId: string
  roleId: string
  permissionId: string[]
}

export class CreateUserAccessControllistUseCase {
  async execute({ userId, roleId, permissionId }: UserACLRequest) {
    const prismaUsersRepository = new PrismaUsersRepository()

    const user = await prismaUsersRepository.findById(userId)

    if (!user) {
      throw new AppError('User does not exists!')
    }
    console.log(userId, roleId, permissionId)
    const userACL = await prismaUsersRepository.userACL(
      userId,
      roleId,
      permissionId,
    )

    return userACL
  }
}

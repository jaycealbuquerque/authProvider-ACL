import { AppError } from '../erros/AppError'
import { IUsersRepository } from '../repositories/IUsersRepository'

interface UserACLRequest {
  userId: string
  roleId: string
  permissionId: string[]
}

export class CreateUserAccessControllistUseCase {
  constructor(private UsersRepository: IUsersRepository) {}

  async execute({ userId, roleId, permissionId }: UserACLRequest) {
    // const prismaUsersRepository = new PrismaUsersRepository()

    const user = await this.UsersRepository.findById(userId)

    if (!user) {
      throw new AppError('User does not exists!')
    }
    console.log(userId, roleId, permissionId)
    const userACL = await this.UsersRepository.userACL(
      userId,
      roleId,
      permissionId,
    )

    return userACL
  }
}

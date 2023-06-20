import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { CreateUserAccessControllistUseCase } from '../access-control-lists/create-user-access-control-list'

export function makeCreateUserAccessControllistUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const createUserAccessControllistUseCase =
    new CreateUserAccessControllistUseCase(prismaUsersRepository)
  return createUserAccessControllistUseCase
}

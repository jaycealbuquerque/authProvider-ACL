import { PrismaRolesRepository } from '../../repositories/prisma/prisma-roles-repository'
import { CreateRoleUseCase } from '../access-control-lists/create-role'

export function makeCreateRoleUseCase() {
  const prismaRolesRepository = new PrismaRolesRepository()
  const createRoleUseCase = new CreateRoleUseCase(prismaRolesRepository)
  return createRoleUseCase
}

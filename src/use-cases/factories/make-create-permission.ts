import { PrismaPermissionsRepository } from '../../repositories/prisma/prisma-permissions-repository'
import { CreatePermissionUseCase } from '../access-control-lists/create-permission'

export function makeCreatePermissionUseCase() {
  const prismaPermissionsRepository = new PrismaPermissionsRepository()
  const createPermissionUseCase = new CreatePermissionUseCase(
    prismaPermissionsRepository,
  )
  return createPermissionUseCase
}

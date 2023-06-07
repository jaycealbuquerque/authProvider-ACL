import { PrismaRolesRepository } from '../repositories/prisma/prisma-roles-repository'
import { PrismaPermissionsRepository } from '../repositories/prisma/prisma-permissions-repository'
import { AppError } from '../erros/AppError'

interface RolePermissionRequest {
  roleId: string
  permissions: string[]
}

export class CreateRolePermissionUseCase {
  async execute({ roleId, permissions }: RolePermissionRequest) {
    const prismaRolesRepository = new PrismaRolesRepository()
    const prismaPermissionsRepository = new PrismaPermissionsRepository()

    const role = await prismaRolesRepository.findById(roleId)

    if (!role) {
      throw new AppError('Role does not exists!')
    }

    const permission = await prismaPermissionsRepository.findByIds(permissions)

    if (!(permission.length === permissions.length)) {
      throw new AppError('Permission does not exists!')
    }

    const permissionsOnRoles = await prismaRolesRepository.permissionsOnRoles(
      roleId,
      permissions,
    )

    return permissionsOnRoles
  }
}

import { PrismaRolesRepository } from '../repositories/prisma/prisma-roles-repository'
import { PrismaPermissionsRepository } from '../repositories/prisma/prisma-permissions-repository'
import { AppError } from '../erros/AppError'
import { prisma } from '../lib/prisma'

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

    const permi = await prismaPermissionsRepository.findByIds(permissions)

    // const permissionsOnRoles = await prisma.permissionsOnRoles.createMany({
    //   data: permissions.map((permi) => ({
    //     rolesId: roleId,
    //     permissionsId: permi,
    //   })),
    // })

    // await prisma.roles.update({
    //   where: {
    //     id: roleId,
    //   },
    //   data: {
    //     PermissionsOnRoles: {
    //       createMany: {
    //         data: permissions.map((permi) => ({
    //           permissionsId: permi,
    //         })),
    //       },
    //     },
    //   },
    // })
    // return permissionsOnRoles
  }
}

import { Prisma, Roles } from '@prisma/client'
import { IRolesRepository } from '../IRolesRepository'
import { prisma } from '../../lib/prisma'

export class PrismaRolesRepository implements IRolesRepository {
  async create(data: Prisma.RolesCreateInput): Promise<Roles> {
    const roles = await prisma.roles.create({
      data,
    })

    return roles
  }

  async findByName(name: string): Promise<Roles | null> {
    const roles = await prisma.roles.findUnique({
      where: {
        name,
      },
    })

    return roles
  }

  async findById(id: string): Promise<Roles | null> {
    const roles = await prisma.roles.findUnique({
      where: {
        id,
      },
    })

    return roles
  }

  async permissionsOnRoles(
    roleId: string,
    permissions: string[],
  ): Promise<Roles> {
    const rolesPermission = await prisma.roles.update({
      where: {
        id: roleId,
      },
      data: {
        PermissionsOnRoles: {
          createMany: {
            data: permissions.map((permission) => ({
              permissionsId: permission,
            })),
          },
        },
      },
    })
    return rolesPermission
  }
}

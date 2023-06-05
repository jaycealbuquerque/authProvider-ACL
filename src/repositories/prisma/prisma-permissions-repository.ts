import { Permissions, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { IPermissionRepository } from '../IPermissionRepository'

export class PrismaPermissionsRepository implements IPermissionRepository {
  async create(data: Prisma.PermissionsCreateInput): Promise<Permissions> {
    const roles = await prisma.permissions.create({
      data,
    })

    return roles
  }

  async findByName(name: string) {
    const roles = await prisma.roles.findUnique({
      where: {
        name,
      },
    })

    return roles
  }

  async findById(id: string) {
    const roles = await prisma.roles.findUnique({
      where: {
        id,
      },
    })

    return roles
  }
}

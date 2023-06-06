import { Permissions, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { IPermissionRepository } from '../IPermissionRepository'

export class PrismaPermissionsRepository implements IPermissionRepository {
  async create(data: Prisma.PermissionsCreateInput): Promise<Permissions> {
    const permissions = await prisma.permissions.create({
      data,
    })

    return permissions
  }

  async findByName(name: string) {
    const permissions = await prisma.permissions.findUnique({
      where: {
        name,
      },
    })

    return permissions
  }

  async findByIds(id: string[]) {
    const name = await prisma.permissions.findMany({
      where: {
        id: {
          in: id,
        },
      },
    })

    return name
  }
}

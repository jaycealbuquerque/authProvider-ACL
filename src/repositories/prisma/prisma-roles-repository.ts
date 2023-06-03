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

  async findOne(name: string): Promise<Roles | null> {
    const roles = await prisma.roles.findUnique({
      where: {
        name,
      },
    })

    return roles
  }
}

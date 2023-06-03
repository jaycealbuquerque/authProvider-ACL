import { Prisma, Roles } from '@prisma/client'

export interface IRolesRepository {
  create(data: Prisma.RolesCreateInput): Promise<Roles>
  findOne(name: string): Promise<Roles | null>
}

import { Prisma, Roles } from '@prisma/client'

export interface IRolesRepository {
  create(data: Prisma.RolesCreateInput): Promise<Roles>
  findByName(name: string): Promise<Roles | null>
  findById(id: string): Promise<Roles | null>
}

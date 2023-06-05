import { Prisma, Roles } from '@prisma/client'

export interface IPermissionRepository {
  create(data: Prisma.PermissionsCreateInput): Promise<Roles>
  findByName(name: string): Promise<Roles | null>
  findById(id: string): Promise<Roles | null>
}

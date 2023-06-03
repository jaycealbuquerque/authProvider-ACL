import { Prisma, Roles } from '@prisma/client'

export interface IPermissionRepository {
  create(data: Prisma.PermissionsCreateInput): Promise<Roles>
  findOne(name: string): Promise<Roles | null>
}

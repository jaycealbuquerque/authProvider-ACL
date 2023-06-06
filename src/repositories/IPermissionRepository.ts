import { Permissions, Prisma } from '@prisma/client'

export interface IPermissionRepository {
  create(data: Prisma.PermissionsCreateInput): Promise<Permissions>
  findByName(name: string): Promise<Permissions | null>
  findByIds(id: string[]): Promise<Permissions[] | null>
}

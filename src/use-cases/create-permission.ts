import { Permissions } from '@prisma/client'
import { AppError } from '../erros/AppError'
import { IPermissionRepository } from '../repositories/IPermissionRepository'

interface PermisisonRequest {
  name: string
  description: string
}

export class CreatePermissionUseCase {
  constructor(private PermissionRepository: IPermissionRepository) {}

  async execute({
    name,
    description,
  }: PermisisonRequest): Promise<Permissions> {
    // const prismaPermissionsRepository = new PrismaPermissionsRepository()

    if (await this.PermissionRepository.findByName(name)) {
      throw new AppError('Permission already exists')
    }
    const permissions = await this.PermissionRepository.create({
      name,
      description,
    })

    return permissions
  }
}

import { Permissions } from '@prisma/client'
import { PrismaPermissionsRepository } from '../repositories/prisma/prisma-permissions-repository'
import { AppError } from '../erros/AppError'

interface PermisisonRequest {
  name: string
  description: string
}

export class CreatePermissionUseCase {
  async execute({
    name,
    description,
  }: PermisisonRequest): Promise<Permissions> {
    const prismaPermissionsRepository = new PrismaPermissionsRepository()

    if (await prismaPermissionsRepository.findOne(name)) {
      throw new AppError('Permission already exists')
    }
    const permissions = await prismaPermissionsRepository.create({
      name,
      description,
    })

    return permissions
  }
}

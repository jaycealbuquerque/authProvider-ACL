import { Roles } from '@prisma/client'
import { PrismaRolesRepository } from '../repositories/prisma/prisma-roles-repository'
import { AppError } from '../erros/AppError'

interface RoleRequest {
  name: string
  description: string
}

export class CreateRoleUseCase {
  async execute({ name, description }: RoleRequest): Promise<Roles> {
    const prismaRolesRepository = new PrismaRolesRepository()

    if (await prismaRolesRepository.findOne(name)) {
      throw new AppError('Role already exists')
    }

    const role = await prismaRolesRepository.create({
      name,
      description,
    })

    return role
  }
}

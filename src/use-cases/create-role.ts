import { Roles } from '@prisma/client'
import { AppError } from '../erros/AppError'
import { IRolesRepository } from '../repositories/IRolesRepository'

interface RoleRequest {
  name: string
  description: string
}

export class CreateRoleUseCase {
  constructor(private RolesRepository: IRolesRepository) {}

  async execute({ name, description }: RoleRequest): Promise<Roles> {
    // const prismaRolesRepository = new PrismaRolesRepository()

    if (await this.RolesRepository.findByName(name)) {
      throw new AppError('Role already exists')
    }

    const role = await this.RolesRepository.create({
      name,
      description,
    })

    return role
  }
}

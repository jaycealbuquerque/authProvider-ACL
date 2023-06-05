import { Request, Response } from 'express'
import { CreateRolePermissionUseCase } from '../../../use-cases/create-role-permission'

export class CreateRolePermissionController {
  async handle(request: Request, response: Response) {
    const { roleId } = request.params
    const { permissions } = request.body

    const createRolePermissionUseCase = new CreateRolePermissionUseCase()

    const rolePermission = await createRolePermissionUseCase.execute({
      roleId,
      permissions,
    })

    return response.json(rolePermission)
  }
}

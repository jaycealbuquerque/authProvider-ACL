import { Request, Response } from 'express'
import { CreatePermissionUseCase } from '../../../use-cases/create-permission'

export class CreatePermissionController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const createPermissionUseCase = new CreatePermissionUseCase()

    const permission = await createPermissionUseCase.execute({
      name,
      description,
    })

    return response.json(permission)
  }
}

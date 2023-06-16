import { Request, Response } from 'express'
import { makeCreatePermissionUseCase } from '../../../use-cases/factories/make-create-permission'

export class CreatePermissionController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const createPermissionUseCase = makeCreatePermissionUseCase()

    const permission = await createPermissionUseCase.execute({
      name,
      description,
    })

    return response.json(permission)
  }
}

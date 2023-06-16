import { Request, Response } from 'express'
import { makeCreateRoleUseCase } from '../../../use-cases/factories/make-create-role'

export class CreateRoleController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const createRoleUseCase = makeCreateRoleUseCase()
    const role = await createRoleUseCase.execute({ name, description })

    return response.json(role)
  }
}

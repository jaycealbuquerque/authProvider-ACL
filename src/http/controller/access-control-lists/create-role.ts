import { Request, Response } from 'express'
import { CreateRoleUseCase } from '../../../use-cases/create-role'

export class CreateRoleController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body

    const createRoleUseCase = new CreateRoleUseCase()
    const role = await createRoleUseCase.execute({ name, description })

    return response.json(role)
  }
}

import { Request, Response } from 'express'
import { CreateUserAccessControllistUseCase } from '../../../use-cases/create-user-access-control-list'

export class CreateUserAccessControllistController {
  async handle(request: Request, response: Response) {
    const { userId, role } = request.body

    const createUserAccessControllistUseCase =
      new CreateUserAccessControllistUseCase()

    const createACL = await createUserAccessControllistUseCase.execute({
      userId,
      role,
    })

    return response.json(createACL)
  }
}

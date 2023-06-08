import { Request, Response } from 'express'
import { CreateUserAccessControllistUseCase } from '../../../use-cases/create-user-access-control-list'

export class CreateUserAccessControllistController {
  async handle(request: Request, response: Response) {
    const { userId } = request.body

    const createUserAccessControllistUseCase =
      new CreateUserAccessControllistUseCase()

    const createACL = await createUserAccessControllistUseCase.execute({
      userId,
    })

    return response.json(createACL)
  }
}

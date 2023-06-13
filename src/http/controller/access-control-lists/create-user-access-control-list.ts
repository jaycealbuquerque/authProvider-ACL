import { Request, Response } from 'express'
import { CreateUserAccessControllistUseCase } from '../../../use-cases/create-user-access-control-list'

export class CreateUserAccessControllistController {
  async handle(request: Request, response: Response) {
    const { userId, roleId, permissionId } = request.body

    const createUserAccessControllistUseCase =
      new CreateUserAccessControllistUseCase()

    console.log(userId, roleId, permissionId)

    const createACL = await createUserAccessControllistUseCase.execute({
      userId,
      roleId,
      permissionId,
    })

    return response.json(createACL)
  }
}

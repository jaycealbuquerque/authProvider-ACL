import { Request, Response } from 'express'
import { makeCreateUserAccessControllistUseCase } from '../../../use-cases/factories/make-create-user-access-control-list'

export class CreateUserAccessControllistController {
  async handle(request: Request, response: Response) {
    const { userId, roleId, permissionId } = request.body

    const createUserAccessControllistUseCase =
      makeCreateUserAccessControllistUseCase()

    const createACL = await createUserAccessControllistUseCase.execute({
      userId,
      roleId,
      permissionId,
    })

    return response.json(createACL)
  }
}

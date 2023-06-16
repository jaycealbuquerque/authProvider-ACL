import { Request, Response } from 'express'
import { makeGetUserProfileUseCase } from '../../../use-cases/factories/make-get-user-profile'

export class ProfileController {
  async handle(request: Request, response: Response) {
    const { userId } = request.body

    const getUserProfileUseCase = makeGetUserProfileUseCase()

    const user = await getUserProfileUseCase.execute({
      userId,
    })

    return response.json(user)
  }
}

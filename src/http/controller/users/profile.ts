import { Request, Response } from 'express'
import { GetUserProfileUseCase } from '../../../use-cases/get-user-profile'

export class ProfileController {
  async handle(request: Request, response: Response) {
    const { userId } = request.body

    const getUserProfileUseCase = new GetUserProfileUseCase()

    const user = await getUserProfileUseCase.execute({
      userId,
    })

    return response.json(user)
  }
}

import { Request, Response } from 'express'
import { AuthenticateUseCase } from '../../../use-cases/authenticate'

export class AuthenticateController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const authenticateUseCase = new AuthenticateUseCase()

    const result = await authenticateUseCase.execute({
      email,
      password,
    })

    // if (result instanceof Error) {
    //   return response.status(400).json(result.message)
    // }

    return response.json(result)
  }
}

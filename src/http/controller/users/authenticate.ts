import { Request, Response } from 'express'
import { makeAuthenticateUseCase } from '../../../use-cases/factories/make-authenticate'

export class AuthenticateController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const authenticateUseCase = makeAuthenticateUseCase()

    const result = await authenticateUseCase.execute({
      email,
      password,
    })

    return response.json(result)
  }
}

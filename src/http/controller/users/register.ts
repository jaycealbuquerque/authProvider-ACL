import { Request, Response } from 'express'
import { RegisterUseCase } from '../../../use-cases/register'

export class RegisterController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body

    const registerUseCase = new RegisterUseCase()

    const result = await registerUseCase.execute({
      name,
      email,
      password,
    })

    return response.json(result)
  }
}

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

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }
}

import { Request, Response } from 'express'
import { makeRegisterUseCase } from '../../../use-cases/factories/make-register'

export class RegisterController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body

    const registerUseCase = makeRegisterUseCase()

    const result = await registerUseCase.execute({
      name,
      email,
      password,
    })

    return response.json(result)
  }
}

import { Request, Response } from 'express'
import { ResetPasswordUserUseCase } from '../../../use-cases/reset-password-user'

export class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query
    const { password } = request.body

    const resetPasswordUserUseCase = new ResetPasswordUserUseCase()

    await resetPasswordUserUseCase.execute({ token: String(token), password })

    return response.send()
  }
}

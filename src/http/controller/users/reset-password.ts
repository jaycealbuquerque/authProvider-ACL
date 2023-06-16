import { Request, Response } from 'express'
import { makeResetPasswordUserUseCase } from '../../../use-cases/factories/make-reset-password-user'

export class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query
    const { password } = request.body

    const resetPasswordUserUseCase = makeResetPasswordUserUseCase()

    await resetPasswordUserUseCase.execute({ token: String(token), password })

    return response.send()
  }
}

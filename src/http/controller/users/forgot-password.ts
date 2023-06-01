import { Request, Response } from 'express'
import { SendForgotPasswordUseCase } from '../../../use-cases/send-forgot-password-mail'

export class SendForgotPasswordControler {
  async handle(request: Request, response: Response) {
    const { email } = request.body

    const sendForgotPassword = new SendForgotPasswordUseCase()

    await sendForgotPassword.execute(email)

    return response.send()
  }
}

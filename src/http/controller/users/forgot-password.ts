import { Request, Response } from 'express'
import { makeSendForgotPasswordUseCase } from '../../../use-cases/factories/make-send-forgot-password-mail'

export class SendForgotPasswordControler {
  async handle(request: Request, response: Response) {
    const { email } = request.body

    const sendForgotPassword = makeSendForgotPasswordUseCase()

    await sendForgotPassword.execute(email)

    return response.send()
  }
}

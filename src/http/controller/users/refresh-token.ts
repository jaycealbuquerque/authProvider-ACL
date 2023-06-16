import { Request, Response } from 'express'
import { makeRefreshTokenUseCase } from '../../../use-cases/factories/make-refresh-token'

export class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token

    const refreshTokenUseCase = makeRefreshTokenUseCase()

    const refresh_token = await refreshTokenUseCase.execute(token)

    return response.json(refresh_token)
  }
}

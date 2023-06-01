import { Request, Response } from 'express'
import { RefreshTokenUseCase } from '../../../use-cases/refresh-token'

export class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token

    const refreshTokenUseCase = new RefreshTokenUseCase()

    const refresh_token = await refreshTokenUseCase.execute(token)

    return response.json(refresh_token)
  }
}

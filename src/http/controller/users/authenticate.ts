import { Request, Response } from 'express'
import { AuthenticateUseCase } from '../../../use-cases/authenticate'
import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { PrismaUserTokenRepository } from '../../../repositories/prisma/prisma-users-token-repository'

export class AuthenticateController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const prismaUsersRepository = new PrismaUsersRepository()
    const prismaUserTokenRepository = new PrismaUserTokenRepository()

    const authenticateUseCase = new AuthenticateUseCase(
      prismaUsersRepository,
      prismaUserTokenRepository,
    )

    const result = await authenticateUseCase.execute({
      email,
      password,
    })

    return response.json(result)
  }
}

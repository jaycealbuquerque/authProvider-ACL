import { Request, Response } from 'express'
import { RegisterUseCase } from '../../../use-cases/register'
import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'

export class RegisterController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body

    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    const result = await registerUseCase.execute({
      name,
      email,
      password,
    })

    return response.json(result)
  }
}

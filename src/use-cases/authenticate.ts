import { compare } from 'bcryptjs'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  public async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse | Error> {
    const prismaUsersRepository = new PrismaUsersRepository()
    const user = await prismaUsersRepository.findByEmail(email)

    if (!user) {
      return new Error('Invalid Credentials')
    }

    const doestPasswordMatches = await compare(password, user.password_hash)

    if (!doestPasswordMatches) {
      return new Error('Invalid Credentials')
    }

    return { user }
  }
}

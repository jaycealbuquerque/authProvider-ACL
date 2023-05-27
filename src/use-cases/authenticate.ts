import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { User } from '@prisma/client'
import { env } from '../env'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
  token: string
}

export class AuthenticateUseCase {
  public async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse | Error> {
    const prismaUsersRepository = new PrismaUsersRepository()

    const user = await prismaUsersRepository.findByEmail(email)
    console.log(user)

    if (!user) {
      return new Error('Invalid Credentials')
    }

    const doestPasswordMatches = await compare(password, user.password_hash)

    if (!doestPasswordMatches) {
      return new Error('Invalid Credentials')
    }

    const token = sign({}, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1d',
    })

    const tokenReturn: AuthenticateUseCaseResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    }
    return tokenReturn
  }
}

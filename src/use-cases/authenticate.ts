import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { User } from '@prisma/client'
import { env } from '../env'
import { AppError } from '../erros/AppError'

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
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const prismaUsersRepository = new PrismaUsersRepository()

    const user = await prismaUsersRepository.findByEmail(email)
    console.log(user)

    if (!user) {
      throw new AppError('Invalid Credentials')
    }

    const doestPasswordMatches = await compare(password, user.password_hash)

    if (!doestPasswordMatches) {
      throw new AppError('Invalid Credentials')
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

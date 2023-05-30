import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { User } from '@prisma/client'
import { env } from '../env'
import { AppError } from '../erros/AppError'
import { PrismaUserTokenRepository } from '../repositories/prisma/prisma-users-token-repository'
import dayjs from 'dayjs'
import { number } from 'zod'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
  token: string
  refresh_token: string
}

export class AuthenticateUseCase {
  public async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const prismaUsersRepository = new PrismaUsersRepository()
    const prismaUserTokenRepository = new PrismaUserTokenRepository()

    const user = await prismaUsersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid Credentials')
    }

    const doestPasswordMatches = await compare(password, user.password_hash)

    if (!doestPasswordMatches) {
      throw new AppError('Invalid Credentials')
    }

    const token = sign({}, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: env.EXPIRES_IN_TOKEN,
    })

    const refresh_token = sign({ email }, env.SECRET_REFRESH_TOKEN, {
      subject: user.id,
      expiresIn: env.EXPIRES_IN_REFRESH_TOKEN,
    })

    function addDay(days: number): Date {
      return dayjs().add(days, 'days').toDate()
    }

    const refresh_token_expires_date = dayjs().add(1).toDate()

    await prismaUserTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    })

    const tokenReturn: AuthenticateUseCaseResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    }
    return tokenReturn
  }
}

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { User } from '@prisma/client'
import { env } from '../../env'
import { AppError } from '../../erros/AppError'
import dayjs from 'dayjs'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersTokenRepository } from '../../repositories/IUsersTokenRepository'

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
  constructor(
    private UsersRepository: IUsersRepository,
    private UsersTokenRepository: IUsersTokenRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.UsersRepository.findByEmail(email)

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

    const refresh_token_expires_date = dayjs().add(1, 'days').toDate()

    await this.UsersTokenRepository.create({
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

import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { AppError } from '../erros/AppError'
import { IUsersRepository } from '../repositories/IUsersRepository'

interface IRequest {
  name: string
  email: string
  password: string
}

interface IResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private UsersRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRequest): Promise<IResponse> {
    const hashedPassword = await hash(password, 8)

    const hasEmail = await this.UsersRepository.findByEmail(email)

    if (hasEmail) {
      throw new AppError('Email already exists')
    }

    const user = await this.UsersRepository.create({
      name,
      email,
      password_hash: hashedPassword,
    })

    return { user }
  }
}

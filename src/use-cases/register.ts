import { User } from '@prisma/client'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { hash } from 'bcryptjs'
import { AppError } from '../erros/AppError'

interface IRequest {
  name: string
  email: string
  password: string
}

interface IResponse {
  user: User
}

export class RegisterUseCase {
  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const prismaUsersRepository = new PrismaUsersRepository()

    const hashedPassword = await hash(password, 8)

    const hasEmail = await prismaUsersRepository.findByEmail(email)

    if (hasEmail) {
      throw new AppError('Email already exists')
    }

    const user = await prismaUsersRepository.create({
      name,
      email,
      password_hash: hashedPassword,
    })

    return { user }
  }
}

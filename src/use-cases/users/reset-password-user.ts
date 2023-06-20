import dayjs from 'dayjs'
import { AppError } from '../../erros/AppError'
import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { IUsersTokenRepository } from '../../repositories/IUsersTokenRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  token: string
  password: string
}

export class ResetPasswordUserUseCase {
  constructor(
    private UsersTokenRepository: IUsersTokenRepository,
    private UsersRepository: IUsersRepository,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.UsersTokenRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError('Token invalid!')
    }

    if (dayjs(userToken.expires_date).isBefore(dayjs().toDate())) {
      throw new AppError('Token expired!')
    }

    const user = (await this.UsersRepository.findById(
      userToken.user_id,
    )) as User

    const password_hash = await hash(password, 8)

    await this.UsersRepository.updatePassword(user.id, password_hash)

    await this.UsersTokenRepository.deleteById(userToken.id)
  }
}

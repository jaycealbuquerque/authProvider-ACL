import { Prisma, UsersToken } from '@prisma/client'
import { IUsersTokenRepository } from '../IUsersTokenRepository'
import { prisma } from '../../lib/prisma'

export class PrismaUserTokenRepository implements IUsersTokenRepository {
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UsersToken> {
    const usersToken = await prisma.usersToken.findFirst({
      where: {
        user_id,
        refresh_token,
      },
    })
    return usersToken
  }

  async deleteById(id: string): Promise<void> {
    await prisma.usersToken.delete({
      where: { id },
    })
  }

  findByRefreshToken(refresh_token: string): Promise<UsersToken> {
    throw new Error('Method not implemented.')
  }

  async create(data: Prisma.UsersTokenCreateInput): Promise<UsersToken> {
    const userToken = await prisma.usersToken.create({
      data,
    })

    return userToken
  }
}

import { Prisma, UsersToken } from '@prisma/client'
import { IUsersTokenRepository } from '../IUsersTokenRepository'
import { prisma } from '../../lib/prisma'

export class PrismaUserTokenRepository implements IUsersTokenRepository {
  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string) {
    const usersToken = await prisma.usersToken.findFirst({
      where: {
        user_id,
        refresh_token,
      },
    })
    return usersToken
  }

  async deleteById(id: string) {
    await prisma.usersToken.delete({
      where: { id },
    })
  }

  async findByRefreshToken(refresh_token: string) {
    const userToken = await prisma.usersToken.findFirst({
      where: {
        refresh_token,
      },
    })
    return userToken
  }

  async create(data: Prisma.UsersTokenCreateInput) {
    const userToken = await prisma.usersToken.create({
      data,
    })

    return userToken
  }
}

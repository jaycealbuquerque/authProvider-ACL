import { Prisma, UsersToken } from '@prisma/client'
import { IUsersTokenRepository } from '../IUsersTokenRepository'
import { prisma } from '../../lib/prisma'

export class PrismaUserTokenRepository implements IUsersTokenRepository {
  async create(data: Prisma.UsersTokenCreateInput): Promise<UsersToken> {
    const userToken = await prisma.usersToken.create({
      data,
    })

    return userToken
  }
}

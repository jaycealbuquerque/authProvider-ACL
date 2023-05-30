import { Prisma, UsersToken } from '@prisma/client'

export interface IUsersTokenRepository {
  create(data: Prisma.UsersTokenCreateInput): Promise<UsersToken>
}

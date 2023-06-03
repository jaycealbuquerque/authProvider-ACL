import { Prisma, UsersToken } from '@prisma/client'

export interface IUsersTokenRepository {
  create(data: Prisma.UsersTokenCreateInput): Promise<UsersToken>
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UsersToken | null>
  deleteById(id: string): Promise<void>
  findByRefreshToken(refresh_token: string): Promise<UsersToken | null>
}

import { Prisma, User } from '@prisma/client'

export interface IUsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  updatePassword(id: string, password_hash: string): Promise<User>
  userACL(userId: string, roleId: string): Promise<User>
}

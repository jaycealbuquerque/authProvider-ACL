import { User, Prisma } from '@prisma/client'
import { IUsersRepository } from '../IUsersRepository'
import { prisma } from '../../lib/prisma'

export class PrismaUsersRepository implements IUsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async updatePassword(id: string, password_hash: string) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password_hash,
      },
    })

    return user
  }

  async userACL(userId: string, roleId: string) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        UsersOnRoles: {
          create: { rolesId: roleId },
        },
      },
    })
    return user
  }
}

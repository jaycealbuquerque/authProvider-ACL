import { NextFunction, Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import { env } from '../../env'
import { verify } from 'jsonwebtoken'

interface IPayloud {
  sub: string
}

export function is(rolesRoutes: string) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization

    const [, token] = authHeader.split(' ')

    const { sub } = verify(token, env.JWT_SECRET) as IPayloud

    const user = await prisma.user.findUnique({
      where: { id: sub },
      select: {
        id: true,
        name: true,
        email: true,
        UsersOnRoles: {
          select: {
            roles: true,
          },
        },
      },
    })

    const roleExists = user?.UsersOnRoles.map((role) => role.roles.name).some(
      (role) => rolesRoutes.includes(role),
    )

    if (!roleExists) {
      return response.status(403).end('User does not  permission')
    }

    return next()
  }
}

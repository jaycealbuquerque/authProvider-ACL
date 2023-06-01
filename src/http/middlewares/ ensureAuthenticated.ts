import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { env } from '../../env'
import { AppError } from '../../erros/AppError'
import { prisma } from '../../lib/prisma'
import { PrismaUserTokenRepository } from '../../repositories/prisma/prisma-users-token-repository'

interface IPayloud {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token mising!', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(token, env.JWT_SECRET) as IPayloud

    // console.log(sub)
    next()
  } catch {
    throw new AppError('Invalid token!', 401)
  }
}

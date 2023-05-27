import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { env } from '../../env'

export async function ensureAutheticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return new Error('Token mising!')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, env.JWT_SECRET)
    console.log(decoded)
    next()
  } catch {
    return new Error('Invalid token!')
  }
}

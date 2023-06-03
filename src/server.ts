import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { usersRoutes } from './http/controller/users/routes'
import { accessControlRoutes } from './http/controller/access-control-lists/routes'
import { AppError } from './erros/AppError'
import { env } from './env'

const app = express()

app.use(express.json())

app.use(usersRoutes)
app.use(accessControlRoutes)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      })
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  },
)

app.listen(env.PORT, () => console.log('🚀 Server Running!'))

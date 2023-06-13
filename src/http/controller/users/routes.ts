import { Router } from 'express'
import { RegisterController } from './register'
import { AuthenticateController } from './authenticate'
import { ProfileController } from './profile'
import { ensureAuthenticated } from '../../middlewares/ ensureAuthenticated'
import { RefreshTokenController } from './refresh-token'
import { SendForgotPasswordControler } from './forgot-password'
import { ResetPasswordUserController } from './reset-password'
import { can, is } from '../../middlewares/permissions'

const usersRoutes = Router()

usersRoutes.post('/register', new RegisterController().handle)
usersRoutes.post('/authenticate', new AuthenticateController().handle)
usersRoutes.post('/refresh-token', new RefreshTokenController().handle)
usersRoutes.post(
  '/send-forgot-password',
  new SendForgotPasswordControler().handle,
)
usersRoutes.post('/reset-password', new ResetPasswordUserController().handle)

usersRoutes.post(
  '/me',
  ensureAuthenticated,
  can('read'),
  new ProfileController().handle,
)

export { usersRoutes }

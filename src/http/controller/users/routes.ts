import { Router } from 'express'
import { RegisterController } from './register'
import { AuthenticateController } from './authenticate'
import { ProfileController } from './profile'
import { ensureAuthenticated } from '../../middlewares/ ensureAuthenticated'

const routes = Router()

routes.post('/register', new RegisterController().handle)
routes.post('/authenticate', new AuthenticateController().handle)
routes.post('/me', ensureAuthenticated, new ProfileController().handle)

export { routes }

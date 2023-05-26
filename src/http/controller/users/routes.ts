import { Router } from 'express'
import { RegisterController } from './register'
import { AuthenticateController } from './authenticate'

const routes = Router()

routes.post('/register', new RegisterController().handle)
routes.post('/authenticate', new AuthenticateController().handle)

export { routes }

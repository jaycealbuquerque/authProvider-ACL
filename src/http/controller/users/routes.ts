import { Router } from 'express'
import { RegisterController } from './register'

const routes = Router()

routes.post('/register', new RegisterController().handle)

export { routes }

import { Router } from 'express'
import { CreateRoleController } from './create-role'

const accessControlRoutes = Router()

accessControlRoutes.post('/role', new CreateRoleController().handle)

export { accessControlRoutes }

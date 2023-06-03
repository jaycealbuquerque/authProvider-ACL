import { Router } from 'express'
import { CreateRoleController } from './create-role'
import { CreatePermissionController } from './create-permission'

const accessControlRoutes = Router()

accessControlRoutes.post('/role', new CreateRoleController().handle)
accessControlRoutes.post('/permission', new CreatePermissionController().handle)

export { accessControlRoutes }

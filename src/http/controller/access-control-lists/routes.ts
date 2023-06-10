import { Router } from 'express'
import { CreateRoleController } from './create-role'
import { CreatePermissionController } from './create-permission'
import { CreateRolePermissionController } from './create-role-permission'
import { CreateUserAccessControllistController } from './create-user-access-control-list'
import { is } from '../../middlewares/permissions'

const accessControlRoutes = Router()

accessControlRoutes.post('/role', new CreateRoleController().handle)
accessControlRoutes.post(
  '/role/:roleId',
  new CreateRolePermissionController().handle,
)
accessControlRoutes.post('/permission', new CreatePermissionController().handle)
accessControlRoutes.post(
  '/userACL',
  is('admin'),
  new CreateUserAccessControllistController().handle,
)

export { accessControlRoutes }

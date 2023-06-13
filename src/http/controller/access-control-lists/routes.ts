import { Router } from 'express'
import { CreateRoleController } from './create-role'
import { CreatePermissionController } from './create-permission'
import { CreateUserAccessControllistController } from './create-user-access-control-list'
import { is } from '../../middlewares/permissions'
import { ensureAuthenticated } from '../../middlewares/ ensureAuthenticated'

const accessControlRoutes = Router()

accessControlRoutes.post(
  '/role',
  ensureAuthenticated,
  new CreateRoleController().handle,
)

accessControlRoutes.post(
  '/permission',
  ensureAuthenticated,
  new CreatePermissionController().handle,
)

accessControlRoutes.post(
  '/userACL',
  ensureAuthenticated,
  is('admin'),
  new CreateUserAccessControllistController().handle,
)

export { accessControlRoutes }

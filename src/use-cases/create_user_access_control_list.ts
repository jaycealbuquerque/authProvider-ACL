interface UserACLRequest {
  userId: string
  roles: string[]
  permissions: string[]
}

export class CreateUserAccessControlListUseCase {
  async execute({ userId, roles, permissions }: UserACLRequest) {}
}

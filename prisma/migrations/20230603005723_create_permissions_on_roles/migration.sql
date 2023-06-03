-- CreateTable
CREATE TABLE "permissions_on_roles" (
    "permissionsId" TEXT NOT NULL,
    "rolesId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissions_on_roles_pkey" PRIMARY KEY ("permissionsId","rolesId")
);

-- AddForeignKey
ALTER TABLE "permissions_on_roles" ADD CONSTRAINT "permissions_on_roles_permissionsId_fkey" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions_on_roles" ADD CONSTRAINT "permissions_on_roles_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

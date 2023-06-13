-- CreateTable
CREATE TABLE "users_on_permissions" (
    "permissionsId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_on_permissions_pkey" PRIMARY KEY ("permissionsId","userId")
);

-- AddForeignKey
ALTER TABLE "users_on_permissions" ADD CONSTRAINT "users_on_permissions_permissionsId_fkey" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_on_permissions" ADD CONSTRAINT "users_on_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

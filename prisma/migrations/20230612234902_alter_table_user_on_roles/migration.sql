/*
  Warnings:

  - You are about to drop the `users_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_rolesId_fkey";

-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_userId_fkey";

-- DropTable
DROP TABLE "users_roles";

-- CreateTable
CREATE TABLE "users_on_roles" (
    "userId" TEXT NOT NULL,
    "rolesId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_on_roles_pkey" PRIMARY KEY ("userId","rolesId")
);

-- AddForeignKey
ALTER TABLE "users_on_roles" ADD CONSTRAINT "users_on_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_on_roles" ADD CONSTRAINT "users_on_roles_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `permissions_on_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "permissions_on_roles" DROP CONSTRAINT "permissions_on_roles_permissionsId_fkey";

-- DropForeignKey
ALTER TABLE "permissions_on_roles" DROP CONSTRAINT "permissions_on_roles_rolesId_fkey";

-- DropTable
DROP TABLE "permissions_on_roles";

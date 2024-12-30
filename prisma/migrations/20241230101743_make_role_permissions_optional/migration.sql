-- DropForeignKey
ALTER TABLE "User_Project" DROP CONSTRAINT "User_Project_role_id_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "creation_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "dueDate" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "User_Project" ALTER COLUMN "role_id" DROP NOT NULL,
ALTER COLUMN "permissions" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User_Project" ADD CONSTRAINT "User_Project_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[device_id]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `device_id` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Device_token_key";

-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "device_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Device_device_id_key" ON "Device"("device_id");

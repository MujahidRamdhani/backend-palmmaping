/*
  Warnings:

  - The values [PUBLIC] on the enum `akun_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `public` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_koperasi` to the `petani` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `public` DROP FOREIGN KEY `public_id_akun_fkey`;

-- AlterTable
ALTER TABLE `akun` MODIFY `role` ENUM('DINAS', 'PETANI', 'KOPERASI') NOT NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `petani` ADD COLUMN `id_koperasi` CHAR(36) NOT NULL;

-- DropTable
DROP TABLE `public`;

-- AddForeignKey
ALTER TABLE `petani` ADD CONSTRAINT `petani_id_koperasi_fkey` FOREIGN KEY (`id_koperasi`) REFERENCES `koperasi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

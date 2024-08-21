/*
  Warnings:

  - You are about to drop the column `profile_lengkap` on the `akun` table. All the data in the column will be lost.
  - You are about to alter the column `nip` on the `dinas` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Char(16)`.
  - You are about to drop the column `ni_koperasi` on the `koperasi` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_lahir` on the `petani` table. All the data in the column will be lost.
  - You are about to drop the column `tempat_lahir` on the `petani` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nip]` on the table `dinas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[niKoperasi]` on the table `koperasi` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profilLengkap` to the `akun` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `koperasi_ni_koperasi_key` ON `koperasi`;

-- AlterTable
ALTER TABLE `akun` DROP COLUMN `profile_lengkap`,
    ADD COLUMN `profilLengkap` VARCHAR(10) NOT NULL,
    MODIFY `role` ENUM('DINAS', 'PETANI', 'KOPERASI', 'PABRIK_KELAPA_SAWIT') NOT NULL,
    ALTER COLUMN `wallet` DROP DEFAULT,
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `dinas` MODIFY `nip` CHAR(16) NULL;

-- AlterTable
ALTER TABLE `koperasi` DROP COLUMN `ni_koperasi`,
    ADD COLUMN `niKoperasi` CHAR(50) NULL;

-- AlterTable
ALTER TABLE `petani` DROP COLUMN `tanggal_lahir`,
    DROP COLUMN `tempat_lahir`;

-- CreateIndex
CREATE UNIQUE INDEX `dinas_nip_key` ON `dinas`(`nip`);

-- CreateIndex
CREATE UNIQUE INDEX `koperasi_niKoperasi_key` ON `koperasi`(`niKoperasi`);

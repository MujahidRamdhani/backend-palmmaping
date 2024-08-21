-- DropForeignKey
ALTER TABLE `petani` DROP FOREIGN KEY `petani_id_koperasi_fkey`;

-- AlterTable
ALTER TABLE `akun` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `petani` MODIFY `id_koperasi` CHAR(36) NULL;

-- AddForeignKey
ALTER TABLE `petani` ADD CONSTRAINT `petani_id_koperasi_fkey` FOREIGN KEY (`id_koperasi`) REFERENCES `koperasi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

import argon2 from 'argon2';
import prismaClient from '../src/applications/database.js';

import util from '../src/utils/util.js';
import invoke from '../src/applications/invoke.js';

const main = async () => {
  try {
    // Insert admin data to database for each organization
    await prismaClient.akun.upsert({
      where: { email: 'dinas.admin@palmmapping.co.id' },
      update: {},
      create: {
        email: 'dinas.admin@palmmapping.co.id',
        password: await argon2.hash('Dinas@PalmMapping2024'),
        role: util.getAttributeName('dinas').databaseRoleName,
        [util.getAttributeName('dinas').tableName]: {
          create: {
            nama: 'Dinas Admin',
            alamat: 'Bandung',
            nomorTelepon: '081234567890',
          },
        },
      },
      
    });


    const { koperasi } = await prismaClient.akun.upsert({
      where: { email: 'koperasi.admin@palmmapping.co.id' },
      update: {},
      create: {
        email: 'koperasi.admin@palmmapping.co.id',
        password: await argon2.hash('Koperasi@PalmMapping2024'),
        role: util.getAttributeName('koperasi').databaseRoleName,
        [util.getAttributeName('koperasi').tableName]: {
          create: {
            nama: 'Koperasi Admin',
            alamat: 'Bandung',
            nomorTelepon: '081234567890',
          },
        },
      },
      select: {
        [util.getAttributeName('koperasi').tableName]: {
          select: {
            id: true,
          },
        },
      },
    });

   console.log('koperasi', koperasi)

    await prismaClient.akun.upsert({
      where: { email: 'petani.admin@palmmapping.co.id' },
      update: {},
      create: {
        email: 'petani.admin@palmmapping.co.id',
        password: await argon2.hash('Petani@PalmMapping2024'),
        role: util.getAttributeName('petani').databaseRoleName,
        [util.getAttributeName('petani').tableName]: {
          create: {
            nama: 'Petani Admin',
            alamat: 'Bandung',
            nomorTelepon: '081234567890',

          },
        },
      },
    });

   
 
    // await invoke.enrollAdmin(email, role)
  } catch (error) {
    console.error(error);
  }
};

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });

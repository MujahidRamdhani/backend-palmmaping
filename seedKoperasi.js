import argon2 from 'argon2';
import prismaClient from './src/applications/database.js';

import util from './src/utils/util.js';
import invoke from './src/applications/invoke.js';


const main = async () => {
  try {
    
    const email = 'koperasi.admin@palmmapping.co.id';
    const role = 'koperasi';
    await prismaClient.akun.upsert({
      where: { email: email },
      update: {},
      create: {
        email: email,
        password: await argon2.hash('Koperasi@PalmMapping2024'),
        role: util.getAttributeName(role).databaseRoleName,
        [util.getAttributeName(role).tableName]: {
          create: {
            nama: 'Koperasi Admin',
            alamat: 'Bandung',
            nomorTelepon: '081234567890',
            niKoperasi: '1234567890123456',
          },
        },
      },
      
    });

   await invoke.enrollAdmin(email, role)
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



import prismaClient from '../applications/database.js';
import ResponseError from '../errors/response-error.js';
import validate from '../validations/validation.js';
import util from '../utils/util.js';

const findAllUser = async () => {
  const akunList = await prismaClient.akun.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      wallet: true,
    },
  });
  console.log("Akun object:", akunList);

  const users = [];

  for (const akun of akunList) {
    const role = akun.role.toLowerCase();
    let userList = [];

    if (role === 'petani') {
      userList = await prismaClient.petani.findMany({
        where: {
          idAkun: akun.id,
        },
        select: {
          id: true,
          idAkun: true,
          nama: true,
          alamat: true,
          nomorTelepon: true,
        },
      });
    } else if (role === 'dinas') {
      userList = await prismaClient.dinas.findMany({
        where: {
          idAkun: akun.id,
        },
        select: {
          id: true,
          idAkun: true,
          nama: true,
          alamat: true,
          nomorTelepon: true,
        },
      });
    } else if (role === 'koperasi') {
      userList = await prismaClient.koperasi.findMany({
        where: {
          idAkun: akun.id,
        },
        select: {
          id: true,
          idAkun: true,
          nama: true,
          alamat: true,
          nomorTelepon: true,
        },
      });
    } else {
      console.warn(`No fields defined for role: ${role}`);
    }

    userList.forEach(user => {
      users.push({
        ...user,
        email: akun.email,
        wallet: akun.wallet,
      });
    });
  }

  console.log("Users object:", users);
  return users;
};

findAllUser();

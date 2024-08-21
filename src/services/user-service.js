import argon2 from 'argon2';

import prismaClient from '../applications/database.js';
import ResponseError from '../errors/response-error.js';
import validate from '../validations/validation.js';
import util from '../utils/util.js';

const update = async (user, request) => {
 const userType = user.role.toLowerCase();
 const userId = await prismaClient[userType].findFirst({
  where: {
    akun: {
      email: request.email,
    },
  },
  select: {
    idAkun: true,
    id: true,
  },
});

console.log('userId AKun', userId);

if (!userId) {
  throw new ResponseError(404, 'User tidak ditemukan');
}
const akunPrev = await prismaClient[userType].findFirst({
  where: {
    idAkun: userId.idAkun,  // Gunakan idAkun dari hasil query pertama
  },
  include: {
    akun: true,  
  },
});

  if (!akunPrev) {
    throw new ResponseError(404, 'Akun tidak ditemukan');
  }

 
  const userPrev = await prismaClient[userType].findFirst({
    where: {
      id: userId.id,
    },
  });

  if (!userPrev) {
    throw new ResponseError(404, 'Pengguna tidak ditemukan');
  }

console.log('userId:', userId);
console.log('akunPrev:', akunPrev);
console.log('userPrev:', userPrev);


  const newUser = {
    nama: request.nama,
    alamat: request.alamat,
    nomorTelepon: request.nomorTelepon,
  };

  if (
    userType === util.getAttributeName('koperasi').databaseRoleName
  ) {
    newUser.niKoperasi = request.idKoperasi;
  }

  if (userType === 'petani') {
    newUser.nik = request.idRole;
    newUser.idKoperasi = request.idKoperasi;
  }

  if (userType === 'dinas') {
    newUser.nip = request.idRole;
  }

  const updatedUser = await prismaClient[userType].update({
    where: {
      idAkun: userId.idAkun,
    },
    data: newUser,
  });
  
  console.log('Updated User:', updatedUser);

  if (!updatedUser) {
    throw new ResponseError(500, 'Gagal memperbarui data pengguna');
  }

  const newAkun = {
    email: request.email,
    profilLengkap: 'TRUE',
  };

  if (request.password !== 'Apabila ingin merubah password maka ubah password disini') {
    newAkun.password = await argon2.hash(request.password);
  }

  const updatedAkun = await prismaClient.akun.update({
    where: {
      id: userId.idAkun,
    },
    data: newAkun,
  });

  if (!updatedAkun) {
    throw new ResponseError(500, 'Gagal memperbarui data akun');
  }

  const updated = await findOneProfil(user);

  return updated;
};

const updateStatusWallet = async (email) => {
  const akunPrev = await prismaClient.akun.findFirst({
    where: {
      email: email,
    },
  });

  if (!akunPrev) {
    throw new ResponseError(404, 'Akun tidak ditemukan');
  }

 
  const updatedAkun = await prismaClient.akun.update({
    where: {
      email: email,
    },
    data: {
      wallet: 'TRUE', 
    },
  });

  

  return updatedAkun;
};



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
        role: akun.role,
      });
    });
  }

  console.log("Users object:", users);
  return users;
};


const findAll = async (request) => {
  const userType = util.getAttributeName(request.userType).tableName;
  const users = await prismaClient[userType].findMany({
    select: {
      id: true,
      idAkun: true,
      nama: true,
      alamat: true,
      wallet: true
    },
    where: {
      NOT: [{ nama: 'Pabrik Kelapa Sawit Admin' }, { nama: 'Koperasi Admin' }, { nama: 'Petani Admin' }],
    },
  });

  if (users.length === 0) {
    throw new ResponseError(404, 'Data pengguna tidak ditemukan');
  }

  return users;
};

const findAllKoperasi = async (request) => {
  const userType = 'koperasi'
  const users = await prismaClient[userType].findMany({
    select: {
      id: true,
      idAkun: true,
      nama: true,
      alamat: true,
      niKoperasi: true,
    } 
  });

  if (users.length === 0) {
    throw new ResponseError(404, 'Data pengguna tidak ditemukan');
  }

  return users;
};

const findOneProfil = async (user) => {
  const userType = util.getAttributeName(user.role).tableName;
  const userPrev = await prismaClient[userType].findFirst({
    where: {
      idAkun: user.id,
    },
  });

  if (!userPrev) {
    throw new ResponseError(404, 'Data pengguna tidak ditemukan');
  }

  const { id, idAkun, ...updatedUserWithoutId } = userPrev;
  let response = {
    ...updatedUserWithoutId,
  };

  if (user.role === util.getAttributeName('petani').databaseRoleName) {
    const { idKoperasi, ...updatedUserWithoutIdKoperasi } = updatedUserWithoutId;

    const koperasi = await prismaClient.koperasi.findFirst({
      where: {
        id: idKoperasi,
      },
      select: {
        id: true,
        nama: true,
        alamat: true,
      },
    });

    if (!koperasi) {
      throw new ResponseError(404, 'Koperasi tidak ditemukan');
    }

    response = {
      ...updatedUserWithoutIdKoperasi,
      koperasi: {
        id: koperasi.id,
        nama: koperasi.nama,
        alamat: koperasi.alamat,
      },
    };
  }

  return {
    ...response,
    email: user.email,
    role: util.getAttributeName(user.role).roleName,
  };
};


const findOne = async (request) => {

  const userType = util.getAttributeName(request.role.toLowerCase()).tableName;
  
  const user = await prismaClient[userType].findFirst({
    where: {
      akun: {
        email: request.email,  
      },
    },
    include: {
      akun: true,  
    },
  });

  
  if (!user) {
    throw new ResponseError(404, 'Data pengguna tidak ditemukan');
  }

  const { akun, ...userWithoutAkun } = user;
  const { password, ...akunWithoutPassword } = akun;

  return {
    ...userWithoutAkun,       
    ...akunWithoutPassword,   
  };
};
const findOneId = async (request) => {

  const user = await prismaClient['koperasi'].findFirst({
    where: {
      akun: {
        id: request.idKoperasi,  
      },
    },
    select: {
      nama: true,
      niKoperasi: true,
      alamat: true,
    },
  });

  
  if (!user) {
    throw new ResponseError(404, 'Data pengguna tidak ditemukan');
  }

 return user;
};

const findOneKoperasi = async (request) => {
  const userType = util.getAttributeName(request.role.toLowerCase()).tableName;

  
  const user = await prismaClient[userType].findFirst({
    where: {
      akun: {
        email: request.email,
      },
    },
    select: {
      nama: true,
      nik: true,
      idKoperasi: true,
    },
  });


  if (!user) {
    throw new ResponseError(404, 'Data pengguna tidak ditemukan');
  }

  const koperasiData = await prismaClient.koperasi.findFirst({
    where: {
      id: user.idKoperasi,  
    },
    select: {
      nama: true,
      niKoperasi: true,
      alamat: true,
    },
  });

  

  // Extract relevant fields from user and koperasi data
  const { niKoperasi, nama: namaKoperasi, alamat } = koperasiData || {};
  const { nama: namaPetani, nik } = user;

  // Combine data into a single response object
  const data = {
    namaPetani,
    nik,
    niKoperasi,
    namaKoperasi,
    alamat,
  };

  return data;
};






const findOneUser = async (request) => {
  const userType = util.getAttributeName(request.userType).tableName;
  console.log('userType', userType);
  const user = await prismaClient[userType].findFirst({
    where: {
      email: request.email,
    },
  });

  if (!user) {
    throw new ResponseError(404, 'Data pengguna tidak ditemukan');
  }

  const { id, password, ...userWithoutIdPassword } = user;

  return {
    ...userWithoutIdPassword,
  };
};



const userService = { update, findAll, findOne, findOneProfil, findAllUser, updateStatusWallet, findAllKoperasi, findOneId, findOneKoperasi };
export default userService;

import argon2 from 'argon2';

import prismaClient from '../applications/database.js';
import ResponseError from '../errors/response-error.js';
import validate from '../validations/validation.js';
import { registerUserValidation, loginUserValidation, meValidation } from '../validations/auth-validation.js';
import util from '../utils/util.js';
import wallet from '../applications/wallet.js';



const register = async (request) => {
  // Validate request data
  const userRequest = validate(registerUserValidation, request);
  

  // Role names and table names
  const { tableName, databaseRoleName, roleName, organizationName, affiliationName } = util.getAttributeName(userRequest.role);
  
  // Check for existing email
  const countAkun = await prismaClient.akun.count({
    where: {
      email: userRequest.email,
    },
  });

  if (countAkun === 1) {
    throw new ResponseError(400, 'Email sudah terdaftar');
  }

  // Hash password
  userRequest.password = await argon2.hash(userRequest.password);

  let data;
  
  // Prepare data based on role
  if (roleName === 'petani') {
    data = {
      email: userRequest.email,
      password: userRequest.password,
      role: databaseRoleName,
      [tableName]: {
        create: {
          nik: userRequest.nik,
          nama: userRequest.nama,
          alamat: userRequest.alamat,
          nomorTelepon: userRequest.nomorTelepon,
        },
      },
    };
  } else if (roleName === 'koperasi') {
    data = {
      email: userRequest.email,
      password: userRequest.password,
      role: databaseRoleName,
      [tableName]: {
        create: {
          niKoperasi: userRequest.nik,
          nama: userRequest.nama,
          alamat: userRequest.alamat,
          nomorTelepon: userRequest.nomorTelepon,
        },
      },
    };
  }else if (roleName === 'public') {
    data = {
      email: userRequest.email,
      password: userRequest.password,
      role: databaseRoleName,
      [tableName]: {
        create: {
          nik: userRequest.nik,
          nama: userRequest.nama,
          alamat: userRequest.alamat,
          nomorTelepon: userRequest.nomorTelepon,
        },
      },
    };
  }else {
    throw new ResponseError(400, 'Invalid role');
  }

  // Register to database
  const userAccount = await prismaClient.akun.create({
    data,
    select: {
      [tableName]: {
        select: {
          nama: true,
          ...(roleName === 'petani'  || roleName === 'public'   ? { nik: true } : { niKoperasi: true }),
        },
      },
      id: true,
      email: true,
    },
  });

  if (!userAccount) {
    throw new ResponseError(500, 'Gagal membuat akun');
  }

  // Return the registered user data
  return {
    nama: userAccount[tableName].nama,
    email: userAccount.email,
    role: roleName,
  };
};



// backup
// const login = async (session, request) => {
//   const userRequest = validate(loginUserValidation, request);

//   const akun = await prismaClient.akun.findUnique({
//     where: {
//       email: userRequest.email,
//     },
//     select: {
//       id: true,
//       email: true,
//       password: true,
//       role: true,
//     },
//   });

//   if (!akun) {
//     throw new ResponseError(404, 'Akun pengguna tidak terdaftar');
//   }

//   const isPasswordValid = await argon2.verify(akun.password, userRequest.password);
//   if (!isPasswordValid) {
//     throw new ResponseError(401, 'Email atau password salah');
//   }

//   const { tableName, roleName } = util.getAttributeName(akun.role);
//   const user = await prismaClient[tableName].findUnique({
//     where: {
//       idAkun: akun.id,
//     },
//     select: {
//       nama: true,
//     },
//   });

//   session.userEmail = akun.email;

//   return {
//     nama: user.nama,
//     email: akun.email,
//     role: roleName,
//   };
// };

const login = async (session, request) => {
  const userRequest = validate(loginUserValidation, request);

  const akun = await prismaClient.akun.findUnique({
    where: {
      email: userRequest.email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
    },
  });

  if (!akun) {
     throw new ResponseError(404, 'Akun pengguna tidak terdaftar');
  }

  const isPasswordValid = await argon2.verify(akun.password, userRequest.password);
  if (!isPasswordValid) {
    throw new ResponseError(401, 'Email atau password salah');
  }

  //validasi Ca
  const identity = await wallet.getIdentity(userRequest.email);
    
    if (!identity) {
      throw new ResponseError(403, 'Akun Belum Mempunyai Certificate Authory');
    }

  const { tableName, roleName } = util.getAttributeName(akun.role);
  let user;
  let idRole;
  if(roleName === 'dinas') {
    user = await prismaClient[tableName].findUnique({
      where: {
        idAkun: akun.id, 
      },
      select: {
        nama: true,
        nip: true,
      },
    });

   idRole = user.nip
   }else if(roleName === 'koperasi') {
    user = await prismaClient[tableName].findUnique({
      where: {
        idAkun: akun.id,
      },
      select: {
        nama: true,
        niKoperasi: true,
      },
    });
  idRole = user.niKoperasi
   }else if( roleName === 'petani') {
    user = await prismaClient[tableName].findUnique({
      where: {
        idAkun: akun.id,
      },
      select: {
        nama: true,
        nik: true,
      },
    });
   idRole = user.nik
   }else if( roleName === 'public') {
    user = await prismaClient[tableName].findUnique({
      where: {
        idAkun: akun.id,
      },
      select: {
        nama: true,
        nik: true,
      },
    });
  idRole = user.nik
   }
   
   session.userEmail = akun.email;
   session.userNama = user.nama;
   session.userIdRole = idRole;
   session.userRole = akun.role;


   console.log(idRole, 'idRole')
  return {
    nama: user.nama,
    email: akun.email,
    role: roleName,
    idRole: idRole,
  };
};



const me = async (email) => {
  // Validate the email
  email = validate(meValidation, email);

  // Find the user account based on the email
  const akun = await prismaClient.akun.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      role: true,
      profilLengkap: true,
    },
  });

  // If the account doesn't exist, throw an error
  if (!akun) {
    throw new ResponseError(404, 'Akun pengguna tidak terdaftar');
  }

  // Get the table and role name based on the role
  const { tableName, roleName } = util.getAttributeName(akun.role);

  // Find the user based on the account ID
  const user = await prismaClient[tableName].findUnique({
    where: {
      idAkun: akun.id,
    },
    select: {
      nama: true,
    },
  });

  // If the user doesn't exist, throw an error
  if (!user) {
    throw new ResponseError(404, 'User not found in the specified table');
  }

  // Return the user information
  return {
    nama: user.nama,
    email: akun.email,
    role: roleName,
    profilLengkap: akun.profilLengkap,
  };
};


const logout = async (session) => {
  session.destroy((error) => {
    if (error) {
      throw new ResponseError(400, 'Logout gagal');
    }
  });
};

export const checkSession = async (session, res) => {
  
  if (session.userEmail) {
    try {
      const user = await prismaClient.user.findUnique({
        where: { email: session.userEmail },
      });
      console.log('user',user)
      if (user) {
        res.json({  serName: user.name, role: user.role }); // Add more user details as needed
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};




const authService = { register, login, me, logout, checkSession };
export default authService;

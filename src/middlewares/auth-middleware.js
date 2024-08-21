import status from 'http-status';

import prismaClient from '../applications/database.js';
import util from '../utils/util.js';

// const authMiddleware = async (req, res, next) => {
//   const userEmail = req.session.userEmail;

//   if (!userEmail) {
//     return res
//       .status(status.UNAUTHORIZED)
//       .json({
//         status: `${status.UNAUTHORIZED} ${status[status.UNAUTHORIZED]}`,
//       })
//       .end();
//   }

//   let akun;
//   try {
//     akun = await prismaClient.akun.findFirst({
//       where: {
//         email: userEmail,
//       },
//       select: {
//         id: true,
//         email: true,
//         role: true,
//         profilLengkap: true,
//       },
//     });
//   } catch (error) {
//     return res
//       .status(status.INTERNAL_SERVER_ERROR)
//       .json({
//         status: `${status.INTERNAL_SERVER_ERROR} ${status[status.INTERNAL_SERVER_ERROR]}`,
//         message: 'Database query failed',
//       })
//       .end();
//   }

//   if (!akun) {
//     return res
//       .status(status.UNAUTHORIZED)
//       .json({
//         status: `${status.UNAUTHORIZED} ${status[status.UNAUTHORIZED]}`,
//       })
//       .end();
//   }

//   if (!isProfileCompleteAllowed(req.url, akun)) {
//     return res
//       .status(status.FORBIDDEN)
//       .json({
//         status: `${status.FORBIDDEN} ${status[status.FORBIDDEN]}`,
//         message: 'Lengkapi profil Anda terlebih dahulu.',
//       })
//       .end();
//   }

//   const { tableName, roleName } = util.getAttributeName(akun.role);
//   try {
//     const user = await prismaClient[tableName].findUnique({
//       where: {
//         idAkun: akun.id,
//       },
//       select: {
//         nama: true,
//         nip: roleName === 'dinas' ? true : undefined,
//         niKoperasi: roleName === 'koperasi' ? true : undefined,
//         nik: roleName === 'petani' ? true : undefined,
//       },
//     });

//     req.user = {
//       ...akun,
//       idRole: roleName === 'dinas' ? user.nip : roleName === 'koperasi' ? user.niKoperasi : user.nik,
//       nama: user.nama,
//     };
//   } catch (error) {
//     return res
//       .status(status.INTERNAL_SERVER_ERROR)
//       .json({
//         status: `${status.INTERNAL_SERVER_ERROR} ${status[status.INTERNAL_SERVER_ERROR]}`,
//         message: 'Database query failed',
//       })
//       .end();
//   }

//   next();
// };

const authMiddleware = async (req, res, next) => {
  const userEmail = req.session.userEmail;

  if (!userEmail) {
    return res
      .status(status.UNAUTHORIZED)
      .json({
        status: `${status.UNAUTHORIZED} ${status[status.UNAUTHORIZED]}`,
      })
      .end();
  }

  let akun;
  try {
    akun = await prismaClient.akun.findFirst({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
        email: true,
        role: true,
        profilLengkap: true,
      },
    });
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({
        status: `${status.INTERNAL_SERVER_ERROR} ${status[status.INTERNAL_SERVER_ERROR]}`,
        message: 'Database query failed',
      })
      .end();
  }

  if (!akun) {
    return res
      .status(status.UNAUTHORIZED)
      .json({
        status: `${status.UNAUTHORIZED} ${status[status.UNAUTHORIZED]}`,
      })
      .end();
  }

  if (!isProfileCompleteAllowed(req.url, akun)) {
    return res
      .status(status.FORBIDDEN)
      .json({
        status: `${status.FORBIDDEN} ${status[status.FORBIDDEN]}`,
        message: 'Lengkapi profil Anda terlebih dahulu.',
      })
      .end();
  }

  const { tableName, roleName } = util.getAttributeName(akun.role);
  try {
    const user = await prismaClient[tableName].findUnique({
      where: {
        idAkun: akun.id,
      },
      select: {
        nama: true,
        nip: roleName === 'dinas' ? true : undefined,
        niKoperasi: roleName === 'koperasi' ? true : undefined,
        nik: roleName === 'petani' || roleName === 'public' ? true : undefined,
      },
    });

    req.user = {
      ...akun,
      idRole: roleName === 'dinas' ? user.nip : roleName === 'koperasi' ? user.niKoperasi : user.nik,
      nama: user.nama,
    };
  } catch (error) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({
        status: `${status.INTERNAL_SERVER_ERROR} ${status[status.INTERNAL_SERVER_ERROR]}`,
        message: 'Database query failed',
      })
      .end();
  }

  next();
};


const isProfileCompleteAllowed = (url, akun) => {
  const allowedUrls = ['/api/users/me', '/api/users/logout', '/api/users/profil', '/api/users'];
  if (allowedUrls.includes(url)) {
    return true;
  }
  return akun.profilLengkap || akun.role === util.getAttributeName('petani').databaseRoleName;
};

const authRoleMiddleware = (allowedRoles) => async (req, res, next) => {
  const currentUserRole = util.getAttributeName(req.user.role).databaseRoleName;

  if (!allowedRoles.includes(currentUserRole)) {
    return res
      .status(status.UNAUTHORIZED)
      .json({
        status: `${status.UNAUTHORIZED} ${status[status.UNAUTHORIZED]}`,
      })
      .end();
  }

  next();
};

const isLoggedInMiddleware = (req, res, next) => {
  if (req.session.userEmail) {
    return res
      .status(status.FORBIDDEN)
      .json({
        status: `${status.FORBIDDEN} ${status[status.FORBIDDEN]}`,
        message: 'You are already logged in. Please logout first.',
      })
      .end();
  }

  next();
};

export { authMiddleware, authRoleMiddleware, isLoggedInMiddleware };

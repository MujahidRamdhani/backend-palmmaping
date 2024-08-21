import express from 'express';
import path from 'path';

import util from '../utils/util.js';
import { authMiddleware, authRoleMiddleware } from '../middlewares/auth-middleware.js';
import invokeController from '../controllers/invoke-controller.js';


const dinasRole = util.getAttributeName('dinas').databaseRoleName;
const koperasiRole = util.getAttributeName('koperasi').databaseRoleName;
const petaniRole = util.getAttributeName('petani').databaseRoleName;
const publicRole = util.getAttributeName('public').databaseRoleName;

const router = express.Router();

router.use(authMiddleware);
router.post('/api/users/InvokeCaAdmin', authRoleMiddleware([ dinasRole, koperasiRole, petaniRole, publicRole ]), invokeController.caRegisterAdmin );
router.post('/api/users/InvokeCaUser', authRoleMiddleware([ dinasRole, koperasiRole, petaniRole  ]), invokeController.caRegisterUser );

export default router;

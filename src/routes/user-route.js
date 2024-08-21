import express from 'express';

import util from '../utils/util.js';
import userController from '../controllers/user-controller.js';
import { authMiddleware, authRoleMiddleware } from '../middlewares/auth-middleware.js';

const koperasiRole = util.getAttributeName('koperasi').databaseRoleName;
const petaniRole = util.getAttributeName('petani').databaseRoleName;
const dinasRole = util.getAttributeName('dinas').databaseRoleName;

const router = express.Router();

router.use(authMiddleware);

router.put('/api/users/UpdateProfil', authRoleMiddleware([ koperasiRole, petaniRole, dinasRole]), userController.update);
router.get('/api/users/profil', authRoleMiddleware([ koperasiRole, petaniRole, dinasRole]), userController.findOne);
router.get('/api/users', authRoleMiddleware([ koperasiRole, petaniRole, dinasRole]), userController.findAll);
router.get('/api/users/findAllUsers', authRoleMiddleware([ dinasRole, petaniRole, koperasiRole]), userController.findAllUser);
router.get('/api/users/findAllKoperasis', authRoleMiddleware([ petaniRole, dinasRole, koperasiRole ]), userController.findAllKoperasi);
router.put('/api/users/findOneKoperasi', authRoleMiddleware([ koperasiRole, petaniRole, dinasRole]), userController.findOneKoperasi);

export default router;

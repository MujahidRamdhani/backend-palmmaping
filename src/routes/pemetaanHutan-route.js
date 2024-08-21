import express from 'express';
import util from '../utils/util.js';
import { authMiddleware, authRoleMiddleware } from '../middlewares/auth-middleware.js';
import pemetaanHutanController from '../controllers/pemetaanHutan-controller.js';

const router = express.Router();

// Retrieve roles from utility functions
const koperasiRole = util.getAttributeName('koperasi').databaseRoleName;
const dinasRole = util.getAttributeName('dinas').databaseRoleName;
const petaniRole = util.getAttributeName('petani').databaseRoleName;

// Apply authentication middleware
router.use(authMiddleware);

// Define routes with role-based access control
router.post('/api/pemetaanHutan/CreatePemetaanHutan', authRoleMiddleware([dinasRole]), pemetaanHutanController.createPemetaanHutan);
router.put('/api/pemetaanHutan/UpdatePemetaanHutan/:idHutan', authRoleMiddleware([dinasRole]), pemetaanHutanController.updatePemetaanHutan);
router.put('/api/pemetaanHutan/DeletePemetaanHutan/:idHutan', authRoleMiddleware([dinasRole]), pemetaanHutanController.deletePemetaanHutan);
router.put('/api/pemetaanHutan/FindOnePemetaanHutan/:idHutan', authRoleMiddleware([dinasRole]), pemetaanHutanController.findOnePemetaanHutan);
router.put('/api/pemetaanHutan/UpdatePemetaanHutan/:idHutan', authRoleMiddleware([dinasRole]), pemetaanHutanController.updatePemetaanHutan);
router.put('/api/pemetaanHutan/HistoryPemetaanHutan/:idHutan', authRoleMiddleware([dinasRole]), pemetaanHutanController.historyPemetaanHutan);
router.get('/api/pemetaanHutan/GetAllPemetaanHutan', authRoleMiddleware([dinasRole, koperasiRole, petaniRole]), pemetaanHutanController.getAllPemetaanHutan);

export default router;

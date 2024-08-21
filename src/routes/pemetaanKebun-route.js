import express from 'express';
import util from '../utils/util.js';
import { authMiddleware, authRoleMiddleware } from '../middlewares/auth-middleware.js';
import pemetaanKebunController from '../controllers/PemetaanKebun-controller.js';

const router = express.Router();

// Retrieve roles from utility functions
const koperasiRole = util.getAttributeName('koperasi').databaseRoleName;
const dinasRole = util.getAttributeName('dinas').databaseRoleName;
const petaniRole = util.getAttributeName('petani').databaseRoleName;

// Apply authentication middleware
router.use(authMiddleware);

// Define routes with role-based access control
router.post('/api/pemetaanKebun/CreatePemetaanKebun', authRoleMiddleware([koperasiRole]), pemetaanKebunController.createPemetaanKebun);
router.put('/api/pemetaanKebun/VerifyPemetaanKebun/:idPemetaanKebun', authRoleMiddleware([koperasiRole, dinasRole]), pemetaanKebunController.verifyPemetaanKebun);
router.put('/api/pemetaanKebun/HistoryPemetaanKebun/:idPemetaanKebun', authRoleMiddleware([koperasiRole, dinasRole]), pemetaanKebunController.historyPemetaanKebun);
router.put('/api/pemetaanKebun/FindOnePemetaanKebun/:idPemetaanKebun', authRoleMiddleware([koperasiRole, dinasRole]), pemetaanKebunController.findOnePemetaanKebun);
router.put('/api/pemetaanKebun/UpdatePemetaanKebun/:idPemetaanKebun', authRoleMiddleware([koperasiRole, dinasRole]), pemetaanKebunController.updatePemetaanKebun);
router.get('/api/pemetaanKebun/GetAllPemetaanKebun', authRoleMiddleware([dinasRole, koperasiRole, petaniRole]), pemetaanKebunController.getAllPemetaanKebun);
router.put('/api/pemetaanKebun/DeletePemetaanKebun/:idPemetaanKebun', authRoleMiddleware([koperasiRole, dinasRole]), pemetaanKebunController.deletePemetaanKebun);
export default router;

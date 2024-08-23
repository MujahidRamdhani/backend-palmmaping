import express from 'express';
import util from '../utils/util.js';
import { authMiddleware, authRoleMiddleware } from '../middlewares/auth-middleware.js';
import legalitasLahanController from '../controllers/legalitasLahan-controller.js';

const router = express.Router();

// Retrieve roles from utility functions
const koperasiRole = util.getAttributeName('koperasi').databaseRoleName;
const petaniRole = util.getAttributeName('petani').databaseRoleName;
const dinasRole = util.getAttributeName('dinas').databaseRoleName;

// Apply authentication middleware
router.use(authMiddleware);

// Define routes with role-based access control
router.post('/api/legalitasLahan/CreateLegalitasLahan', authRoleMiddleware([petaniRole]), legalitasLahanController.CreateLegalitasLahan);
router.post('/api/legalitasLahan/addKebunToLegalitasLahan', authRoleMiddleware([koperasiRole]), legalitasLahanController.addKebunToLegalitasLahan);
router.put('/api/legalitasLahan/ConfirmLegalitasLahan/:nomorSTDB', authRoleMiddleware([petaniRole, koperasiRole]), legalitasLahanController.ConfirmLegalitasLahan);
router.put('/api/legalitasLahan/PublishLegalitasLahan/:nomorSTDB', authRoleMiddleware([dinasRole]), legalitasLahanController.PublishLegalitasLahan);
router.get('/api/legalitasLahan/GetAllLegalitasLahan', authRoleMiddleware([petaniRole, koperasiRole, dinasRole]), legalitasLahanController.GetAllLegalitasLahan);
router.put('/api/legalitasLahan/HistoryLegalitasLahan/:nomorSTDB', authRoleMiddleware([koperasiRole, dinasRole, petaniRole]), legalitasLahanController.historyLegalitasLahan);
router.put('/api/legalitasLahan/FindOneLegalitasLahan/:nomorSTDB', authRoleMiddleware([koperasiRole, dinasRole, petaniRole]), legalitasLahanController.findOneLegalitasLahan);
router.put('/api/legalitasLahan/UpdateLegalitasLahan/:nomorSTDB', authRoleMiddleware([koperasiRole, dinasRole, petaniRole]), legalitasLahanController.updateLegalitasLahan);
router.post('/api/legalitasLahan/CreateDataKebun', authRoleMiddleware([, koperasiRole, petaniRole]), legalitasLahanController.CreateLegalitasLahanBaru);
router.put('/api/legalitasLahan/UpdateStatusConfirmLegalitasLahan/:nomorSTDB', authRoleMiddleware([koperasiRole, dinasRole, petaniRole]), legalitasLahanController.updateStatusConfirm);

export default router;

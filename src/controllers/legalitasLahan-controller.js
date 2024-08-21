import status from 'http-status';
import legalitasLahanServices from '../services/legalitasLahan-services.js';
import pemetaanKebunServices from '../services/pemetaanKebun-services.js';
import userService from '../services/user-service.js';





const CreateLegalitasLahan = async (req, res, next)  => {
    try {
        
        const user = req.user;
        const request = req.body;
        const data = await userService.findOneKoperasi(user)
  
    const result = await legalitasLahanServices.create(user, request, data)
        
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const CreateLegalitasLahanBaru = async (req, res, next)  => {
    try {
        
        const user = req.user;
        const request = req.body;

        
        const result = await legalitasLahanServices.createUpdate(user, request)
        
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}



const ConfirmLegalitasLahan = async (req, res, next)  => {
    try {
        
        const user = req.user;
        const request = req.body;
        const nomorSTDB = req.params.nomorSTDB

        const result = await legalitasLahanServices.confirm(user, request, nomorSTDB)

        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}


const addKebunToLegalitasLahan = async (req, res, next)  => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await legalitasLahanServices.PetakanLahan(user, request) 

        
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}


const GetAllLegalitasLahan = async (req, res, next)  => {
    try {
        const user = req.user;
        const result = await legalitasLahanServices.findAll(user)
        
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}

const PublishLegalitasLahan = async (req, res, next)  => {
    try {
        
        const user = req.user;
        const request = req.body;
        const nomorSTDB = req.params.nomorSTDB

        const result = await legalitasLahanServices.publish(user, request, nomorSTDB)

        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}
// const AddPemetaanKebun = async (req, res, next)  => {
//     try {
//         const user = req.user;
//         const request = req.body;
//         const nomorSTDB = req.params.nomorSTDB
//         const result = await legalitasLahanServices.PetakanLahan(user, request, nomorSTDB)
        
//         res.status(status.OK).json({
//             status: `${status.OK} ${status[status.OK]}`,
//             data: result,
//           });
//     } catch (error) {
//         next(error);
//     }
// }

const updateLegalitasLahan = async (req, res, next)  => {
    try {
        
        const user = req.user;
        const request = req.body;
        const nomorSTDB = req.params.nomorSTDB;
        
        const result = await legalitasLahanServices.createUpdate(user, request, nomorSTDB);

if (request.idPemetaanKebun !== 'Belum dipetakan') {
   

    // Use Promise.all to execute both operations concurrently
    await Promise.all([
        pemetaanKebunServices.deleteKebun(user, request.idPemetaanKebun),
        result // This is redundant if you just want to delete the kebun
    ]);
}
        
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}
const findOneLegalitasLahan = async (req, res, next)  => {
    try {
        const user = req.user;
        const nomorSTDB = req.params.nomorSTDB;
        const result = await legalitasLahanServices.findOne(user, nomorSTDB)
        
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}

const historyLegalitasLahan = async (req, res, next)  => {
    try {
        const user = req.user;
        const nomorSTDB = req.params.nomorSTDB;
        const result = await legalitasLahanServices.historyLegalitasLahan(user, nomorSTDB)
        
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}



const updateStatusConfirm = async (req, res, next)  => {
    try {
        const user = req.user;
        const nomorSTDB = req.params.nomorSTDB;
        const result = await legalitasLahanServices.updateStatusConfirm(user, nomorSTDB)
        
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}



const legalitasLahanController = {CreateLegalitasLahan,  ConfirmLegalitasLahan, GetAllLegalitasLahan, addKebunToLegalitasLahan, PublishLegalitasLahan, updateLegalitasLahan, findOneLegalitasLahan, historyLegalitasLahan, CreateLegalitasLahanBaru, updateStatusConfirm};

export default legalitasLahanController



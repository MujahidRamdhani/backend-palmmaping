import status from 'http-status';
import pemetaanKebunServices from '../services/pemetaanKebun-services.js';
import legalitasLahanServices from '../services/legalitasLahan-services.js';




const createPemetaanKebun = async (req, res, next)  => {
    try {
        const user = req.user;
        const request = req.body;
        
        const [result, result2] = await Promise.all([
            pemetaanKebunServices.create(user, request),
            legalitasLahanServices.PetakanLahan(user, request)
        ]);

        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}

const updatePemetaanKebun = async (req, res, next)  => {
    try {
        
        const user = req.user;
        const request = req.body;
        const idPemetaanKebun = req.params.idPemetaanKebun;
        const [result1, result2] = await Promise.all([
            pemetaanKebunServices.Update(user, request, idPemetaanKebun),
            legalitasLahanServices.updateStatusPenerbitanLegalitas(user, request, idPemetaanKebun)
        ]);
        console.log(result2)
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result1,
          });
    } catch (error) {
        next(error);
    }
}

const verifyPemetaanKebun = async (req, res, next)  => {
    try {
        
        const user = req.user;
        const request = req.body;
        const idPemetaanKebun = req.params.idPemetaanKebun;

        const result = await pemetaanKebunServices.verify(user, request, idPemetaanKebun)
        

        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}

const updateStatusVerify = async (req, res, next)  => {
    try {
        
        const user = req.user;
        const request = req.body;
        const idPemetaanKebun = req.params.idPemetaanKebun;

        const result = await pemetaanKebunServices.UpdateStatusVerify(user, request, idPemetaanKebun)
        if (request.statusPenerbitLegalitas !== 'Diterbitkan') {
        
            await Promise.all([
                legalitasLahanServices.updateStatusPenerbitanLegalitas(user,  request, request.nomorSTDB),
                result 
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


const getAllPemetaanKebun = async (req, res, next)  => {
    try {
        const user = req.user;
        const result = await pemetaanKebunServices.findAll(user)
        
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}


const findOnePemetaanKebun = async (req, res, next)  => {
    try {
        const user = req.user;
        const idPemetaanKebun = req.params.idPemetaanKebun;
        const result = await pemetaanKebunServices.findOne(user, idPemetaanKebun)
        
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}

const historyPemetaanKebun = async (req, res, next)  => {
    try {
        const user = req.user;
        const idPemetaanKebun = req.params.idPemetaanKebun;
        const result = await pemetaanKebunServices.historyPemetaanKebun(user, idPemetaanKebun)
        
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}

const deletePemetaanKebun = async (req, res, next)  => {
    try {
        const user = req.user;
        const idPemetaanKebun = req.params.idPemetaanKebun;
        const result = await pemetaanKebunServices.deleteKebun(user, idPemetaanKebun)
        
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}


export default {createPemetaanKebun, updatePemetaanKebun, getAllPemetaanKebun, verifyPemetaanKebun, historyPemetaanKebun, findOnePemetaanKebun, deletePemetaanKebun ,updateStatusVerify};



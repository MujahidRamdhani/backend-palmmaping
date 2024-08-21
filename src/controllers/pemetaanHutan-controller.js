
import status from 'http-status';
import pemetaanHutanServices from '../services/pemetaanHutan-services.js';
import util from '../utils/util.js';




const createPemetaanHutan = async (req, res, next)  => {
    try {
        const user = req.user;
        const request = req.body;
        
        const result = await pemetaanHutanServices.create(user, request)
        
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}

const updatePemetaanHutan = async (req, res, next)  => {
    try {
        
        const user = req.user;
        const request = req.body;
        const idHutan = req.params.idHutan;
     
        const result = await pemetaanHutanServices.update(user, request, idHutan)

        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}


const getAllPemetaanHutan = async (req, res, next)  => {
    try {
        const user = req.user;
        const result = await pemetaanHutanServices.findAll(user)
        
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}

const findOnePemetaanHutan = async (req, res, next) => {
    try {
        const user = req.user;
        const idHutan = req.params.idHutan;
        const result = await pemetaanHutanServices.findOne(user,  idHutan)
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}

const deletePemetaanHutan = async (req, res, next)  => {
    try {
        const user = req.user;
        const idHutan = req.params.idHutan;
        const result = await pemetaanHutanServices.deleteHutan(user, idHutan)
        
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}

const historyPemetaanHutan = async (req, res, next)  => {
    try {
        const user = req.user;
        const idHutan = req.params.idHutan;
        const result = await pemetaanHutanServices.historyPemetaanHutan(user, idHutan)
        
        res.status(status.OK).json({
            status: `${status.OK} ${status[status.OK]}`,
            data: result,
          });
    } catch (error) {
        next(error);
    }
}

const pemetaanHutanController =  {createPemetaanHutan, getAllPemetaanHutan, updatePemetaanHutan, deletePemetaanHutan, findOnePemetaanHutan, historyPemetaanHutan};

export default pemetaanHutanController



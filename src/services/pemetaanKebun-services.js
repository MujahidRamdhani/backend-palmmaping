


import { v4 as uuidv4 } from 'uuid';
import status from 'http-status';
import pkg from 'fabric-network';
const {  Wallets, Gateway} = pkg;
import path from 'path';
import time from '../utils/time.js';
import fabric from '../applications/fabric.js';
import wallet from '../applications/wallet.js';
import util from '../utils/util.js';

const channelName = 'pemetaan-kebun-channel';
const chaincodeName = 'pemetaan-kebun-chaincode';

const create = async (user, request) => {
        const chaincodeMethodName = 'CreatePemetaanKebun';
        const body  = request;
        const email = user.email
        const role = user.role
        const identity = await wallet.getIdentity(email);
        if (!identity) {
            console.log(`An identity for the user "${email}" does not exist in the wallet`);
            console.log('Run the user enrollment script before retrying');
            return;
        }

        // Get the contract from the network.
        const { contract, gateway } = await fabric.getContract(email, role,channelName, chaincodeName);

        // nomor induk koperasi
        const nikSurveyor = user.idRole;
        const namaSurveyor = user.nama;
        // Prepare the payload
        const payload = {
            idPemetaankebun: body.idPemetaanKebun,
            nikSurveyor: nikSurveyor,
            namaSurveyor: namaSurveyor,
            longitude: body.longitude,
            latitude: body.latitude,
            statusKawasan: body.statusKawasan,
            luasKebun: body.luasKebun,
            waktuPemetaanKebun: time.getCurrentTime()
        };

        console.log(payload)

        // Convert the payload to string arguments
        const args = [
            payload.idPemetaankebun,
            payload.nikSurveyor,
            payload.namaSurveyor,
            payload.longitude,
            payload.latitude,
            payload.statusKawasan,
            payload.luasKebun,
            payload.waktuPemetaanKebun
        ];

         const result = await contract.submitTransaction(chaincodeMethodName, ...args);
         gateway.disconnect();
         const resultString = result.toString();
 
         return resultString 
};


const Update = async (user, request, idPemetaanKebun) => {
    const chaincodeMethodName = 'UpdatePemetaanKebun';
    const body  = request;
    const email = user.email
    const role = user.role
    const identity = await wallet.getIdentity(email);
    if (!identity) {
        console.log(`An identity for the user "${email}" does not exist in the wallet`);
        console.log('Run the user enrollment script before retrying');
        return;
    }

    // Get the contract from the network.
    const { contract, gateway } = await fabric.getContract(email, role,channelName, chaincodeName);

    // nomor induk koperasi
    const nikSurveyor = user.idRole;
    const namaSurveyor = user.nama;
    const nipVerifikator = 'False';
    const statusVerifikator = 'Belum diverifikasi';
    const pesanVerifikator = 'False';
    const namaVerifikator = 'False';

    const payload = {
        idPemetaankebun: idPemetaanKebun,
        nikSurveyor: nikSurveyor,
        namaSurveyor: namaSurveyor,
        longitude: body.longitude,
        latitude: body.latitude,
        statusKawasan: body.statusKawasan,
        luasKebun: body.luasKebun,
        nipVerifikator: nipVerifikator,
        namaVerifikator: namaVerifikator,
        statusVerifikator: statusVerifikator,
        pesanVerifikator: pesanVerifikator,
        waktuPemetaanKebun: body.waktuPemetaanKebun,
        waktuVerifikator: body.waktuVerifikator,
        waktuUpdatePemetaanKebun: time.getCurrentTime(),
        waktuUpdateVerifikator: 'False'
    };

    console.log('data',payload)

    // Convert the payload to string arguments
    const args = [
        payload.idPemetaankebun,
        payload.nikSurveyor,
        payload.namaSurveyor,
        payload.longitude,
        payload.latitude,
        payload.statusKawasan,
        payload.luasKebun,
        payload.nipVerifikator,
        payload.namaVerifikator,
        payload.statusVerifikator,
        payload.pesanVerifikator,
        payload.waktuPemetaanKebun,
        payload.waktuVerifikator,
        payload.waktuUpdatePemetaanKebun,
        payload.waktuUpdateVerifikator
    ];

     const result = await contract.submitTransaction(chaincodeMethodName, ...args);
     gateway.disconnect();
     const resultString = result.toString();

     return resultString 
};

const verify = async (user, request, idPemetaanKebun) => {
        const chaincodeMethodName = 'VerifyPemetaanKebun';
        const body  = request;
        const email = user.email
        const role = user.role
        const identity = await wallet.getIdentity(email);
        if (!identity) {
            console.log(`An identity for the user "${email}" does not exist in the wallet`);
            console.log('Run the user enrollment script before retrying');
            return;
        }

        // Get the contract from the network.
        const { contract, gateway } = await fabric.getContract(email, role, channelName, chaincodeName);

        // nomor induk pegawai
        const nipVerifikator = user.idRole;
        const namaVerifikator = user.nama;
        // Prepare the payload
        const payload = {
            idPemetaanKebun: idPemetaanKebun,
            nipVerifikator: nipVerifikator,
            namaVerifikator: namaVerifikator,
            statusVerifikator: body.statusVerifikator,
            pesanVerifikator: body.pesanVerifikator,
            waktuVerifikatorPemetaanKebun: time.getCurrentTime(),
            waktuUpdateVerifikator: 'False'
        };

        console.log('tes', payload)
        // Convert the payload to string arguments
        const args = [
            payload.idPemetaanKebun,
            payload.nipVerifikator,
            payload.namaVerifikator,
            payload.statusVerifikator,
            payload.pesanVerifikator,
            payload.waktuVerifikatorPemetaanKebun,
            payload.waktuUpdateVerifikator
        ];

        const result = await contract.submitTransaction(chaincodeMethodName, ...args);
        gateway.disconnect();
       
   
        const resultJSON = JSON.parse(result.toString());

        return resultJSON
};

const UpdateStatusVerify = async (user, request, idPemetaanKebun) => {
    const chaincodeMethodName = 'VerifyPemetaanKebun';
    const body  = request;
    const email = user.email
    const role = user.role
    const identity = await wallet.getIdentity(email);
    if (!identity) {
        console.log(`An identity for the user "${email}" does not exist in the wallet`);
        console.log('Run the user enrollment script before retrying');
        return;
    }

    // Get the contract from the network.
    const { contract, gateway } = await fabric.getContract(email, role, channelName, chaincodeName);

    // nomor induk pegawai
    const nipVerifikator = user.idRole;
    const namaVerifikator = user.nama;
    // Prepare the payload
    const payload = {
        idPemetaanKebun: idPemetaanKebun,
        nipVerifikator: nipVerifikator,
        namaVerifikator: namaVerifikator,
        statusVerifikator: body.statusVerifikator,
        pesanVerifikator: body.pesanVerifikator,
        waktuUpdateVerifikator: time.getCurrentTime(),
    };

  
    const args = [
        payload.idPemetaanKebun,
        payload.nipVerifikator,
        payload.namaVerifikator,
        payload.statusVerifikator,
        payload.pesanVerifikator,
        payload.waktuUpdateVerifikator
    ];

    const result = await contract.submitTransaction(chaincodeMethodName, ...args);
    gateway.disconnect();
   

    const resultJSON = JSON.parse(result.toString());

    return resultJSON
};
const findOne = async (user, idPemetaanKebun) => {
    const chaincodeMethodName = 'ReadAsset';
    const email = user.email;
    const role = user.role;

    try {
        const identity = await wallet.getIdentity(email);
        if (!identity) {
            console.log(`An identity for the user "${email}" does not exist in the wallet`);
            console.log('Run the user enrollment script before retrying');
            return;
        }

        const { contract, gateway } = await fabric.getContract(email, role, channelName, chaincodeName);

        const payload = {
            idPemetaanKebun: idPemetaanKebun
        };

        const args = [
            payload.idPemetaanKebun
        ];

        const result = await contract.submitTransaction(chaincodeMethodName, ...args);
        gateway.disconnect();
        const resultJSON = JSON.parse(result.toString());
        return resultJSON;
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        throw error;
    }
};


const findAll = async (user) => {
    const chaincodeMethodName = 'GetAllPemetaanKebun';
    // Check to see if we've already enrolled the user.
    const email = user.email
    const role = user.role
    const identity = await wallet.getIdentity(email);
    if (!identity) {
        console.log(`An identity for the user "${email}" does not exist in the wallet`);
        console.log('Run the user enrollment script before retrying');
        return;
    }

    // Get the contract from the network.
    const { contract, gateway } = await fabric.getContract(email, role, channelName, chaincodeName);

   
  // queryAllAssets transaction 
   const result = await contract.evaluateTransaction(chaincodeMethodName);

    // Disconnect from the gateway.
    gateway.disconnect();

    const resultJSON = JSON.parse(result.toString());

    return resultJSON
};

const historyPemetaanKebun = async (user, idPemetaanKebun) => {
    const chaincodeMethodName = 'GetHistoryById';
    // Check to see if we've already enrolled the user.
    const email = user.email
    const role = user.role
    const identity = await wallet.getIdentity(email);
    if (!identity) {
        console.log(`An identity for the user "${email}" does not exist in the wallet`);
        console.log('Run the user enrollment script before retrying');
        return;
    }

    // Get the contract from the network.
    const { contract, gateway } = await fabric.getContract(email, role, channelName, chaincodeName);

   
  // queryAllAssets transaction 
   const result = await contract.evaluateTransaction(chaincodeMethodName, idPemetaanKebun);

    // Disconnect from the gateway.
    gateway.disconnect();

    const resultJSON = JSON.parse(result.toString());

    return resultJSON
};


const deleteKebun = async (user, idPemetaanKebun) => {
    const chaincodeMethodName = 'DeletePemetaanKebun';
    const email = user.email;
    const role = user.role;
    
    try {
        const identity = await wallet.getIdentity(email);
        if (!identity) {
            console.log(`An identity for the user "${email}" does not exist in the wallet`);
            console.log('Run the user enrollment script before retrying');
            return;
        }

        const { contract, gateway } = await fabric.getContract(email, role, channelName, chaincodeName);

        const payload = {
            idPemetaanKebun: idPemetaanKebun,
        };

        const args = [
            payload.idPemetaanKebun,
        ];

        const result = await contract.submitTransaction(chaincodeMethodName, ...args);
        gateway.disconnect();
        const resultString = result.toString();
 
        return resultString 
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        throw error;
    }
};

const pemetaanKebunServices = { create, findAll, verify, historyPemetaanKebun, findOne, Update, deleteKebun, UpdateStatusVerify};
export default pemetaanKebunServices;
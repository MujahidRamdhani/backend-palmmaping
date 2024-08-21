import { v4 as uuidv4 } from 'uuid';
import status from 'http-status';
import pkg from 'fabric-network';
const {  Wallets, Gateway} = pkg;
import path from 'path';
import time from '../utils/time.js';
import fabric from '../applications/fabric.js';
import wallet from '../applications/wallet.js';
import util from '../utils/util.js';

const channelName = 'pemetaan-hutan-channel';
const chaincodeName = 'pemetaan-hutan-chaincode';
const create = async (user, request) => {
    const chaincodeMethodName = 'CreatePemetaanHutan';
    const body = request;
    const email = user.email;
    const role = user.role;
    
    try {
        const identity = await wallet.getIdentity(email);
        if (!identity) {
            console.log(`An identity for the user "${email}" does not exist in the wallet`);
            console.log('Run the user enrollment script before retrying');
            return;
        }
        console.log('user', user);
        // Get the contract from the network.
        const { contract, gateway } = await fabric.getContract(email, role, channelName, chaincodeName);
        
        console.log('request', request);
        const payload = {
            idHutan: body.idHutan,
            namaHutan: body.namaHutan,
            longitude: body.longitude, 
            latitude: body.latitude,
            luasHutan: body.luasHutan,
            nipSurveyor: user.idRole,
            namaSurveyor: user.nama,
            waktuPemetaanHutan: time.getCurrentTime(),
            updateWaktuPemetaanHutan: 'False'
        };
console.log('payload', payload);
        const args = [
            payload.idHutan,
            payload.namaHutan,
            payload.longitude,
            payload.latitude,
            payload.luasHutan,
            payload.nipSurveyor,
            payload.namaSurveyor,
            payload.waktuPemetaanHutan,
            payload.updateWaktuPemetaanHutan
        ];
        console.log('args', args);
        const result = await contract.submitTransaction(chaincodeMethodName, ...args);
        gateway.disconnect();
        const resultString = result.toString();
 
        return resultString 
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        throw error;
    }
};

const update = async (user, request, idHutan) => {
    const chaincodeMethodName = 'UpdatePemetaanHutan';
    const body = request;
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
            idHutan: idHutan,
            namaHutan: body.namaHutan,
            longitude: body.longitude, 
            latitude: body.latitude,
            luasHutan: body.luasHutan,
            nipSurveyor: user.idRole,
            namaSurveyor: user.nama,
            waktuPemetaanHutan: time.getCurrentTime(),
            updateWaktuPemetaanHutan: time.getCurrentTime()
        };

        const args = [
            payload.idHutan,
            payload.namaHutan,
            payload.longitude,
            payload.latitude,
            payload.luasHutan,
            payload.nipSurveyor,
            payload.namaSurveyor,
            payload.waktuPemetaanHutan,
            payload.updateWaktuPemetaanHutan
        ];

        const result = await contract.submitTransaction(chaincodeMethodName, ...args);
        gateway.disconnect();
        const resultString = result.toString();
 
        return resultString 
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        throw error;
    }
};

const findOne = async (user, idHutan) => {
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
            idHutan: idHutan
        };

        const args = [
            payload.idHutan
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
    const chaincodeMethodName = 'GetAllPemetaanHutan';
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
        const result = await contract.evaluateTransaction(chaincodeMethodName);
        gateway.disconnect();
        const resultJSON = JSON.parse(result.toString());
        return resultJSON;
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        throw error;
    }
};

const deleteHutan = async (user, idHutan) => {
    const chaincodeMethodName = 'DeletePemetaanHutan';
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
            idHutan: idHutan,
        };

        const args = [
            payload.idHutan,
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

const historyPemetaanHutan = async (user, idHutan) => {
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
   const result = await contract.evaluateTransaction(chaincodeMethodName, idHutan);

    // Disconnect from the gateway.
    gateway.disconnect();

    const resultJSON = JSON.parse(result.toString());

    return resultJSON
};


const pemetaanHutanServices = { create, update, findAll , deleteHutan, findOne, historyPemetaanHutan};
export default pemetaanHutanServices;

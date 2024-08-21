import pkg from 'fabric-network';
const { Gateway, Wallets} = pkg;
import path  from 'path';
import fs from 'fs/promises';
import fabric from '../applications/fabric.js';



const historyPemetaanKebun = async (user, idPemetaanKebun) => {
    const chaincodeMethodName = 'GetHistoryById';
    const channelName = "pemetaan-kebun-channel";  // Replace with your channel name
    const chaincodeName = "pemetaan-kebun-chaincode"; // Replace with your chaincode name

    const email = user.email;
    const role = user.role;

    const { contract, gateway, channel } = await fabric.getContract(email, role, channelName, chaincodeName);


    // Query the chaincode to get history
    const pemetaanKebunResponses = await contract.evaluateTransaction(chaincodeMethodName, idPemetaanKebun);

    const responsesWithHash = [];

    // Initialize the Client to query blocks by transaction ID
    const client = channel.getChannel().client;

    for (let i = 0; i < pemetaanKebunResponses.length; i++) {
        const txId = pemetaanKebunResponses[i].IdTransaksiBlockchain;

        // Query block by transaction ID using the client
        const block = await client.queryBlockByTxID(txId);

        // Extract the previous block hash from the block header
        const previousHash = block.header.previous_hash;

        // Store the result including the previous hash
        responsesWithHash.push({
            ...pemetaanKebunResponses[i],
            previousHash: previousHash.toString('hex')
        });
    }

    // Disconnect from the gateway when done
    gateway.disconnect();

    return responsesWithHash; // Return the array of responses with the previous hash
};

// Example usage:
const user = {
    email: 'koperasi.admin@palmmapping.co.id',
    role: 'KOPERASI'
};

historyPemetaanKebun(user, 'some-id-pemetaan-kebun')
    .then(responses => {
        console.log('Responses with Previous Hash:', responses);
    })
    .catch(error => {
        console.error('Error processing historyPemetaanKebun:', error);
    });

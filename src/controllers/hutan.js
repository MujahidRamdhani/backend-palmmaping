import pkg from 'fabric-network';
const { Wallets, Gateway, X509Identity } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import util from '../utils/util.js';
import FabricCAServices from 'fabric-ca-client';

const channelName = 'pemetaan-hutan-channel';
const chaincodeName = 'pemetaan-hutan-chaincode';

// Mendapatkan __dirname di ES6 module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const organizationName = 'Dinas';
    try {
        // Load the network configuration
        const ccpPath = path.resolve(__dirname, 'C:/Users/Administrator/Documents/program/authentication/backend/controllers/fabric.json'); 
        const ccp = JSON.parse(await fs.readFile(ccpPath, 'utf8'));
        // const {ccp} = await util.getNetworkInfo(organizationName);
        // Create a new file system-based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('dinas4@gmail.com');
        if (!identity) {
            console.log('An identity for the user "dinas4@gmail.com" does not exist in the wallet');
            console.log('Run the user enrollment script before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: 'dinas4@gmail.com',
            discovery: { enabled: true, asLocalhost: true }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);

        // Submit the specified transaction.
        const result = await contract.submitTransaction('CreatePemetaanHutan', '00012311', 'Hutan Lindung', '[001.100]', '[002.200]' , '11', '11:11' , '22:22');
        
        // Convert buffer to string
        const resultString = result.toString();
        console.log(resultString);

        // Disconnect from the gateway.
        // await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();

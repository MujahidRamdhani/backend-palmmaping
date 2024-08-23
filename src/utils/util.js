import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
// const readFile = async (pathFilename) => {
//   try {
//     const result = await fs.readFile(pathFilename, 'utf8');
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };

import { fileURLToPath } from 'url';
// Mendapatkan __dirname di ES6 module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const getAttributeName = (type) => {

 
  if (typeof type !== 'string') {
    throw new Error('Invalid type: type must be a string', type);
  }

  type = type.toLowerCase();

  if (type === 'dinas') {
    return {
      roleName: 'dinas',
      tableName: 'dinas',
      databaseRoleName: 'DINAS',
      organizationName: 'Dinas',
      affiliationName: 'dinas.department1',
    };
  }

  if (type === 'koperasi') {
    return {
      roleName: 'koperasi',
      tableName: 'koperasi',
      databaseRoleName: 'KOPERASI',
      organizationName: 'Koperasi',
      affiliationName: 'koperasi.department1',
    };
  }

  if (type === 'petani') {
    return {
      roleName: 'petani',
      tableName: 'petani',
      databaseRoleName: 'PETANI',
      organizationName: 'Petani',
      affiliationName: 'petani.department1',
    };
  }
  if (type === 'public') {
    return {
      roleName: 'public',
      tableName: 'public',
      databaseRoleName: 'PUBLIC',
      organizationName: 'Public',
      affiliationName: 'public.department1',
    };
  }

  throw new Error('Invalid type');
};




async function readConfigFile(pathFilename) {
  try {
    const result = await fs.readFile(pathFilename, 'utf-8');
    return result;
  } catch (error) {
    console.error('Error reading file:', error);
  }
}


const readFile = async (pathFilename) => {
  try {
    const result = await fs.readFile(pathFilename, 'utf8');
    return result;
  } catch (error) {
    console.error(error);
  }
};



async function getNetworkInfo(organizationName) {
  
    const fabricConfig = await readFile('src/config/fabric-config.json');;

    console.log(fabricConfig)
    const { email, password, msp, connectionProfile } = JSON.parse(fabricConfig).orgs[organizationName];;
    const { certificateAuthorities } = connectionProfile;
    const { url, caName, tlsCACerts, } = certificateAuthorities[Object.keys(certificateAuthorities)[0]];
    const caTLSCACerts = tlsCACerts.pem;
    const caUrl = url;
    return {msp, caTLSCACerts, caUrl, caName,  password, connectionProfile, email}
}


async function getNetworkInfoAdmin(organizationName) {
  
  const fabricConfig = await readFile('src/config/fabric-config.json');;

  console.log(fabricConfig)
  const { email, password, msp, connectionProfile } = JSON.parse(fabricConfig).orgs[organizationName];;
  const { certificateAuthorities } = connectionProfile;
  const { url, caName, tlsCACerts, } = certificateAuthorities[Object.keys(certificateAuthorities)[0]];
  const caTLSCACerts = tlsCACerts.pem;
  const caUrl = url;
  return {msp, caTLSCACerts, caUrl, caName,  password, connectionProfile, email}
}


const util = { getAttributeName, getNetworkInfo, getNetworkInfoAdmin};
export default util;

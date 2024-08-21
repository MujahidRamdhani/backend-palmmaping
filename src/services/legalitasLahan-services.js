

import time from '../utils/time.js';
import fabric from '../applications/fabric.js';
import wallet from '../applications/wallet.js';
import { v4 as uuidv4 } from 'uuid';
const channelName = 'legalitas-lahan-channel';
const chaincodeName = 'legalitas-lahan-chaincode';

// const create = async (user, request) => {
//     const chaincodeMethodName = 'CreateLegalitasLahan';
//     const body  = request;
//     const email = user.email;
//     const role = user.role;
//     const identity = await wallet.getIdentity(email);
    
//     if (!identity) {
//         console.log(`An identity for the user "${email}" does not exist in the wallet`);
//         console.log('Run the user enrollment script before retrying');
//         return {
//             status: '500 Internal Server Error',
//             message: `An identity for the user "${email}" does not exist in the wallet. Run the user enrollment script before retrying.`
//         };
//     }

//     // Get the contract from the network.
//     const { contract, gateway } = await fabric.getContract(email, role, channelName, chaincodeName);
// console.log('user', user)
//     // nomor induk kependudukan
//     const nik = user.idRole;
//     const nama = user.nama;
//     console.log('nik', nik);

//       // Check if nik is undefined
//       if (!nik) {
//         console.log('Error: nik (user.idRole) is undefined.');
//         return {
//             status: '400 Bad Request',
//             message: 'nik (user.idRole) is required but is undefined.'
//         };
//     }
//     // Prepare the payload
//     const payload = {
//         nomorSTDB: body.nomorSTDB,
//         nik: nik,
//         nama: nama,
//         alamatKebun: body.alamatKebun,
//         statusKepemilikanLahan: body.statusKepemilikanLahan,
//         nomorSertifikat: body.nomorSertifikat,
//         jenisTanaman: body.jenisTanaman,
//         produksiPerHaPerTahun: body.produksiPerHaPerTahun,
//         asalBenih: body.asalBenih,
//         polaTanaman: body.polaTanaman,
//         jenisPupuk: body.jenisPupuk,
//         mitraPengolahan: body.mitraPengolahan,
//         jenisTanah: body.jenisTanah,
//         tahunTanaman: body.tahunTanaman,
//         usahaLainDikebun: body.usahaLainDikebun,
//         cidFileLegalitasKebun: body.cidFileLegalitasKebun,
//         cidFotoKebun: body.cidFotoKebun,
//         waktuPengajuanLegalitas: time.getCurrentTime(),
//     };

//     console.log(payload);

//     // Convert the payload to string arguments
//     const args = [
//         payload.nomorSTDB,
//         payload.nik,
//         payload.nama,
//         payload.alamatKebun,
//         payload.statusKepemilikanLahan,
//         payload.nomorSertifikat,
//         payload.jenisTanaman,
//         payload.produksiPerHaPerTahun,
//         payload.asalBenih,
//         payload.polaTanaman,
//         payload.jenisPupuk,
//         payload.mitraPengolahan,
//         payload.jenisTanah,
//         payload.tahunTanaman,
//         payload.usahaLainDikebun,
//         payload.cidFileLegalitasKebun,
//         payload.cidFotoKebun,
//         payload.waktuPengajuanLegalitas
//     ];

//     try {
//         const result = await contract.submitTransaction(chaincodeMethodName, ...args);
//         gateway.disconnect();
        
//         if (result) {
//             const resultString = result.toString();
//             return {
//                 status: '200 OK',
//                 data: resultString
//             };
//         } else {
//             console.log('Transaction has no return value.');
//             return {
//                 status: '200 OK',
//                 data: null
//             };
//         }
//     } catch (error) {
//         console.error(`Failed to submit transaction: ${error}`);
//         return {
//             status: '500 Internal Server Error',
//             message: `Failed to submit transaction: ${error}`
//         };
//     }
// };


const create = async (user, request, data) => {
    const chaincodeMethodName = 'CreatePengajuan';
    const body  = request;
    const email = user.email;
    const role = user.role;
    const identity = await wallet.getIdentity(email);
    
    if (!identity) {
        console.log(`An identity for the user "${email}" does not exist in the wallet`);
        console.log('Run the user enrollment script before retrying');
        return {
            status: '500 Internal Server Error',
            message: `An identity for the user "${email}" does not exist in the wallet. Run the user enrollment script before retrying.`
        };
    }

    // Get the contract from the network.
    const { contract, gateway } = await fabric.getContract(email, role, channelName, chaincodeName);
    const { namaPetani, nik, niKoperasi, namaKoperasi} = data
      
    // Check if nik is undefined
      if (!nik) {
        console.log('Error: nik (user.idRole) is undefined.');
        return {
            status: '400 Bad Request',
            message: 'nik (user.idRole) is required but is undefined.'
        };
    }
    // Prepare the payload
const uuid = uuidv4();
const timestamp = time.getCurrentTime()
const uniqueId = `${uuid}-${timestamp}`;
    const payload = {
        nomorSTDB: body.nomorSTDB,
        nik: nik,
        nama: namaPetani,
        idDataKebun: uniqueId,
        nikKonfirmator : niKoperasi,
        namaKonfirmator : namaKoperasi,
        alamatKebun: body.alamatKebun,
        statusKepemilikanLahan: body.statusKepemilikanLahan,
        nomorSertifikat: body.nomorSertifikat,
        jenisTanaman: body.jenisTanaman,
        produksiPerHaPerTahun: body.produksiPerHaPerTahun,
        jumlahPohon: body.jumlahPohon,
        asalBenih: body.asalBenih,
        polaTanaman: body.polaTanaman,
        jenisPupuk: body.jenisPupuk,
        mitraPengolahan: body.mitraPengolahan,
        jenisTanah: body.jenisTanah,
        tahunTanaman: body.tahunTanaman,
        usahaLainDikebun: body.usahaLainDikebun,
        cidFotoKebun: body.cidFotoKebun,
        cidFileLegalitasKebun: body.cidFileLegalitasKebun,
        waktuPembuatan: time.getCurrentTime(),
        waktuPengajuan: time.getCurrentTime(),
    };

    console.log(payload);

    // Convert the payload to string arguments
    const args = [
        payload.nomorSTDB,
        payload.nik,
        payload.nama,
        payload.idDataKebun,
        payload.nikKonfirmator,
        payload.namaKonfirmator,
        payload.alamatKebun,
        payload.statusKepemilikanLahan,
        payload.nomorSertifikat,
        payload.jenisTanaman,
        payload.produksiPerHaPerTahun,
        payload.jumlahPohon,
        payload.asalBenih,
        payload.polaTanaman,
        payload.jenisPupuk,
        payload.mitraPengolahan,
        payload.jenisTanah,
        payload.tahunTanaman,
        payload.usahaLainDikebun,
        payload.cidFotoKebun,
        payload.cidFileLegalitasKebun,
        payload.waktuPembuatan,
        payload.waktuPengajuan
    ];

    console.log('data', args);

    try {
        const result = await contract.submitTransaction(chaincodeMethodName, ...args);
        gateway.disconnect();
        
        if (result) {
            const resultString = result.toString();
            return {
                status: '200 OK',
                data: resultString
            };
        } else {
            console.log('Transaction has no return value.');
            return {
                status: '200 OK',
                data: null
            };
        }
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return {
            status: '500 Internal Server Error',
            message: `Failed to submit transaction: ${error}`
        };
    }
};



const createV2 = async (user, request) => {
    const chaincodeMethodName = 'CreatePengajuan';
    const body  = request;
    const email = user.email;
    const role = user.role;
    const identity = await wallet.getIdentity(email);
    
    if (!identity) {
        console.log(`An identity for the user "${email}" does not exist in the wallet`);
        console.log('Run the user enrollment script before retrying');
        return {
            status: '500 Internal Server Error',
            message: `An identity for the user "${email}" does not exist in the wallet. Run the user enrollment script before retrying.`
        };
    }

    // Get the contract from the network.
    const { contract, gateway } = await fabric.getContract(email, role, channelName, chaincodeName);
console.log('user', user)
    // nomor induk kependudukan
    const nik = user.idRole;
    const nama = user.nama;
    console.log('nik', nik);

      // Check if nik is undefined
      if (!nik) {
        console.log('Error: nik (user.idRole) is undefined.');
        return {
            status: '400 Bad Request',
            message: 'nik (user.idRole) is required but is undefined.'
        };
    }
    const uuid = uuidv4();
    const timestamp = time.getCurrentTime()
    const uniqueId = `${uuid}-${timestamp}`;
   
    const payload = {
        nomorSTDB: body.nomorSTDB,
        nik: nik,
        nama: nama,
        idDataKebun: uniqueId,
        waktuPengajuan : time.getCurrentTime(),
        alamatKebun: body.alamatKebun,
        statusKepemilikanLahan: body.statusKepemilikanLahan,
        nomorSertifikat: body.nomorSertifikat,
        jenisTanaman: body.jenisTanaman,
        produksiPerHaPerTahun: body.produksiPerHaPerTahun,
        jumlahPohon: body.jumlahPohon,
        asalBenih: body.asalBenih,
        polaTanaman: body.polaTanaman,
        jenisPupuk: body.jenisPupuk,
        mitraPengolahan: body.mitraPengolahan,
        jenisTanah: body.jenisTanah,
        tahunTanaman: body.tahunTanaman,
        usahaLainDikebun: body.usahaLainDikebun,
        cidFotoKebun: body.cidFotoKebun,
        cidFileLegalitasKebun: body.cidFileLegalitasKebun,
        waktuPembuatan: time.getCurrentTime(),
    };

    console.log(payload);

    // Convert the payload to string arguments
    const args = [
        payload.nomorSTDB,
        payload.nik,
        payload.nama,
        payload.idDataKebun,
        payload.waktuPengajuan,
        payload.alamatKebun,
        payload.statusKepemilikanLahan,
        payload.nomorSertifikat,
        payload.jenisTanaman,
        payload.produksiPerHaPerTahun,
        payload.jumlahPohon,
        payload.asalBenih,
        payload.polaTanaman,
        payload.jenisPupuk,
        payload.mitraPengolahan,
        payload.jenisTanah,
        payload.tahunTanaman,
        payload.usahaLainDikebun,
        payload.cidFotoKebun,
        payload.cidFileLegalitasKebun,
        payload.waktuPembuatan
    ];

    try {
        const result = await contract.submitTransaction(chaincodeMethodName, ...args);
        gateway.disconnect();
        
        if (result) {
            const resultString = result.toString();
            return {
                status: '200 OK',
                data: resultString
            };
        } else {
            console.log('Transaction has no return value.');
            return {
                status: '200 OK',
                data: null
            };
        }
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return {
            status: '500 Internal Server Error',
            message: `Failed to submit transaction: ${error}`
        };
    }
};

const createUpdate = async (user, request, nomorSTDB) => {
    const chaincodeMethodName = 'UpdateLegalitasdanKebun';
    const body  = request;
    const email = user.email;
    const role = user.role;
    const identity = await wallet.getIdentity(email);
    
    if (!identity) {
        console.log(`An identity for the user "${email}" does not exist in the wallet`);
        console.log('Run the user enrollment script before retrying');
        return {
            status: '500 Internal Server Error',
            message: `An identity for the user "${email}" does not exist in the wallet. Run the user enrollment script before retrying.`
        };
    }

    // Get the contract from the network.
    const { contract, gateway } = await fabric.getContract(email, role, channelName, chaincodeName);
    // nomor induk Kependudukan
    const nik = user.idRole;
    const nama = user.nama;

      // Check if nik is undefined
      if (!nik) {
        console.log('Error: nik (user.idRole) is undefined.');
        return {
            status: '400 Bad Request',
            message: 'nik (user.idRole) is required but is undefined.'
        };
    }
    
    // Prepare the payload
    const payload = {
        nomorSTDB: nomorSTDB,
        idDataKebun: body.idDataKebun,
        nikKonfirmator: body.nikKonfirmator,
        namaKonfirmator: body.namaKonfirmator,
        nik: nik,
        nama: nama,
        alamatKebun: body.alamatKebun,
        statusKepemilikanLahan: body.statusKepemilikanLahan,
        nomorSertifikat: body.nomorSertifikat,
        jenisTanaman: body.jenisTanaman,
        produksiPerHaPerTahun: body.produksiPerHaPerTahun,
        jumlahPohon: body.jumlahPohon,
        asalBenih: body.asalBenih,
        polaTanam: body.polaTanam,
        jenisPupuk: body.jenisPupuk,
        mitraPengolahan: body.mitraPengolahan,
        jenisTanah: body.jenisTanah,
        tahunTanam: body.tahunTanam,
        usahaLainDikebun: body.usahaLainDikebun,
        cidFotoKebun: body.cidFotoKebun,
        cidFileLegalitasKebun: body.cidFileLegalitasKebun,
        waktuPengajuan : body.waktuPengajuan,
        updateWaktuPengajuan: time.getCurrentTime(),
        waktuPembuatan: body.waktuPengajuan,
        waktuUpdatePembuatan: time.getCurrentTime(),

    };

    console.log(payload);

    // Convert the payload to string arguments
    const args = [
        payload.nomorSTDB,
        payload.idDataKebun,
        payload.nikKonfirmator,
        payload.namaKonfirmator,
        payload.nik,
        payload.nama,
        payload.alamatKebun,
        payload.statusKepemilikanLahan,
        payload.nomorSertifikat,
        payload.jenisTanaman,
        payload.produksiPerHaPerTahun,
        payload.jumlahPohon,
        payload.asalBenih,
        payload.polaTanam,
        payload.jenisPupuk,
        payload.mitraPengolahan,
        payload.jenisTanah,
        payload.tahunTanam,
        payload.usahaLainDikebun,
        payload.cidFotoKebun,
        payload.cidFileLegalitasKebun,
        payload.waktuPengajuan,
        payload.updateWaktuPengajuan,
        payload.waktuPembuatan,
        payload.waktuUpdatePembuatan
    ];
   
    try {
        const result = await contract.submitTransaction(chaincodeMethodName, ...args);
        gateway.disconnect();
        
        if (result) {
            const resultString = result.toString();
            return {
                status: '200 OK',
                data: resultString
            };
        } else {
            console.log('Transaction has no return value.');
            return {
                status: '200 OK',
                data: null
            };
        }
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return {
            status: '500 Internal Server Error',
            message: `Failed to submit transaction: ${error}`
        };
    }
};

const createBaru = async (user, request) => {
    const chaincodeMethodName = 'CreateLegalitasLahan';
    const body  = request;
    const email = user.email;
    const role = user.role;
    const identity = await wallet.getIdentity(email);
    
    if (!identity) {
        console.log(`An identity for the user "${email}" does not exist in the wallet`);
        console.log('Run the user enrollment script before retrying');
        return {
            status: '500 Internal Server Error',
            message: `An identity for the user "${email}" does not exist in the wallet. Run the user enrollment script before retrying.`
        };
    }

    // Get the contract from the network.
    const { contract, gateway } = await fabric.getContract(email, role, channelName, chaincodeName);
console.log('user', user)
    // nomor induk kependudukan
    const nik = user.idRole;
    const nama = user.nama;
    console.log('nik', nik);

      // Check if nik is undefined
      if (!nik) {
        console.log('Error: nik (user.idRole) is undefined.');
        return {
            status: '400 Bad Request',
            message: 'nik (user.idRole) is required but is undefined.'
        };
    }
    // Prepare the payload
    const payload = {
        nomorSTDB: body.nomorSTDB,
        nik: nik,
        nama: nama,
        idDataKebun: body.idDataKebun,
        waktuPengajuanLegalitas: time.getCurrentTime(),
    };

    console.log(payload);

    // Convert the payload to string arguments
    const args = [
        payload.nomorSTDB,
        payload.nik,
        payload.nama,
        payload.idDataKebun,
        payload.waktuPengajuanLegalitas
    ];

    try {
        const result = await contract.submitTransaction(chaincodeMethodName, ...args);
        gateway.disconnect();
        
        if (result) {
            const resultString = result.toString();
            return {
                status: '200 OK',
                data: resultString
            };
        } else {
            console.log('Transaction has no return value.');
            return {
                status: '200 OK',
                data: null
            };
        }
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return {
            status: '500 Internal Server Error',
            message: `Failed to submit transaction: ${error}`
        };
    }
};

const createDataKebun = async (user, request) => {
    const chaincodeMethodName = 'CreateDataKebunBaru';
    const body  = request;
    const email = user.email;
    const role = user.role;
    const identity = await wallet.getIdentity(email);
    
    if (!identity) {
        console.log(`An identity for the user "${email}" does not exist in the wallet`);
        console.log('Run the user enrollment script before retrying');
        return {
            status: '500 Internal Server Error',
            message: `An identity for the user "${email}" does not exist in the wallet. Run the user enrollment script before retrying.`
        };
    }

    // Get the contract from the network.
    const { contract, gateway } = await fabric.getContract(email, role, channelName, chaincodeName);
    // nomor induk kependudukan
    const nik = user.idRole;
    const nama = user.nama;

      // Check if nik is undefined
      if (!nik) {
        console.log('Error: nik (user.idRole) is undefined.');
        return {
            status: '400 Bad Request',
            message: 'nik (user.idRole) is required but is undefined.'
        };
    }
    const uuid = uuidv4();
    const timestamp = time.getCurrentTime()
    const uniqueId = `${uuid}-${timestamp}`;

    // Prepare the payload
    const payload = {
        idDataKebun: uniqueId,
        alamatKebun: body.alamatKebun,
        statusKepemilikanLahan: body.statusKepemilikanLahan,
        nomorSertifikat: body.nomorSertifikat,
        jenisTanaman: body.jenisTanaman,
        produksiPerHaPerTahun: body.produksiPerHaPerTahun,
        jumlahPohon: body.jumlahPohon,
        asalBenih: body.asalBenih,
        polaTanaman: body.polaTanaman,
        jenisPupuk: body.jenisPupuk,
        mitraPengolahan: body.mitraPengolahan,
        jenisTanah: body.jenisTanah,
        tahunTanaman: body.tahunTanaman,
        usahaLainDikebun: body.usahaLainDikebun,
        cidFotoKebun: body.cidFotoKebun,
        cidFileLegalitasKebun: body.cidFileLegalitasKebun,
        waktuPembuatan: time.getCurrentTime(),
        // waktuUpdatePembuatan: time.getCurrentTime()
    };

    console.log(payload);

    // Convert the payload to string arguments
    const args = [
        payload.idDataKebun,
        payload.alamatKebun,
        payload.statusKepemilikanLahan,
        payload.nomorSertifikat,
        payload.jenisTanaman,
        payload.produksiPerHaPerTahun,
        payload.jumlahPohon,
        payload.asalBenih,
        payload.polaTanaman,
        payload.jenisPupuk,
        payload.mitraPengolahan,
        payload.jenisTanah,
        payload.tahunTanaman,
        payload.usahaLainDikebun,
        payload.cidFotoKebun,
        payload.cidFileLegalitasKebun,
        payload.waktuPembuatan,
        // payload.waktuUpdatePembuatan
    ];

    console.log('args', args)

    try {
        const result = await contract.submitTransaction(chaincodeMethodName, ...args);
        gateway.disconnect();
        
        if (result) {
            const resultString = result.toString();
            return {
                status: '200 OK',
                data: resultString
            };
        } else {
            console.log('Transaction has no return value.');
            return {
                status: '200 OK',
                data: null
            };
        }
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return {
            status: '500 Internal Server Error',
            message: `Failed to submit transaction: ${error}`
        };
    }
};
const confirm = async (user, request, nomorSTDB) => {
    const chaincodeMethodName = 'confirmLegalitasKebun';
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

        // Get the contract from the network.
        const { contract, gateway } = await fabric.getContract(email, role, channelName, chaincodeName);

        // nomor induk koperasi
        const nikKonfirmator = user.idRole;
        const namaKonfirmator = user.nama;
        const updateWaktuKonfirmator = 'False'
        
        // Prepare the payload
        const payload = {
            nomorSTDB: nomorSTDB,
            nikKonfirmator: nikKonfirmator,
            namaKonfirmator: namaKonfirmator,
            statusKonfirmator: body.statusKonfirmator,
            pesanKonfirmator: body.pesanKonfirmator,
            waktuKonfirmator: time.getCurrentTime(),
            updateWaktuKonfirmator: updateWaktuKonfirmator 
        };
        console.log(payload);
        // Convert the payload to string arguments
        const args = [
            payload.nomorSTDB,
            payload.nikKonfirmator,
            payload.namaKonfirmator,
            payload.statusKonfirmator,
            payload.pesanKonfirmator,
            payload.waktuKonfirmator,
            payload.updateWaktuKonfirmator 
        ];

        

        const result = await contract.submitTransaction(chaincodeMethodName, ...args);
        gateway.disconnect();

        if (result) {
            const resultString = result.toString();
            return {
                status: '200 OK',
                data: resultString
            };
        } else {
            console.log('Transaction has no return value.');
            return {
                status: '200 OK',
                data: null
            };
        }
    } catch (error) {
        console.error("Error during transaction submission:", error);
        return `Error: ${error.message}`;
    }
};

const publish = async (user, request, nomorSTDB) => {
    const chaincodeMethodName = 'publishLegalitasLahan';
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

        // nomor induk koperasi
        const nipPenerbitLegalitas = user.idRole;
        const namaPenerbitLegalitas = user.nama;
        
        console.log('nomorSTDB', nomorSTDB);
        const payload = {
            nomorSTDB: nomorSTDB,
            nipPenerbitLegalitas: nipPenerbitLegalitas,
            namaPenerbitLegalitas: namaPenerbitLegalitas,
            statusPenerbitLegalitas: 'Diterbitkan',
            waktuPenerbitLegalitas: time.getCurrentTime(),
            updateWaktuPenerbitLegalitas: 'False',
        };

        console.log('payload' ,payload);
  

        const args = [
            payload.nomorSTDB,
            payload.nipPenerbitLegalitas,
            payload.namaPenerbitLegalitas,
            payload.statusPenerbitLegalitas,
            payload.waktuPenerbitLegalitas,
            payload.updateWaktuPenerbitLegalitas
        ];

        
        console.log("Submitting transaction with args:", args);

        const result = await contract.submitTransaction(chaincodeMethodName, ...args);
        gateway.disconnect();

        if (result) {
            const resultString = result.toString();
            
            return {
                status: '200 OK',
                data: resultString
            };
        } else {
            console.log('Transaction has no return value.');
            return {
                status: '200 OK',
                data: null
            };
        }
    } catch (error) {
        console.error("Error during transaction submission:", error);
        return `Error: ${error.message}`;
    }
};



const PetakanLahan = async (user, request) => {
    const chaincodeMethodName = 'AddPemetaanKebun';
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

         // Prepare the payload
         const payload = {
            nomorSTDB: body.nomorSTDB,
            idPemetaanKebun: body.idPemetaanKebun
         };

         console.log(payload);
 
         // Convert the payload to string arguments
         const args = [
            payload.nomorSTDB,
            payload.idPemetaanKebun
         ];

        const result = await contract.submitTransaction(chaincodeMethodName, ...args);
        gateway.disconnect();
        const resultString = result.toString();
 
        return resultString
};

// const mergeData = (data) => {
//     const mainData = data.find(item => item.idDataKebun);
//     const additionalData = data.find(item => item.dataKebunId);
  
//     if (mainData && additionalData && mainData.idDataKebun === additionalData.dataKebunId) {
//       // Merging the two objects
//       return {
//         ...mainData,
//         ...additionalData,
//       };
//     }
  
//     // return null; // If no match is found
//   };
const mergeData = (data) => {
    // Pisahkan array menjadi dua bagian
    const mainData = data.filter(item => item.idDataKebun);
    const additionalData = data.filter(item => item.dataKebunId);

    // Gabungkan data berdasarkan idDataKebun dan dataKebunId
    const mergedData = mainData.map(mainItem => {
        const matchingAdditionalData = additionalData.find(addItem => addItem.dataKebunId === mainItem.idDataKebun);
        return matchingAdditionalData ? { ...mainItem, ...matchingAdditionalData } : mainItem;
    });

    return mergedData;
};


const findAll = async (user) => {
    const chaincodeMethodName = 'GetAllLegalitasLahan';
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
    const { contract, gateway } = await fabric.getContract(email, role,channelName, chaincodeName);

   
  // queryAllAssets transaction 
   const result = await contract.evaluateTransaction(chaincodeMethodName);

    // Disconnect from the gateway.
    gateway.disconnect();
    const resultJSON = JSON.parse(result.toString());
    // return resultJSON

    return mergeData(resultJSON)
   
};
const Update = async (user, request, nomorSTDB) => {
    const chaincodeMethodName = 'UpdateLegalitasKebun';
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
    console.log(body)
    // nomor induk Kependudukan
    const nik = user.idRole;
    const nama = user.nama;
    const idPemetaanKebun = 'Belum dipetakan'
    const nikKonfirmator = 'False' ;
    const namaKonfirmator = 'False' ;
    const statusKonfirmator = 'Belum dikonfirmasi';
    const pesanKonfirmator = 'False';
    const waktuKonfirmator = 'False';
    const updateWaktuKonfirmator = 'False';
    const nipPenerbitLegalitas = 'False';
    const namaPenerbitLegalitas = 'False';
    const statusPenerbitLegalitas = 'Belum diterbitkan';
    const waktuPenerbitLegalitas = 'False';
    const updateWaktuPenerbitLegalitas = 'False';

    const payload = {
        nomorSTDB: nomorSTDB,
        nik: nik,
        nama: nama,
        alamatKebun: body.alamatKebun,
        statusKepemilikanLahan: body.statusKepemilikanLahan,
        nomorSertifikat: body.nomorSertifikat,
        jenisTanaman: body.jenisTanaman,
        produksiPerHaPertahun: body.produksiPerHaPerTahun,
        jumlahPohon: body.jumlahPohon,
        asalBenih: body.asalBenih,
        polaTanam: body.polaTanam,
        jenisPupuk: body.jenisPupuk,
        mitraPengolahan: body.mitraPengolahan,
        jenisTanah: body.jenisTanah,
        tahunTanam: body.tahunTanam,
        usahaLainDikebun: body.usahaLainDikebun,
        idPemetaanKebun: idPemetaanKebun,
        cidFotoKebun: body.cidFotoKebun,
        cidFileLegalitasKebun: body.cidFileLegalitasKebun,
        nikKonfirmator: nikKonfirmator,
        namaKonfirmator: namaKonfirmator,
        statusKonfirmator: statusKonfirmator,
        nipPenerbitLegalitas: nipPenerbitLegalitas,
        namaPenerbitLegalitas: namaPenerbitLegalitas,
        statusPenerbitLegalitas: statusPenerbitLegalitas,
        pesanKonfirmator: pesanKonfirmator,
        waktuPengajuan: body.waktuPengajuan,
        updateWaktuPengajuan: time.getCurrentTime(),
        waktuKonfirmator: waktuKonfirmator,
        updateWaktuKonfirmator: updateWaktuKonfirmator,
        waktuPenerbitLegalitas: waktuPenerbitLegalitas,
        updateWaktuPenerbitLegalitas: updateWaktuPenerbitLegalitas,
    };

    console.log('data',payload)

    // Convert the payload to string arguments
    const args = [
        payload.nomorSTDB,
        payload.nomorSTDB,
        payload.nik,
        payload.nama,
        payload.alamatKebun,
        payload.statusKepemilikanLahan,
        payload.nomorSertifikat,
        payload.jenisTanaman,
        payload.produksiPerHaPertahun,
        payload.jumlahPohon,
        payload.asalBenih,
        payload.polaTanam,
        payload.jenisPupuk,
        payload.mitraPengolahan,
        payload.jenisTanah,
        payload.tahunTanam,
        payload.usahaLainDikebun,
        payload.idPemetaanKebun,
        payload.cidFotoKebun,
        payload.cidFileLegalitasKebun,
        payload.nikKonfirmator,
        payload.namaKonfirmator,
        payload.statusKonfirmator,
        payload.nipPenerbitLegalitas,
        payload.namaPenerbitLegalitas,
        payload.statusPenerbitLegalitas,
        payload.pesanKonfirmator,
        payload.waktuPengajuan,
        payload.updateWaktuPengajuan,
        payload.waktuKonfirmator,
        payload.updateWaktuKonfirmator,
        payload.waktuPenerbitLegalitas,
        payload.updateWaktuPenerbitLegalitas
    ];
    console.log('args ', args)

     const result = await contract.submitTransaction(chaincodeMethodName, ...args);
     gateway.disconnect();
     const resultString = result.toString();

     return resultString 
};

const findOne = async (user, nomorSTDB) => {
    const chaincodeMethodName = 'FindOneByNomorSTDB';
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
            nomorSTDB: nomorSTDB
        };

        const args = [
            payload.nomorSTDB
        ];

        const result = await contract.submitTransaction(chaincodeMethodName, ...args);
        gateway.disconnect();
        const resultJSON = JSON.parse(result.toString());
        const combinedObject = {
            ...resultJSON.legalitasLahan,
            ...resultJSON.dataKebun
        };

        return combinedObject;
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        throw error;
    }
};


const historyLegalitasLahan = async (user, nomorSTDB) => {
    const chaincodeMethodName = 'GetHistoryDataKebunById';
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
   const result = await contract.evaluateTransaction(chaincodeMethodName, nomorSTDB);

    // Disconnect from the gateway.
    gateway.disconnect();

    const resultJSON = JSON.parse(result.toString());

    return resultJSON
};
const updateStatusConfirm = async (user, request, nomorSTDB) => {
    const chaincodeMethodName = 'UpdateStatusConfirm';
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
    console.log(body)
    // nomor induk koperasi
    const nikKonfirmator = user.idRole;
    const namaKonfirmator = user.nama;
   
    
    // Prepare the payload
    const payload = {
        nomorSTDB: nomorSTDB,
        nikKonfirmator: nikKonfirmator,
        namaKonfirmator: namaKonfirmator,
        statusKonfirmator: body.statusKonfirmator,
        pesanKonfirmator: body.pesanKonfirmator,
        updateWaktuKonfirmator: time.getCurrentTime() 
    };
  
   
    const args = [
        payload.nomorSTDB,
        payload.nikKonfirmator,
        payload.namaKonfirmator,
        payload.statusKonfirmator,
        payload.pesanKonfirmator,
        payload.updateWaktuKonfirmator 
    ];

     const result = await contract.submitTransaction(chaincodeMethodName, ...args);
     gateway.disconnect();
     const resultString = result.toString();

     return resultString 
};

const updateStatusPenerbitanLegalitas = async (user, request, nomorSTDB) => {
    const chaincodeMethodName = 'UpdateStatusPenerbitan';
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
    console.log(body)
    // nomor induk koperasi
   
   
    
    // Prepare the payload
    const payload = {
        nomorSTDB: nomorSTDB,
   
    };
  
   
    const args = [
        payload.nomorSTDB,
    ];

     const result = await contract.submitTransaction(chaincodeMethodName, ...args);
     gateway.disconnect();
     const resultString = result.toString();

     return resultString 
};


const legalitasLahanServices = { create, findAll, confirm, PetakanLahan, publish, findOne, Update, historyLegalitasLahan, createDataKebun, createBaru, createV2, createUpdate, updateStatusConfirm, updateStatusPenerbitanLegalitas};
export default legalitasLahanServices;
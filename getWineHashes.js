const QRCode = require('qrcode');
const { ethers } = require('ethers');
const { InfuraProvider } = require('@ethersproject/providers');
require('dotenv').config();

// Contract ABI (Application Binary Interface)
const abi = [
    {
        "inputs": [],
        "name": "getAllWineHashes",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_wineHash",
                "type": "bytes32"
            }
        ],
        "name": "getWine",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = '0xD039115CD115A53C1481Da1800f94cf89612CCF6';

// Provider (using a public Ethereum RPC endpoint, e.g., Infura)
const provider = new InfuraProvider('sepolia', '0b2745c0581a43aba9a132e2975cd118');

// Generate QR Code and save as an image
function generateQR(data, filename) {
    return QRCode.toFile(filename, data, {
        color: {
            dark: '#000',  // Black dots
            light: '#FFF' // White background
        }
    }).then(() => {
        console.log(`QR Code generated and saved as ${filename}`);
    }).catch(err => {
        console.error(`Error generating QR Code for ${data}:`, err);
    });
}

async function getWineHashes() {
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
        const wineHashes = await contract.getAllWineHashes();
        console.log('Wine Hashes:');
        wineHashes.forEach((hash, index) => {
            console.log(`Hash ${index + 1}: ${hash}`);
            generateQR(hash, `wine_hash_${index + 1}.png`);
        });
    } catch (error) {
        console.error('Error fetching wine hashes:', error);
    }
}

getWineHashes();
const { ethers } = require('ethers');
const { InfuraProvider } = require('@ethersproject/providers');

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

// Contract address
const contractAddress = '0xD039115CD115A53C1481Da1800f94cf89612CCF6';

// Provider (using a public Ethereum RPC endpoint, e.g., Infura)
const provider = new InfuraProvider('sepolia', '0b2745c0581a43aba9a132e2975cd118');

async function getWineHashes() {
    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
        // Call the getAllWineHashes function
        const wineHashes = await contract.getAllWineHashes();
        console.log('Wine Hashes:');
        wineHashes.forEach((hash, index) => {
            console.log(`Hash ${index + 1}: ${hash}`);
        });
    } catch (error) {
        console.error('Error fetching wine hashes:', error);
    }
}

getWineHashes();
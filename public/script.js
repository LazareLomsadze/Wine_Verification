document.getElementById('fetch-hashes').addEventListener('click', async () => {
    try {
        // Fetch wine hashes from the backend
        const response = await fetch('/api/getWineHashes');
        const wineHashes = await response.json();

        const qrCodesContainer = document.getElementById('qr-codes');
        qrCodesContainer.innerHTML = '';

        // Generate and display QR codes with wine details
        for (let index = 0; index < wineHashes.length; index++) {
            const hash = wineHashes[index];
            const wineResponse = await fetch(`/api/getWineDetails?hash=${hash}`);
            const [name, date, manufacturer, wineType] = await wineResponse.json();

            const wineInfo = `
                <p>Name: ${name}</p>
                <p>Date: ${date}</p>
                <p>Manufacturer: ${manufacturer}</p>
                <p>Type: ${wineType}</p>
            `;

            const qrImageSrc = `/api/generateQR?data=${encodeURIComponent(hash)}&filename=wine_hash_${index + 1}`;
            const qrCodeDiv = document.createElement('div');
            qrCodeDiv.className = 'wine-info';
            qrCodeDiv.innerHTML = `
                <img class="qr-code" src="${qrImageSrc}" alt="QR code for ${name}">
                ${wineInfo}
            `;
            qrCodesContainer.appendChild(qrCodeDiv);
        }
    } catch (error) {
        console.error('Error fetching wine hashes:', error);
    }
});
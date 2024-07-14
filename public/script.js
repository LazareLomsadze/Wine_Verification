document.getElementById('fetch-hashes').addEventListener('click', async () => {
    try {
        // Fetch wine hashes from the backend
        const response = await fetch('/api/getWineHashes');
        const wineHashes = await response.json();

        const qrCodesContainer = document.getElementById('qr-codes');
        qrCodesContainer.innerHTML = '';

        // Generate and display QR codes
        wineHashes.forEach((hash, index) => {
            const img = document.createElement('img');
            img.className = 'qr-code';
            img.src = `/api/generateQR?data=${encodeURIComponent(hash)}&filename=wine_hash_${index + 1}`;
            qrCodesContainer.appendChild(img);
        });
    } catch (error) {
        console.error('Error fetching wine hashes:', error);
    }
});
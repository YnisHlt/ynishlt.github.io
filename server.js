const http = require('http');
const fs = require('fs');
const path = require('path');

// Dossier où se trouvent les fichiers
const publicDirectory = __dirname;

const server = http.createServer((req, res) => {
    let filePath = path.join(publicDirectory, req.url === '/' ? 'index.html' : req.url);

    // Détection du type MIME en fonction de l'extension
    const ext = path.extname(filePath);
    let contentType = 'text/html'; // Type par défaut

    switch (ext) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.pdf':
            contentType = 'application/pdf';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
        default:
            contentType = 'application/octet-stream'; // Type par défaut pour les fichiers inconnus
    }

    // Lecture et renvoi du fichier
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Fichier non trouvé
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Page non trouvée');
            } else {
                // Autre erreur
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erreur interne du serveur');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

// Démarrer le serveur sur le port 80
server.listen(80, () => {
    console.log('Serveur démarré sur le port 80');
});
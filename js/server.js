import { readFile } from 'fs';
import { createServer } from 'http';

// create server
const httpServer = createServer(async (req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(_extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css'
    }[extname] || 'application/octet-stream';

    if (extname === '.html' || extname === '.js' || extname === '.css') {
        try {
            const data = await readFile(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(contentType, 'utf-8');
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    };
});

const PORT = process.env.PORT || 3000;
Server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
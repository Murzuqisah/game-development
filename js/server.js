import { createServer } from 'http';

// create server
const httpServer = createServer(async (req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }
});
// Use the promises API for file system operations
import { readFile } from 'fs/promises';
import { createServer } from 'http';
import { extname } from 'path';

// Create the server
const httpServer = createServer(async (req, res) => {
  // Build the file path based on the request URL
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // Get the file extension (e.g. '.html', '.js', '.css')
  const ext = String(extname(filePath)).toLowerCase();
  
  // Determine the content type based on the file extension
  const contentType = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css'
  }[ext] || 'application/octet-stream';

  try {
    // Read the requested file asynchronously
    const data = await readFile(filePath);
    // Send the HTTP response with the proper Content-Type
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data, 'utf-8');
  } catch (err) {
    // If there's an error (like file not found), send a 404 error
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Listen on the specified PORT or default to 3000
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

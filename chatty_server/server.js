// server.js

const express = require('express');
const ws = require('ws');
const SocketServer = ws.Server;
const uuidv4 = require('uuid/v4');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.



wss.on('connection', (ws) => {
  console.log('Client connected, now have', wss.clients.size);

  const countUpdate = {type: 'countUpdate', number: wss.clients.size};
  const countUpdateString = JSON.stringify(countUpdate);
    wss.clients.forEach((client) => {
      if (client.readyState == ws.OPEN) {
        client.send(countUpdateString);
      }
    });

  ws.on('message', (msg) => {
    let msgObject = JSON.parse(msg);
    msgObject.id = uuidv4();
    msgObject.type = "incomingMessage"

    let msgString = JSON.stringify(msgObject)
    wss.clients.forEach((client) => {
      if (client.readyState == ws.OPEN) {
        client.send(msgString);
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close',function () { 
    console.log('Client disconnected');
});
});
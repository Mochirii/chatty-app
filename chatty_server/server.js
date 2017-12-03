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



// function broadcastClientsCount() {
//   const clientsCountMessage = {
//     count: wss.clients.size
//   }
//   wss.broadcast(JSON.stringify(clientsCountMessage));
// }

wss.on('connection', (ws) => {
  console.log('Client connected');

  function broadcastAll(message) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
  // broadcastClientCount();


  ws.on('message', (msg) => {
    let valueObject = JSON.parse(msg);
    let valueString;
    valueObject.id = uuidv4();
    valueObject.type = "incomingMessage"
   
    //Then sends the result of the switch back to App.js
    valueString = JSON.stringify(valueObject)
    wss.clients.forEach((client) => {
      if (client.readyState == ws.OPEN) {
        client.send(valueString);
      }
    });
  });

  //   console.log('received msg from client:', msg)

  //   wss.clients.forEach(function each(client) {
  //     if (client !== ws && client.readyState === ws.OPEN) {
  //       client.send(data);
  //     }
  //   });
  // });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
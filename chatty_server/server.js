const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('uuid/v4');

//Set the port to 3001
const PORT = 3001;

//Create express server
const server = express()
  //Make the server serve static assects (html, JS, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

  //Set up a CB that will run when a client connects to the server
  //When a client connects they are assigned a socket, represented by the ws parameter in the cb
wss.on('connection', (ws) => {
  ws.id = uuid();
  //on new connection send out # of users
  wss.broadcast( {type: 'usercount', id: uuid(), userCount: wss.clients.size} );
  ws.send(JSON.stringify({type: 'userid', userId: ws.id}));
  console.log('Client connected');

  ws.on('message', (message) => {
    let msg = JSON.parse(message);
    msg.id = uuid();
    msg.userId = ws.id;
    if (msg.type === 'postMessage') {
      msg.type = 'incomingMessage';
    } else if (msg.type === 'postNotification') {
      msg.type = 'incomingNotification';
    } else {
      msg.type = incomingNotification
      msg.text = 'Unknown event type! WTF WTF WTF!!!!'
    }
    wss.broadcast(msg);
  });

  //Set up a cb for when client closes the socket. Usually closing the borwser.
  ws.on('close', () => {
    //on disconnect send out updated # of users
    wss.broadcast( {type: 'usercount', id: uuid(), userCount: wss.clients.size} );
    console.log('Client disconnected');
  });
});

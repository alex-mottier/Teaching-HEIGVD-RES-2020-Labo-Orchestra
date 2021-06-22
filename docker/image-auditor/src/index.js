/**
 * Authors : Jérémie Melly & Alexandre Mottier
 * Date : 22.06.2021
 * File : index.js
 * Brief : Building
 */
const net = require('net');
const moment = require('moment');
const dgram = require('dgram');

const soundMap = {
  'ti-ta-ti': 'piano',
  'pouet': 'trumpet',
  'trulu': 'flute',
  'gzi-gzi': 'violin',
  'boum-boum': 'drum',
};

let musicians = [];

// Spot inactive musicians
function spotInactives() {
  musicians = musicians.filter((musician) => {
    let duration = moment.duration(
      moment(Date.now()).diff(moment(musician.lastActive))
    );
    let seconds = duration.asSeconds();
    if (seconds <= 5) {
      return musician;
    }
  });
}

setInterval(spotInactives, 1000);

// UDP Listening Server

const port = 2205;

socket = dgram.createSocket('udp4');

socket.on('message', function (msg, info) {
  msg_parsed = msg.toString().split(' ');
  if (msg_parsed.length === 2) {
    let found = false;
    musicians.forEach((musician) => {
      if (musician.uuid === msg_parsed[1]) {
        musician.lastActive = Date.now();
        found = true;
        return;
      }
    });
    if (!found) {
      const new_musician = {
        uuid: msg_parsed[1],
        instrument: soundMap[msg_parsed[0]],
        activeSince: Date.now(),
        lastActive: Date.now(),
      };
      musicians.push(new_musician);
    }
  }
});

socket.on('listening', function () {
  socket.addMembership('239.255.22.5');
  var address = socket.address();
});

socket.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

socket.bind(port);

// TCP Listening Server
var server = net.createServer(function (socket) {
  socket.write(
    JSON.stringify(
      musicians.map((musician) => {
        return {
          uuid: musician.uuid,
          instrument: musician.instrument,
          activeSince: moment(musician.activeSince),
        };
      })
    )
  );
  socket.pipe(socket);
  socket.destroy();
});

server.listen(port, '0.0.0.0');

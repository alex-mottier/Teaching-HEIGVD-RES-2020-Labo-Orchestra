const net = require('net')
const moment = require('moment')
const async = require('async')
const { v4: uuidv4 } = require('uuid');
const dgram = require('dgram')

const soundMap = {
    "ti-ta-ti": "piano",
    "pouet": "trumpet",
    "trulu": "flute",
    "gzi-gzi": "violin",
    "boum-boum": "drum"
}

let musicians = []

// Async thread to spot inactive musicians
function spotInactives() {
  musicians = musicians.filter((musician) => {
    let duration = moment.duration(
      moment(Date.now()).diff(moment(musician.lastActive))
    );
    let seconds = duration.asSeconds();
    if (seconds > 5) {
      console.log('Removed ' + JSON.stringify(musician));
    }else{
      return musician
    }
  })

  setTimeout(spotInactives, 700);
};


async.parallel([spotInactives],
  (err) => {
    if (err) console.error(err.message);
  }
);

// UDP Listening Server

const port = 2205

socket = dgram.createSocket('udp4');

socket.on('message', function (msg, info){
    console.log(msg.toString());
    msg_parsed = msg.split(' ')
    if(msg_parsed.length != 2){
      console.log("Received wrong DG : " + msg)
    }else{
      let found = false
      for (const musician in musicians) {
        if(musician.uuid == msg_parsed[1]){
          musician.activeSince = Date.now()
          found = true
          break
        }
      }
      if(!found){
        const new_musician = {
          uuid: msg_parsed[1],
          instrument: soundMap[msg_parsed[0]],
          activeSince: Date.now(),
          lastActive: Date.now(),
        }
        musicians.push(new_musician)
        console.log(
          'Added : ' + JSON.stringify(new_musician)
        );
      }
    }
 });

socket.on('listening', function(){
    var address = socket.address();
    console.log("listening on :" + address.address + ":" + address.port);
});

socket.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

socket.bind(port);

// TCP Listening Server
var server = net.createServer(function (socket) {
  socket.write(JSON.stringify(musicians.map((musician) => {
    return {
      uuid: musician.uuid,
      instrument: musician.instrument,
      activeSince: moment(musician.activeSince)
    }
  })));
  socket.pipe(socket);
});

server.listen(port, '127.0.0.1');
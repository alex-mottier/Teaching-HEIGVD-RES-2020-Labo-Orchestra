/**
 * Authors : Jérémie Melly & Alexandre Mottier
 * Date : 22.06.2021
 * File : index.js
 * Brief : Building
 */
const dgram = require('dgram');
const { v4: uuidv4 } = require('uuid');

let argv = process.argv;
if (argv.length != 3) {
  console.log('Need one and only one parameter !');
  return;
}

const port = 2205

const instrumentMap = {
  "piano" : "ti-ta-ti",
  "trumpet" : "pouet",
  "flute" : "trulu",
  "violin" : "gzi-gzi",
  "drum" : "boum-boum"
}

const uuid = uuidv4();

let client = dgram.createSocket('udp4');
let instrument = argv[2];
let datagram = instrumentMap[instrument] + ' ' + uuid;

client.bind(function () {
  client.setBroadcast(true);
  setInterval(sendDatagram, 1000);
});

function sendDatagram(){
  message = new Buffer(datagram);
  client.send(
    message,
    0,
    message.length,
    port,
    '239.255.22.5',
    function (err, bytes) {
      console.log(
        'Sending payload: ' + datagram + ' via port ' + client.address().port
      );
    }
  );
}




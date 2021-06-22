/**
 * Authors : Jérémie Melly & Alexandre Mottier
 * Date : 22.06.2021
 * File : index.js
 * Brief : Building
 */
const dgram = require('dgram');
const { v4: uuidv4 } = require('uuid');

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
let argv = process.argv;
let instrument = argv[2];

function sendDatagram(){
  let datagram = instrumentMap[instrument] + " " + uuid;
  console.log("sending packet : " + datagram);
  client.send(datagram,0, datagram.length, port, '127.0.0.1');
}



if(argv.length != 3){
  console.log("Need one and only one parameter !");
  return;
}

setInterval(sendDatagram, 1000);





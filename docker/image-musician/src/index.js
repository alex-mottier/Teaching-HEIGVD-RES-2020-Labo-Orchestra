const net = require('net')
const moment = require('moment')
const async = require('async')
const uuid = require('uuid')
const udp_packet = require('udp-packet')

const port = 2205

const instrumentMap = {
  "piano" : "ti-ta-ti",
  "trumpet" : "pouet",
  "flute" : "trulu",
  "violin" : "gzi-gzi",
  "drum" : "boum-boum"
}


// Async thread to spot inactive musicians
function spotInactives(musician) {
//   if(musician.lastActive + Date.secon)
    console.log(moment())
    setTimeout(spotInactives, 700);
};


async.forEachOf(
  musicians,
  spotInactives,
  (err) => {
    if (err) console.error(err.message);
    // configs is now a map of JSON data
    // doSomethingWith(configs);
  }
);
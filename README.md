# Teaching-HEIGVD-RES-2020-Labo-Orchestra


## Task 1: design the application architecture and protocols

| #  | Topic |
| --- | --- |
|Question | How can we represent the system in an **architecture diagram**, which gives information both about the Docker containers, the communication protocols and the commands? |
| | ![](images\architecture_diagram.png) |
|Question | Who is going to **send UDP datagrams** and **when**? |
| | *The Musician Docker container, every seconds.* |
|Question | Who is going to **listen for UDP datagrams** and what should happen when a datagram is received? |
| | *The Auditor Docker container, it create or refresh the structure representing the Musician.* |
|Question | What **payload** should we put in the UDP datagrams? |
| | *PLAY \<UUID\> \<Instrument\>* |
|Question | What **data structures** do we need in the UDP sender and receiver? When will we update these data structures? When will we query these data structures? |
| | **Reciever**<br/><br/>musicians:<br/>[<br/>  {<br/>   "uuid" : <UUID>,<br/>   "instrument" : <INSTRUMENT>,<br/>   "activeSince" : <DATETIME>,<br/>   "lastActive" : <DATETIME><br/>  },<br/>  ...<br/>]<br/><br/>soundMap:<br/>{<br/> "ti-ta-ti" : "piano",<br/> "pouet" : "trumpet",<br/> "trulu" : "flute",<br/> "gzi-gzi" : "violin",<br/> "boum-boum" : "drum"<br/>}<br/><br/>---------------------------<br/><br/>**Sender**<br/><br/>instrumentMap: <br/>{<br/>  "piano"," : "ti-ta-ti",<br/> "trumpet" : "pouet",<br/> "flute" : "trulu",<br/> "violin" : "gzi-gzi",<br/> "drum" : "boum-boum"<br/>} |


## Task 2: implement a "musician" Node.js application

| #  | Topic |
| ---  | --- |
|Question | In a JavaScript program, if we have an object, how can we **serialize it in JSON**? |
| | By using the the function : ` JSON.stringify(Object) ` |
|Question | What is **npm**?  |
| | It's a package manager, taking care of the dependencies and install them in the ` node_modules` directory. To configure it, edit the ` package.json` file. |
|Question | What is the `npm install` command and what is the purpose of the `--save` flag?  |
| | It will fetch all the dependencies in the ` package.json`, and install them. The --save flag is not used anymore, since the version 5. At the times, it was used to edit the ` package.json` file to automatically add the dependency name you are installing under the dependencies section. |
|Question | How can we use the `https://www.npmjs.com/` web site?  |
| | We can use it to find a package. |
|Question | In JavaScript, how can we **generate a UUID** compliant with RFC4122? |
| | By using the ` uuid` package                                 |
|Question | In Node.js, how can we execute a function on a **periodic** basis? |
| | By using the ` async` package |
|Question | In Node.js, how can we **emit UDP datagrams**? |
| | By using the ` net` package to use net.Socket() to send UDP datagram and the ` udp-packet` to encode them. |
|Question | In Node.js, how can we **access the command line arguments**? |
| | By using the global variable` process.argv`.                 |


## Task 3: package the "musician" app in a Docker image

| #  | Topic |
| ---  | --- |
|Question | How do we **define and build our own Docker image**?|
| | By using this command : `docker build -t "res/musician" .` .    |
|Question | How can we use the `ENTRYPOINT` statement in our Dockerfile?  |
|  | To pass the CLI parameters to our node application. |
|Question | After building our Docker image, how do we use it to **run containers**?  |
| | By using the command : `docker run --name res_musician res/musician`. |
|Question | How do we get the list of all **running containers**?  |
|  | By using the command : `docker ps`.                          |
|Question | How do we **stop/kill** one running container?  |
| | By using the command : ` docker kill res_musician`. |
|Question | How can we check that our running containers are effectively sending UDP datagrams?  |
| | By using a tool like Wireshark to monitor the traffic |


## Task 4: implement an "auditor" Node.js application

| #  | Topic |
| ---  | ---  |
|Question | With Node.js, how can we listen for UDP datagrams in a multicast group? |
| | We used the dgram node package to listen for the UDP traffic on the port 2205, we registered the kernel to the multicast group (with the address 239.255.22.5 ) before starting to listen. |
|Question | How can we use the `Map` built-in object introduced in ECMAScript 6 to implement a **dictionary**?  |
|  | It would have simplify the implementation of the search of an unique UUID in the musicians structure from the auditor. |
|Question | How can we use the `Moment.js` npm module to help us with **date manipulations** and formatting?  |
| | To standardize the different Date Time format (unix timestamp, UTC, ...) and compare them easily, no matter the timezone. |
|Question | When and how do we **get rid of inactive players**?  |
| | When the attribute lastActive of a musician is older than 5 seconds. By removing it from the musicians structure of the Auditor. |
|Question | How do I implement a **simple TCP server** in Node.js?  |
|  | Using the net package                                        |


## Task 5: package the "auditor" app in a Docker image

| #  | Topic |
| ---  | --- |
|Question | How do we validate that the whole system works, once we have built our Docker image? |
|  | By using the script `validate.sh`.                           |


## Result of validate.sh

![](images\result.jpeg)

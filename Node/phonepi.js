const ip = require("ip");
const ws = require("ws");
const WebSocket = require("ws");
const http = require("http");
const fs = require("fs");
const url = require("url");

console.dir(`Please enter ${ip.address()}:5000 in the app [PhonePi] or just ${ip.address()} [PhonePi+]`);

var httpServer = http.createServer();

const accelerometerWSS = new WebSocket.Server({
  noServer: true
});

const gyroscopeWSS = new WebSocket.Server({
  noServer: true
});

const magnetometerWSS = new WebSocket.Server({
  noServer: true
});

const orientationWSS = new WebSocket.Server({
  noServer: true
});

const stepCounterWSS = new WebSocket.Server({
  noServer: true
});

const thermometerWSS = new WebSocket.Server({
  noServer: true
});

const lightSensorWSS = new WebSocket.Server({
  noServer: true
});

const proximityWSS = new WebSocket.Server({
  noServer: true
});

const geolocationWSS = new WebSocket.Server({
  noServer: true
});

accelerometerWSS.on("connection", ws => {
  const writeStream = fs.createWriteStream("accelerometer.txt", { flags: "a" });
  ws.on("message", message => {
    console.log(`Received message => ${message}`);
    writeStream.write(message + "\n");
  });
});

gyroscopeWSS.on("connection", ws => {
  const writeStream = fs.createWriteStream("gyroscope.txt", { flags: "a" });
  ws.on("message", message => {
    console.log(`Received message => ${message}`);
    writeStream.write(message + "\n");
  });
});

magnetometerWSS.on("connection", ws => {
  const writeStream = fs.createWriteStream("magnetometer.txt", { flags: "a" });
  ws.on("message", message => {
    console.log(`Received message => ${message}`);
    writeStream.write(message + "\n");
  });
});

orientationWSS.on("connection", ws => {
  const writeStream = fs.createWriteStream("orientation.txt", { flags: "a" });
  ws.on("message", message => {
    console.log(`Received message => ${message}`);
    writeStream.write(message + "\n");
  });
});

stepCounterWSS.on("connection", ws => {
  const writeStream = fs.createWriteStream("stepcounter.txt", { flags: "a" });
  ws.on("message", message => {
    console.log(`Received message => ${message}`);
    writeStream.write(message + "\n");
  });
});

thermometerWSS.on("connection", ws => {
  const writeStream = fs.createWriteStream("thermometer.txt", { flags: "a" });
  ws.on("message", message => {
    console.log(`Received message => ${message}`);
    writeStream.write(message + "\n");
  });
});

lightSensorWSS.on("connection", ws => {
  const writeStream = fs.createWriteStream("lightsensor.txt", { flags: "a" });
  ws.on("message", message => {
    console.log(`Received message => ${message}`);
    writeStream.write(message + "\n");
  });
});

proximityWSS.on("connection", ws => {
  const writeStream = fs.createWriteStream("proximity.txt", { flags: "a" });
  ws.on("message", message => {
    console.log(`Received message => ${message}`);
    writeStream.write(message + "\n");
  });
});

geolocationWSS.on("connection", ws => {
  const writeStream = fs.createWriteStream("geolocation.txt", { flags: "a" });
  ws.on("message", message => {
    console.log(`Received message => ${message}`);
    writeStream.write(message + "\n");
  });
});

httpServer.on("upgrade", function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;

  if (pathname === "//accelerometer") {
    accelerometerWSS.handleUpgrade(request, socket, head, function done(ws) {
      accelerometerWSS.emit("connection", ws, request);
    });
  } else if (pathname === "//gyroscope") {
    gyroscopeWSS.handleUpgrade(request, socket, head, function done(ws) {
      gyroscopeWSS.emit("connection", ws, request);
    });
  } else if (pathname === "//magnetometer") {
    magnetometerWSS.handleUpgrade(request, socket, head, function done(ws) {
      magnetometerWSS.emit("connection", ws, request);
    });
  } else if (pathname === "//orientation") {
    orientationWSS.handleUpgrade(request, socket, head, function done(ws) {
      orientationWSS.emit("connection", ws, request);
    });
  } else if (pathname === "//stepcounter") {
    stepCounterWSS.handleUpgrade(request, socket, head, function done(ws) {
      stepCounterWSS.emit("connection", ws, request);
    });
  } else if (pathname === "//thermometer") {
    thermometerWSS.handleUpgrade(request, socket, head, function done(ws) {
      thermometerWSS.emit("connection", ws, request);
    });
  } else if (pathname === "//lightsensor") {
    lightSensorWSS.handleUpgrade(request, socket, head, function done(ws) {
      lightSensorWSS.emit("connection", ws, request);
    });
  } else if (pathname === "//proximity") {
    proximityWSS.handleUpgrade(request, socket, head, function done(ws) {
      proximityWSS.emit("connection", ws, request);
    });
  } else if (pathname === "//geolocation") {
    geolocationWSS.handleUpgrade(request, socket, head, function done(ws) {
      geolocationWSS.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

httpServer.listen(5000, "0.0.0.0");

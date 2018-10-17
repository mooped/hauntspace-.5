// Hauntspace 2.5
// Dummy server component
//
// Fake lighting server to test "Fast approximate JSON parser" (TM)
//
// Created Oct 17th
// by Steve Barnett
//
// https://github.com/mooped/hauntspace-2.5
//

var WebSocket = require("ws")

var wss = new WebSocket.Server({ port : 8181 });

function getRandomInt(max)
{
  return Math.floor(Math.random() * Math.floor(max));
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // Log any received messages
    console.log('received: %s', message);

    // Send back any LightRequests as LightState reports
    var data = JSON.parse(message);
    if (message.eventType == "LightRequest")
    {
      message.eventType = "LightState";
      ws.send(JSON.stringify(message));
    }
  });

  // Send some fake lighting events every 10 seconds
  setInterval(function () {
    // Pick 4 lights
    var light1 = getRandomInt(9);
    var light2 = getRandomInt(9);
    var light3 = getRandomInt(9);
    var light4 = getRandomInt(9);

    // Turn them on
    setTimeout(function () {
      console.log(light1 + ", " + light2 + ", " + light3 + ", " + light4 + " on");
      ws.send('{ "eventType" : "LightState", "room" : "Blue room", "light" : ' + light1 + ', "state" : "ON" }');
      ws.send('{ "eventType" : "LightState", "room" : "Blue room", "light" : ' + light2 + ', "state" : "ON" }');
      ws.send('{ "eventType" : "LightState", "room" : "Blue room", "light" : ' + light3 + ', "state" : "ON" }');
      ws.send('{ "eventType" : "LightState", "room" : "Blue room", "light" : ' + light4 + ', "state" : "ON" }');
    }, 500);
  
    // Turn them off
    setTimeout(function () {
      console.log(light1 + ", " + light2 + ", " + light3 + ", " + light4 + " off");
      ws.send('{ "eventType" : "LightState", "room" : "Blue room", "light" : ' + light1 + ', "state" : "OFF" }');
      ws.send('{ "eventType" : "LightState", "room" : "Blue room", "light" : ' + light2 + ', "state" : "OFF" }');
      ws.send('{ "eventType" : "LightState", "room" : "Blue room", "light" : ' + light3 + ', "state" : "OFF" }');
      ws.send('{ "eventType" : "LightState", "room" : "Blue room", "light" : ' + light4 + ', "state" : "OFF" }');
    }, 2000);
  }, 5000);
});


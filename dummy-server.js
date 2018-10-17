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

  // Send some fake lighting events
  setInterval(function () {
    // Pick 4 lights to switch
    var light1 = getRandomInt(10);
    var light2 = getRandomInt(10);
    var light3 = getRandomInt(10);
    var light4 = getRandomInt(10);

    // Turn 1 on
    console.log(light1 + " on");
    ws.send('{ "eventType" : "LightState", "room" : "Blue room", "light" : ' + light1 + ', "state" : "ON" }');
  
    // Turn 3 off
    console.log(light2 + ", " + light3 + ", " + light4 + " off");
    ws.send('{ "eventType" : "LightState", "room" : "Blue room", "light" : ' + light2 + ', "state" : "OFF" }');
    ws.send('{ "eventType" : "LightState", "room" : "Blue room", "light" : ' + light3 + ', "state" : "OFF" }');
    ws.send('{ "eventType" : "LightState", "room" : "Blue room", "light" : ' + light4 + ', "state" : "OFF" }');
  }, 500);

  // Every 10 seconds turn everything on
  setInterval(function () {
    console.log("All on");
    for (var i = 1; i < 10; ++i)
    {
      ws.send('{ "eventType" : "LightState", "room" : "Blue room", "light" : ' + i + ', "state" : "ON" }');
    }
  }, 10000);
});


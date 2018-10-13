var WebSocket = require("ws")
var SerialPort = require("serialport")

var port = new SerialPort("/dev/ttyACM0", { baudRate : 9600 });

ws = new WebSocket("ws://queen:8181/lighting", "lighting")

ws.on('open', function open() {
})

var is_running = false;

ws.on('message', function incoming(data) {
  if (is_running == true) { return; }
  console.log(data);
  jd = JSON.parse(data);
  console.log(jd);
  if (jd.state == "OFF")
  {
    console.log("Haunting time!");

    is_running = true;

    /*
    var sequence = [
      { func: function p1() { console.log("1"); }, time: 500 },
      { func: function p1() { console.log("2"); }, time: 500 },
      { func: function p1() { console.log("3"); }, time: 500 },
      { func: function p1() { console.log("4"); }, time: 500 },
      { func: function p1() { console.log("5"); }, time: 500 },
      { func: function flash7_on() { ws.send('{"light": 7, "eventType": "LightRequest", "state": "ON", "room": "Blue room" }'); }, time: 500 },
      { func: function flash7_off() { ws.send('{"light": 7, "eventType": "LightRequest", "state": "OFF", "room": "Blue room" }'); }, time: 500 },
      { func: function flash2_on() { ws.send('{"light": 2, "eventType": "LightRequest", "state": "ON", "room": "Blue room" }'); }, time: 500 },
      { func: function flash2_off() { ws.send('{"light": 2, "eventType": "LightRequest", "state": "OFF", "room": "Blue room" }'); }, time: 500 },
      { func: function flash9_on() { ws.send('{"light": 9, "eventType": "LightRequest", "state": "ON", "room": "Blue room" }'); }, time: 500 },
      { func: function flash9_off() { ws.send('{"light": 9, "eventType": "LightRequest", "state": "OFF", "room": "Blue room" }'); }, time: 500 },
      { func: function scream() { port.write("!"); console.log("Response: ", port.read()); }, time: 500 },
      { func: function { is_running = false; }, time: 500 },
    ];
    */

    // 7
    // 2
    // 9

    setTimeout(function flash1_on() {
      console.log("F1", is_running);
      ws.send('{"light": 7, "eventType": "LightRequest", "state": "ON", "room": "Blue room" }');

      port.write("!");
      console.log("Response: ", port.read());

      setTimeout(function flash1_off() {
        console.log("F2", is_running);
        ws.send('{"light": 7, "eventType": "LightRequest", "state": "OFF", "room": "Blue room" }');

        setTimeout(function flash2_on() {
          console.log("F3", is_running);
          ws.send('{"light": 2, "eventType": "LightRequest", "state": "ON", "room": "Blue room" }');

          port.write("!");
          console.log("Response: ", port.read());

          setTimeout(function flash2_off() {
          console.log("F4", is_running);
          ws.send('{"light": 2, "eventType": "LightRequest", "state": "OFF", "room": "Blue room" }');

            setTimeout(function flash3_off() {
              console.log("F5", is_running);
              ws.send('{"light": 9, "eventType": "LightRequest", "state": "ON", "room": "Blue room" }');

              setTimeout(function flash3_on() {
                console.log("F5", is_running);
                ws.send('{"light": 9, "eventType": "LightRequest", "state": "OFF", "room": "Blue room" }');

                port.write("!");
                console.log("Response: ", port.read());

                setTimeout(function done() {
                  is_running = false;
                }, 1000);
              }, 500);
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  }
});


// Hauntspace 2.5
// Node JS component
//
// Talk to the lighting server to receive messages when the lights change.
// When the lights are out trigger the Arduino component to make a spooky sound.
// Then flash some of the lights back on in sequence.
// For best results hang spooky things under the appropriate lights
//
// Created Oct 13th
// by Steve Barnett
//
// https://github.com/mooped/hauntspace-2.5
//
// This is a complete cludge - I ran out of time to tidy it up!
// I will likely reimplement a more permenant version on an ESP32...
//

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


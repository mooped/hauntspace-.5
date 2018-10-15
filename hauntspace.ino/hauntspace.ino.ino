/*
  Hauntspace 2.5
  Arduino component

  Wait for some serial data then actuate a servo.
  The servo presses a button on a soundboard.
  External software sends a trigger when the lights are turned off.

  Created 13 Oct 2012
  by Steve Barnett

  https://github.com/mooped/hauntspace-2.5
*/

#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9);
  Serial.begin(9600);
}

void loop() {
  myServo.write(127);

  if (Serial.available() > 0)
  {
    Serial.write("Let's GO!");
    while (Serial.available() > 0)
    {
      Serial.write(Serial.read());
    }
    
    for (int angle = 0; angle < 127; ++angle)
    {
      myServo.write(angle > 64 ? angle : 64);

      delay(15);
    }
  }
}

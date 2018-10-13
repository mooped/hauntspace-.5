/*
  Arduino Starter Kit example
  Project 5 - Servo Mood Indicator

  This sketch is written to accompany Project 5 in the Arduino Starter Kit

  Parts required:
  - servo motor
  - 10 kilohm potentiometer
  - two 100 uF electrolytic capacitors

  created 13 Sep 2012
  by Scott Fitzgerald

  http://www.arduino.cc/starterKit

  This example code is part of the public domain.
*/

// include the Servo library
#include <Servo.h>

Servo myServo;  // create a servo object

void setup() {
  myServo.attach(9); // attaches the servo on pin 9 to the servo object
  Serial.begin(9600); // open a serial connection to your computer
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
      // set the servo position
      myServo.write(angle > 64 ? angle : 64);

      // wait for the servo to get there
      delay(15);
    }
  }
}

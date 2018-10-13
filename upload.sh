#!/bin/sh

arduino-cli compile -b arduino:avr:uno hauntspace.ino/ && arduino-cli upload -b arduino:avr:uno -p /dev/ttyACM0 hauntspace.ino/

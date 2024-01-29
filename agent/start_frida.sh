#!/bin/bash
adb forward tcp:27042 tcp:27042
adb shell "su -c 'setenforce 0 && /data/local/tmp/frida-server-14.1.2-android-arm64 &'"
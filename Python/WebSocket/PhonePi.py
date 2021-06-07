#!/usr/bin/env python

import asyncio
import websockets
import socket


def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't even have to be reachable
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP


hostname = socket.gethostname()
IPAddr = get_ip()
print("Your Computer Name is: " + hostname)
print("Your Computer IP Address is: " + IPAddr)
print("Enter {0}:5000 in the app [PhonePi] and select the sensors to stream. For PhonePi+ just enter {0}, without the port".format(IPAddr))


async def echo(websocket, path):
    async for message in websocket:
        if path == '//accelerometer':
            data = await websocket.recv()
            print(data)
            f = open("accelerometer.txt", "a")
            f.write(data+"\n")

        if path == '//gyroscope':
            data = await websocket.recv()
            print(data)
            f = open("gyroscope.txt", "a")
            f.write(data+"\n")

        if path == '//magnetometer':
            data = await websocket.recv()
            print(data)
            f = open("magnetometer.txt", "a")
            f.write(data+"\n")

        if path == '//orientation':
            data = await websocket.recv()
            print(data)
            f = open("orientation.txt", "a")
            f.write(data+"\n")

        if path == '//stepcounter':
            data = await websocket.recv()
            print(data)
            f=open("stepcounter.txt", "a")
            f.write(data+"\n")

        if path == '//thermometer':
            data = await websocket.recv()
            print(data)
            f=open("thermometer.txt", "a")
            f.write(data+"\n")
            
        if path == '//lightsensor':
            data = await websocket.recv()
            print(data)
            f=open("lightsensor.txt", "a")
            f.write(data+"\n")
        
        if path == '//proximity':
            data = await websocket.recv()
            print(data)
            f=open("proximity.txt", "a")
            f.write(data+"\n")

        if path == '//geolocation':
            data = await websocket.recv()
            print(data)
            f=open("geolocation.txt", "a")
            f.write(data+"\n")

asyncio.get_event_loop().run_until_complete(
    websockets.serve(echo, '0.0.0.0', 5000))
asyncio.get_event_loop().run_forever()

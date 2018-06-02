# PhonePi_SampleServer
This is a simple Flask based server with WebSocket support that accepts the sensor data and writes it to a text file. This is a companion sample server fo the PhonePi Sensor Streamer app.

# Steps:
* Clone the repository or download the zip file and unzip it to a directory of your choice.
* Make sure you have python 2.7 installed and you can access both pip and python from the command line/ terminal
* To check the same open command line/terminal and type `python --version` and `pip --version`
* cd to the directory where the folder was extracted in the command line

## To Run the Server (Python 2.7)
 ```
 cd PhonePi_SampleServer-master
 pip2 install -r requirements.txt
 python2 PhonePi.py
 ```
## To Run the Server (Python 3.0)
 ```
 cd PhonePi_SampleServer-master
 pip3 install -r requirements.txt
 python3 PhonePiPython3.py
 ```

## To use the app
* Make sure both your phone and the laptop/raspi are on same network.
* Find the internal ip address of the raspi/laptop 
* If you are using Phone Pi and not Phone Pi+, simply type the ip address:5000.Example: 192.168.1.24:5000 in the app's input bar. 
* You don't need the port number if you are using Phone Pi+. Just input the ip address. Example: 192.168.1.24
* Switch on whatever sensor's data you want to stream.

You can make any changes you want to to PhonePi.py

## Data Format Cheat sheet:
* Accelerometer: x,y,z
* Gyroscope: x,y,z
* Magnetometer: x,y,z
* Orientation: azimuth,pitch,roll
* Step Counter: steps
* Thermometer: temperature
* Light Sensor: light
* Proximity: isNear, value, maxRange
* Link: https://github.com/kprimice/react-native-sensor-manager

# Server details
This makes use of flask_sockets. Note the use of namespaces which are in accordance with the sensor's name. Sample code:

```python
@sockets.route('/accelerometer') 
def echo_socket(ws):
	 f=open("accelerometer.txt","a")
	 while True:
		message = ws.receive()
		print(message) 
        	ws.send(message)
		print>>f,message
	 f.close()
```
The app would then establish a connection to ws://url//accelerometer
where url is what the user enters (ip address:port) 



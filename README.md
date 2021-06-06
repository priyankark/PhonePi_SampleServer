# PhonePi_SampleServer
These are simple servers with WebSocket support that accept the sensor data and write it to a text file. These are companion sample servers for the PhonePi Sensor Streamer app.

# Steps:
* Clone the repository or download the zip file and unzip it to a directory of your choice.

## To Run the Python Server (version >= Python 3.0)

* Make sure you have python (version >=3) installed and you can access both pip and python from the command line/ terminal
* To check the same open command line/terminal and type `python --version` and `pip --version`
* cd to the directory where the folder was extracted in the command line
* Optional Step: It's highly recommended, you create a virtual env before installing dependencies. Activate the virtual environment and proceed. OS specific steps are available in the docs [https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/]

**Brief Summary of steps to follow to create virtual env [Optional Step]**
```
cd Python
cd Flask or cd WebSocket # Depending upon which server you want to use
py -m venv env # Create virtual env
source env/bin/activate (On Linux or Mac) or .\env\Scripts\activate (On Windows)
```

**Final Installation and run steps**
 ```
 cd PhonePi_SampleServer-master/Python
 cd Flask or cd WebSocket # Depending upon which server you want to use
 pip install -r requirements.txt 
 python3 PhonePi.py
 ```
 ## To run the Node Server (latest version recommended)
 
 ```
 cd Node
 npm install
 npm start
 ```

## To use the app
* Make sure both your phone and the laptop/raspi are on same network.
* Find the internal ip address of the raspi/laptop 
* If you are using Phone Pi and not Phone Pi+, simply type the ip address:5000.Example: 192.168.1.24:5000 in the app's input bar. 
* You don't need the port number if you are using Phone Pi+. Just input the ip address. Example: 192.168.1.24
* Switch on whatever sensor's data you want to stream.

You can make any changes you want to to PhonePi.py or PhonePi.js

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

# Server details (Python)
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

## Contribution guidelines
This repository is open to contributions. 
On the server side, we are looking to support sample servers in more languages and frameworks such as node.js, Go etc.
Please feel free to raise PRs!

### For more support, please e-mail priyankar.kumar98@gmail.com

# Atria-Assignment

A simple web application developed wih [flask-restx](https://github.com/python-restx/flask-restx) framework.

## Prerequisites

* Python 3.*
* MongoDb 3.6
* NodeJS 12.*

## installation

Clone git respository

```
# code block
git clone https://github.com/goutham-022/Atria.git
cd Atria
```

# To set up python backend, follow these steps

To set up python virtual environment.

```
# code block
cd Backend/atria_assignment
python -m virtualenv venv
venv/Scripts/activate
```

To install necessary packages
```
# code block
pip install -r requirements
```
Command to run the application in `5000` port
```
# code block
python atria_assignment.py
```

**Make sure `mongod.exe` is running in background**

Move `sensor` folder under `db` to `C:\Mongodb\bin\dump`(where mongodb is installed), followin command would generate the data

```
# code block
cd C:\Mongodb\bin
mongorestore --db sensor --drop dump/sensor/
```

To set up frontend, follow these steps

```
# code block
cd FrontEnd/atria-webapp
nodemon
```

Go to the url [http://localhost:3000/](http://localhost:3000/)

![Image](https://res.cloudinary.com/djntak6lv/image/upload/v1598674462/index2_xycjfy.png)


Select **From Date** as **01-08-2020**, **To Date** as **15-08-2020** and **Sensor Type** as **Temperature**

![Image](https://res.cloudinary.com/djntak6lv/image/upload/v1598674745/temperature2_tjk2t5.png)


Select **From Date** as **01-08-2020**, **To Date** as **30-08-2020** and **Sensor Type** as **Weather**

![Image](https://res.cloudinary.com/djntak6lv/image/upload/v1598674623/weather2_een04s.png)
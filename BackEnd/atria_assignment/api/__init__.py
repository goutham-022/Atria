from flask_restx import Api
from api.sensor_data.views import api as sensor_data

api = Api()

api.add_namespace(sensor_data, path="/api/v1/sensor")

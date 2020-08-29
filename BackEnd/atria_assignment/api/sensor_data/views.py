from flask_restx import Resource, Namespace, reqparse
from api.sensor_data.controller import SensorData as SensorDataController
import logs

api = Namespace('SensorData', description="Sensor Data API")


@api.route('/set')
class SensorDataSet(Resource):
    @api.doc("set_sensor_data", responses={
        200: 'Success',
        201: 'Created',
        400: 'Missing parameter',
        403: 'Insufficient permissions',
        500: 'Internal Server Error',
    })
    def post(self):
        """

        Store Sensor Data to DataBase

        **POST** method

        Request Schema:

            {
                "reading": 26.0,
                "timestamp": 1511161234,
                "sensorType": "Temperature"
            }

        Response Schema *JSON*:

            {
                "message": "Sensor Data Successfully Saved",
                "response": null,
                "response_code": 200
            }

        """
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('reading', type=float, required=True)
            parser.add_argument('timestamp', type=int, required=True)
            parser.add_argument('sensorType', type=str, required=True)
            args = parser.parse_args()
            reading = args['reading']
            timestamp = args['timestamp']
            sensorType = args['sensorType']
            response = SensorDataController.set_sensor_data(reading=reading, timestamp=timestamp, sensorType=sensorType)
            return response
        except Exception as e:
            logs.logger.error(e)


@api.route('/get')
class SensorDataGet(Resource):
    @api.doc("get_sensor_data", responses={
        200: 'Success',
        201: 'Created',
        400: 'Missing parameter',
        403: 'Insufficient permissions',
        500: 'Internal Server Error',
    })
    def post(self):
        """

        Get Sensor Data from DataBase

        **POST** method

        Request Schema:

        {
            "from_date": "2020-08-01",
            "to_date": "2020-08-3",
            "sensorType": "temperature"
        }

        Response Schema *JSON*:

        {
            "message": "Sensor Data",
            "response": {
                "report": {
                    "reading": [
                        26.0,
                        30.0
                    ],
                    "timestamp": [
                        "01-08-2020",
                        "02-08-2020"
                    ]
                },
                "stats": {
                    "maximum": 30.0,
                    "minimum": 26.0,
                    "average": 28.0
                }
            },
            "status_code": 200
        }

        """
        try:
            parser = reqparse.RequestParser()
            parser.add_argument("from_date", type=str, required=True)
            parser.add_argument("to_date", type=str, required=True)
            parser.add_argument("sensorType", type=str, required=True)
            args = parser.parse_args()
            from_date = args["from_date"]
            to_date = args["to_date"]
            sensorType = args["sensorType"]
            response = SensorDataController.get_sensor_data(from_date=from_date, to_date=to_date, sensorType=sensorType)
            return response
        except Exception as e:
            logs.logger.error(e)


# @api.route('/getall')
# class SensorDataGet(Resource):
#     @api.doc("get_all_sensor_data", responses={
#         200: 'Success',
#         201: 'Created',
#         400: 'Missing parameter',
#         403: 'Insufficient permissions',
#         500: 'Internal Server Error',
#     })
#     def post(self):
#         """
#
#         Get All Sensor Data from DataBase
#
#         **GET** method
#
#         Request Schema:
#
#         Response Schema *JSON*:
#
#         {
#             "message": "Sensor Data",
#             "response": [
#                 {
#                     "reading": 26.0,
#                     "timestamp": "01-12-2017"
#                 },
#                 {
#                     "reading": 30.0,
#                     "timestamp": "02-12-2017"
#                 },
#                 {
#                     "reading": 35.0,
#                     "timestamp": "14-12-2017"
#                 }
#             ],
#             "status_code": 200
#         }
#
#         """
#         try:
#             response = SensorDataController.get_all_sensor_data()
#             return response
#         except Exception as e:
#             logs.logger.error(e)

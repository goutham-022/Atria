from datetime import datetime
from mongoengine import connect, Q
from models.model import Sensor as SensorModel
import logs


def dbcon():
    try:
        db = connect("sensor", host="localhost", port=27017)
        return db
    except Exception as e:
        logs.logger.error(e)


class SensorData(object):
    @staticmethod
    def set_sensor_data(reading, timestamp, sensorType):
        try:
            dbcon()
            timestamp = datetime.fromtimestamp(timestamp)
            SensorModel(
                reading=reading,
                timestamp=timestamp,
                sensorType=sensorType
            ).save()
            return {
                       "message": "Sensor Data Successfully Saved",
                       "response": None,
                       "response_code": 201
                   }, 201
        except Exception as e:
            logs.logger.error(e)

    @staticmethod
    def get_sensor_data(from_date, to_date, sensorType):
        try:
            dbcon()
            reading_list = []
            timestamp_list = []
            stats_dict = {}
            from_date = datetime.strptime(from_date, "%Y-%m-%d")
            to_date = datetime.strptime(to_date, "%Y-%m-%d")
            sensor_data = SensorModel.objects.filter(
                Q(timestamp__gte=from_date) & Q(timestamp__lte=to_date),
                sensorType__iexact=sensorType,
            )
            if sensor_data:
                for data in sensor_data:
                    reading_list.append(data.reading)
                    timestamp_list.append(data.timestamp.strftime("%d-%m-%Y"))
                report_dict = {
                    "reading": reading_list,
                    "timestamp": timestamp_list
                }
                average = round(sum(reading_list) / len(reading_list), 2)
                minimum = min(reading_list)
                maximum = max(reading_list)
                stats_dict.update({
                    "maximum": maximum,
                    "minimum": minimum,
                    "average": average
                })
                resp = {
                    "report": report_dict,
                    "stats": stats_dict
                }
                return {
                           "message": "Sensor Data",
                           "response": resp,
                           "status_code": 200
                       }, 200
            else:
                return {
                           "message": "No Sensor Data available for this combination",
                           "response": None,
                           "status_code": 400
                       }, 400
        except Exception as e:
            logs.logger.error(e)

    @staticmethod
    def get_all_sensor_data():
        try:
            dbcon()
            reading_list = []
            timestamp_list = []
            resp = []
            sensor_types = SensorModel.objects().distinct("sensorType")
            for sensor_type in sensor_types:
                sensor_data = SensorModel.objects.filter(sensorType=sensor_type)
                for data in sensor_data:
                    reading_list.append(data.reading)
                    timestamp_list.append(data.timestamp.strftime("%d-%m-%Y"))
                report_dict = {
                    "reading": reading_list,
                    "timestamp": timestamp_list
                }
                average = round(sum(reading_list) / len(reading_list), 2)
                minimum = min(reading_list)
                maximum = max(reading_list)
                stats_dict = {
                    "maximum": maximum,
                    "minimum": minimum,
                    "average": average
                }
                resp.append({
                    "sensorType": sensor_type,
                    "report": report_dict,
                    "stats": stats_dict
                })
                reading_list = []
                timestamp_list = []
            print(resp)
            return {
                "message": "Sensor Data",
                "response": resp,
                "status_code": 200
            }, 200
        except Exception as e:
            logs.logger.error(e)

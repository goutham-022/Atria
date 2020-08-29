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

    # @staticmethod
    # def get_all_sensor_data():
    #     try:
    #         data_list = []
    #         resp = []
    #         sensor_data = SensorModel.objects()
    #         for data in sensor_data:
    #             resp.append({
    #                 "reading": data.reading,
    #                 "timestamp": data.timestamp.strftime("%d-%m-%Y")
    #             })
    #         for data in sensor_data:
    #             data_list.append(data.reading)
    #         average = round(sum(data_list) / len(data_list), 2)
    #         minimum = min(data_list)
    #         maximum = max(data_list)
    #         resp.append({
    #             "maximum": maximum,
    #             "minimum": minimum,
    #             "average": average
    #         })
    #         sensor_report = [
    #             {
    #                 "reading": 26.0}, {
    #                 "reading": 28.0}, {
    #                 "reading": 29.0}, {
    #                 "reading": 30.0}, {
    #                 "reading": 31.0
    #             },
    #             {
    #                 "timestamp": "20-08-2020"}, {
    #                 "timestamp": "21-08-2020"}, {
    #                 "timestamp": "22-08-2020"}, {
    #                 "timestamp": "23-08-2020"}, {
    #                 "timestamp": "24-08-2020"
    #             }
    #         ]
    #         return {
    #                    "message": "Sensor Data",
    #                    "response": {
    #                        "sensorType": "AC",
    #                        "report": {
    #                            "reading": [26.0, 28.0, 29.0, 30.0, 31.0, 26.0, 28.0, 29.0, 30.0, 31.0, 26.0, 28.0, 29.0, 30.0, 31.0],
    #                            "timestamp": ["20-08-2020", "21-08-2020", "22-08-2020", "24-08-2020", "25-08-2020", "20-08-2020", "21-08-2020", "22-08-2020", "24-08-2020", "25-08-2020", "20-08-2020", "21-08-2020", "22-08-2020", "24-08-2020", "25-08-2020"]
    #                        },
    #                        "stats": {
    #                            "maximum": 35.0,
    #                            "minimum": 26.0,
    #                            "average": 28.83
    #                        }
    #                    }
    #                }, 200
    #     except Exception as e:
    #         logs.logger.error(e)

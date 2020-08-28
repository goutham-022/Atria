import datetime

from mongoengine import Document, StringField, DateTimeField, FloatField


# class User(Document):
#     first_name = StringField(max_length=40, required=True)
#     last_name = StringField(max_length=40, required=True)
#     age = IntField()
#     email = EmailField(required=True, unique=True)
#     phone_no = StringField(max_length=20, required=True, unique=True)
#     status = StringField(max_length=20, required=True, default="InActive")
#     created_date = DateTimeField(default=datetime.datetime.now)
#     updated_date = DateTimeField(default=datetime.datetime.now)
#     meta = dict(collection="User")
#
#     def __repr__(self):
#         return dict(self.to_mongo())


class Sensor(Document):
    reading = FloatField(required=True)
    timestamp = DateTimeField(required=True)
    sensorType = StringField(max_length=40, required=True)
    # created_by = ReferenceField(User)
    # updated_by = ReferenceField(User)
    created_date = DateTimeField(default=datetime.datetime.now)
    updated_date = DateTimeField(default=datetime.datetime.now)
    meta = dict(collection="Sensor")

    def __repr__(self):
        return dict(self.to_mongo())
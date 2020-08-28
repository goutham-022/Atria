from flask import Flask
from api import api

app = Flask(__name__)
api.init_app(app)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Headers', 'Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    response.headers.add('Server', 'Atria-Assignment')
    return response


if __name__ == '__main__':
    app.run(port=5000, debug=False)

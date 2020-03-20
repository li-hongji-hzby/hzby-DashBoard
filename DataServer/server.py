from flask_cors import CORS
from flask import Flask,request,jsonify
from mysql import selectBylatest, selectRealTimeData,selectDataByDate
import json

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/getLatestData', methods=['GET'])
def getLatestData():
    print('请求方式为------->', request.method)
    location = request.args.get("location")  # 获取  get  参数
    dataKind = request.args.get("dataKind")
    limit = request.args.get("limit")
    # return json.dumps(selectBylatest(location,dataKind))
    return selectBylatest(location,dataKind,limit)

@app.route('/getRealTimeData', methods=['GET'])
def getRealTimeData():
    print('请求方式为------->', request.method)
    location = request.args.get("location")  # 获取  get  参数
    # return json.dumps(selectBylatest(location,dataKind))
    return jsonify(selectRealTimeData(location))

@app.route('/getDataByDate', methods=['GET'])
def getDataByDate():
    print('请求方式为------->', request.method)
    date = request.args.get("date")  # 获取  get  参数
    location = request.args.get("location")  # 获取  get  参数
    dataKind = request.args.get("dataKind")
    # return json.dumps(selectBylatest(location,dataKind))
    return jsonify(selectDataByDate(date))


if __name__ == '__main__':
    CORS(app, supports_credentials=True)
    app.run(debug=True)
import pymysql.cursors
import json
import datetime


mysql_host = '203.195.158.228'
mysql_port = 3306
mysql_user = 'root'
mysql_password = '15935728'
mysql_db = 'hzby'


def insertData():
    db = pymysql.connect(host=mysql_host, port=3306, user=mysql_user, password=mysql_password, db=mysql_db)
    cursor = db.cursor()
    a = open(r'params.json', 'r', encoding='UTF-8')
    out = a.read()
    tmp = json.loads(out)
    for i in tmp.keys():
        for j in tmp[i].keys():
            sql = "INSERT INTO noaa_mod (location, data_kind, record_time, data_value ) VALUES "
            sqlData =''
            for k in tmp[i][j].keys():
                dateArray = datetime.datetime.fromtimestamp(int(k))
                otherStyleTime = dateArray.strftime("%Y-%m-%d %H:%M:%S")
                sqlData = sqlData + "('"+i+"','"+j+"','"+otherStyleTime+"',"+str(tmp[i][j][k])+"),"
            try:
                print(sql+sqlData[:-1])
                cursor.execute(sql+sqlData[:-1])
                print("SQL success")
                db.commit()
                db.close()
            except:
                print("SQL error")

# insertData()

# 获取最新数据
def selectBylatest(location, data_kind,limit):
    db = pymysql.connect(host=mysql_host, port=3306, user=mysql_user, password=mysql_password, db=mysql_db)
    cursor = db.cursor()
    sql = "select data_value,record_time from noaa_mod where data_kind = '"+data_kind+"' and location ='"+location+"' order by record_time desc limit "+limit
    db.ping(reconnect=True)
    cursor.execute(sql)
    result = cursor.fetchall()
    resultDict = {}
    dataList = []
    timeList = []
    for i in result:
        dataList.append(i[0])
        timeList.append(str(i[1]))
    resultDict['data'] = dataList
    resultDict['time'] = timeList
    return resultDict

# 获取实时数据（或最新）
def selectRealTimeData(location):
    db = pymysql.connect(host=mysql_host, port=3306, user=mysql_user, password=mysql_password, db=mysql_db)
    cursor = db.cursor()
    sql = "select data_kind, data_value,record_time from noaa_mod where location ='"+location+"' order by record_time desc limit 5"
    db.ping(reconnect=True)
    cursor.execute(sql)
    result = cursor.fetchall()
    resultList=[]
    print(result)
    for i in result:
        resultList.append([str(i[0]),str(i[1])])
    print(resultList)
    return resultList

# 根据日期获取数据
def selectDataByDate(date):
    db = pymysql.connect(host=mysql_host, port=3306, user=mysql_user, password=mysql_password, db=mysql_db)
    cursor = db.cursor()
    datetime.datetime.strptime(date, '%Y%m%d')
    nextDay = (datetime.datetime.strptime(date, '%Y%m%d')+datetime.timedelta(days=1)).strftime("%Y%m%d")
    print(nextDay)
    sql = "SELECT location, data_kind, data_value,record_time FROM noaa_mod WHERE record_time >= '"+date+"' and record_time <'"+nextDay+"'"
    db.ping(reconnect=True)
    cursor.execute(sql)
    result = cursor.fetchall()
    resultList=[]
    print(result)
    resultDict ={'coyote_creek':{'h2o_feet':[],'h2o_quality':[],'h2o_pH':[],'average_temperature':[],'h2o_temperature':[]},
                 'santa_monica':{'h2o_feet':[],'h2o_quality':[],'h2o_pH':[],'average_temperature':[],'h2o_temperature':[]},
                 'timeList':[]}
    dataList ={'h2o_feet':{'coyote_creek':[],'santa_monica':[]},'h2o_quality':{'coyote_creek':[],'santa_monica':[]},
                'h2o_pH':{'coyote_creek':[],'santa_monica':[]},'average_temperature':{'coyote_creek':[],'santa_monica':[]},
                'h2o_temperature':{'coyote_creek':[],'santa_monica':[]},'timeList':[]
               }
    timeDict={}
    for i in result:
        dataList[str(i[1])][str(i[0])].append(str(i[2]))
        timeDict[str(i[3])]=''
        # resultList.append([str(i[0]),str(i[1])])
    dataList['timeList']=list(timeDict.keys())
    # print(resultDict)
    return dataList
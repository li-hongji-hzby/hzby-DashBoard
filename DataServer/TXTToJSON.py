import json;

# 打开文本文件
fp = open(r'NOAA_mod.txt', 'r');

# 使用readlines读取
lines = fp.readlines();

coyote_creek = {};
santa_monica = {};

#定义列表存放各类型数据
c_h2o_feet = {};
s_h2o_feet = {};
c_h2o_quality = {};
s_h2o_quality = {};
c_h2o_pH = {};
s_h2o_pH = {};
c_average_temperature = {};
s_average_temperature = {};
c_h2o_temperature = {};
s_h2o_temperature = {};



# 定义字典综合所有数据
dataDict = {};

for line in lines:
    dataList = line.split(",");
    dataKind = dataList[0]
    if dataKind == "h2o_feet":
        # 获取数据
        conList = dataList[1].split();
        localtion = conList[0].split("=")[1];
        time = conList[2];
        msg = float(conList[1].split("=")[1]);
        if localtion == "coyote_creek" :
            c_h2o_feet[time] = msg;
        elif localtion == "santa_monica" :
            s_h2o_feet[time] = msg;
    elif dataKind == "h2o_quality":
        conList = dataList[2].split();
        localtion = dataList[1].split("=")[1];
        time = conList[2];
        randtag = conList[0].split("=")[1];
        index = float(conList[1].split("=")[1]);
        msgDict = {"randtag":randtag,"index":index};
        if localtion == "coyote_creek" :
            c_h2o_quality[time] = index
        elif localtion == "santa_monica" :
            s_h2o_quality[time] = index
    elif dataKind == "h2o_pH":
        conList = dataList[1].split();
        localtion = conList[0].split("=")[1];
        time = conList[2];
        msg = float(conList[1].split("=")[1]);
        if localtion == "coyote_creek" :
            c_h2o_pH[time] = msg;
        elif localtion == "santa_monica" :
            s_h2o_pH[time] = msg;
    elif dataKind == "average_temperature":
        conList = dataList[1].split();
        localtion = conList[0].split("=")[1];
        time = conList[2];
        msg = float(conList[1].split("=")[1]);
        if localtion == "coyote_creek" :
            c_average_temperature[time] = msg;
        elif localtion == "santa_monica" :
            s_average_temperature[time] = msg;
    elif dataKind == "h2o_temperature":
        conList = dataList[1].split();
        localtion = conList[0].split("=")[1];
        time = conList[2];
        msg = float(conList[1].split("=")[1]);
        if localtion == "coyote_creek" :
            c_h2o_temperature[time] = msg;
        elif localtion == "santa_monica" :
            s_h2o_temperature[time] = msg;

# 把所有的数据存放到数据字典里
dataDict["coyote_creek"] = {"h2o_feet":c_h2o_feet,"h2o_quality":c_h2o_quality,"h2o_pH":c_h2o_pH,"average_temperature":c_average_temperature,"h2o_temperature":c_h2o_temperature}
dataDict["santa_monica"] = {"h2o_feet":s_h2o_feet,"h2o_quality":s_h2o_quality,"h2o_pH":s_h2o_pH,"average_temperature":s_average_temperature,"h2o_temperature":s_h2o_temperature}

# # 求出各数据平均值
#     # h2o_feet 平均值
# c_h2o_feet_avg = sum(dataDict["coyote_creek"]["h2o_feet"].values())/len(dataDict["coyote_creek"]["h2o_feet"]);
# s_h2o_feet_avg = sum(dataDict["santa_monica"]["h2o_feet"].values())/len(dataDict["santa_monica"]["h2o_feet"]);
#     # h2o_quality 平均值
# c_h2o_quality_avg = sum(dataDict["coyote_creek"]["h2o_quality"].values())/len(dataDict["coyote_creek"]["h2o_quality"]);
# s_h2o_quality_avg = sum(dataDict["santa_monica"]["h2o_quality"].values())/len(dataDict["santa_monica"]["h2o_quality"]);
#     # h2o_pH 平均值
# c_h2o_pH_avg = sum(dataDict["coyote_creek"]["h2o_pH"].values())/len(dataDict["coyote_creek"]["h2o_pH"]);
# s_h2o_pH_avg = sum(dataDict["santa_monica"]["h2o_pH"].values())/len(dataDict["santa_monica"]["h2o_pH"]);
#     # average_temperature 平均值
# c_average_temperature_avg = sum(dataDict["coyote_creek"]["average_temperature"].values())/len(dataDict["coyote_creek"]["average_temperature"]);
# s_average_temperature_avg = sum(dataDict["santa_monica"]["average_temperature"].values())/len(dataDict["santa_monica"]["average_temperature"]);
#     # h2o_temperature 平均值
# c_h2o_temperature_avg = sum(dataDict["coyote_creek"]["h2o_temperature"].values())/len(dataDict["coyote_creek"]["h2o_temperature"]);
# s_h2o_temperature_avg = sum(dataDict["santa_monica"]["h2o_temperature"].values())/len(dataDict["santa_monica"]["h2o_temperature"]);
#
#
# # 从字典中获取 h2o_feet 最大最小值
# dataDict["coyote_creek"]["h2o_feet"]["max"] = max(dataDict["coyote_creek"]["h2o_feet"].values());
# dataDict["coyote_creek"]["h2o_feet"]["min"] = min(dataDict["coyote_creek"]["h2o_feet"].values());
# dataDict["santa_monica"]["h2o_feet"]["max"] = max(dataDict["santa_monica"]["h2o_feet"].values());
# dataDict["santa_monica"]["h2o_feet"]["min"] = min(dataDict["santa_monica"]["h2o_feet"].values());
#     # 将平均值写入字典
# dataDict["coyote_creek"]["h2o_feet"]["avg"] = c_h2o_feet_avg;
# dataDict["santa_monica"]["h2o_feet"]["avg"] = s_h2o_feet_avg;
#
# # 从字典中获取 h2o_quality 最大最小值
# dataDict["coyote_creek"]["h2o_quality"]["max"] = max(dataDict["coyote_creek"]["h2o_quality"].values());
# dataDict["coyote_creek"]["h2o_quality"]["min"] = min(dataDict["coyote_creek"]["h2o_quality"].values());
# dataDict["santa_monica"]["h2o_quality"]["max"] = max(dataDict["santa_monica"]["h2o_quality"].values());
# dataDict["santa_monica"]["h2o_quality"]["min"] = min(dataDict["santa_monica"]["h2o_quality"].values());
#     # 将平均值写入字典
# dataDict["coyote_creek"]["h2o_quality"]["avg"] = c_h2o_quality_avg;
# dataDict["santa_monica"]["h2o_quality"]["avg"] = s_h2o_quality_avg;
#
# # 从数据字典中获取 h2o_pH 最大最小值
# dataDict["coyote_creek"]["h2o_pH"]["max"] = max(dataDict["coyote_creek"]["h2o_pH"].values());
# dataDict["coyote_creek"]["h2o_pH"]["min"] = min(dataDict["coyote_creek"]["h2o_pH"].values());
# dataDict["santa_monica"]["h2o_pH"]["max"] = max(dataDict["santa_monica"]["h2o_pH"].values());
# dataDict["santa_monica"]["h2o_pH"]["min"] = min(dataDict["santa_monica"]["h2o_pH"].values());
#     # 将平均值写入字典
# dataDict["coyote_creek"]["h2o_pH"]["avg"] = c_h2o_pH_avg;
# dataDict["santa_monica"]["h2o_pH"]["avg"] = s_h2o_pH_avg;
#
# # 从数据字典中获取 average_temperature 最大最小值
# dataDict["coyote_creek"]["average_temperature"]["max"] = max(dataDict["coyote_creek"]["average_temperature"].values());
# dataDict["coyote_creek"]["average_temperature"]["min"] = min(dataDict["coyote_creek"]["average_temperature"].values());
# dataDict["santa_monica"]["average_temperature"]["max"] = max(dataDict["santa_monica"]["average_temperature"].values());
# dataDict["santa_monica"]["average_temperature"]["min"] = min(dataDict["santa_monica"]["average_temperature"].values());
#     # 将平均值写入字典
# dataDict["coyote_creek"]["average_temperature"]["avg"] = c_average_temperature_avg;
# dataDict["santa_monica"]["average_temperature"]["avg"] = s_average_temperature_avg;
#
# # 从数据字典中获取 h2o_temperature 最大最小值
# dataDict["coyote_creek"]["h2o_temperature"]["max"] = max(dataDict["coyote_creek"]["h2o_temperature"].values());
# dataDict["coyote_creek"]["h2o_temperature"]["min"] = min(dataDict["coyote_creek"]["h2o_temperature"].values());
# dataDict["santa_monica"]["h2o_temperature"]["max"] = max(dataDict["santa_monica"]["h2o_temperature"].values());
# dataDict["santa_monica"]["h2o_temperature"]["min"] = min(dataDict["santa_monica"]["h2o_temperature"].values());
#     # 将平均值写入字典
# dataDict["coyote_creek"]["h2o_temperature"]["avg"] = c_h2o_temperature_avg;
# dataDict["santa_monica"]["h2o_temperature"]["avg"] = s_h2o_temperature_avg;

# 把字典转化成json并写入json文件
with open('params.json', 'w') as f:
    f.write(json.dumps(dataDict))
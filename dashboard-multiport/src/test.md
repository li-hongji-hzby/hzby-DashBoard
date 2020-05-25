# 概览
card电: 所有数据/1000
- 数据：
 - start: 1h-ago
 - metric: active_power
 - aggregate: sum
 - downsample: 1h-avg
 - tag: {project: yuanyang}
 - 10s刷新
- 背景：
 - start: 1h-ago
 - metric: active_power
 - aggregate: sum
 - downsample: 5m-avg

card气: 所有数据/60
- 数据：
 - start: 1h-ago
 - metric: flowrate
 - aggregate: sum
 - downsample: 1h-avg
 - 10s刷新
- 背景：
 - start: 1h-ago
 - metric: flowrate
 - aggregate: sum
 - downsample: 5m-avg

card单耗
- 对应上述 电/1000/气，注意如果气==0，则对应值为NaN

大图
- 年
 - start: 12m-ago
 - metric: 上面电或气
 - aggregate: 对应上面电或气的aggregate
 - downsample: 1mc-ave，注意，有“c”
 - 1分刷新
- 月
 - 类比年

表格
- 类比大图

# 实时

card: 查询/query/last接口
- 流量：flowrate/60 (yuanyang_flowmeter_01 + yuanyang_flowmeter_02 + yuanyang_flowmeter_03)
- 功率：active_power/1000
- 压力：这版固定6.3
- 单耗：对应上述 功率/1000/流量

下面的表格数据源先不变
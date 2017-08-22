<template>
    <div v-loading="loading" class="container">
        <el-row v-if="!loading" :gutter="20" class="number-card-container">
            <el-col :span="8">
                <el-card>
                    <icon-svg class="icon" icon-class="account"></icon-svg>
                    <div class="description">
                        <div>
                            <count-to class="count-to" ref="wechat" :startVal='0' :endVal='numbers.wechat' :duration='3000' :autoplay="false"></count-to>人</div>
                        <div>已有小程序用户</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <icon-svg class="icon" icon-class="supplierfeatures"></icon-svg>
                    <div class="description">
                        <div>
                            <count-to class="count-to" ref="library" :startVal='0' :endVal='numbers.library' :duration='3000' :autoplay="false"></count-to>个</div>
                        <div>已入驻图书馆</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <icon-svg class="icon" icon-class="smile"></icon-svg>
                    <div class="description">
                        <div>
                            <count-to class="count-to" ref="wiki" :startVal='0' :endVal='numbers.wiki' :duration='3000' :autoplay="false"></count-to>人</div>
                        <div>已有Wiki系统贡献者</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <icon-svg class="icon" icon-class="office"></icon-svg>
                    <div class="description">
                        <div>
                            <count-to class="count-to" ref="book" :startVal='0' :endVal='numbers.book' :duration='3000' :autoplay="false"></count-to>个</div>
                        <div>已创建图书条目</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <icon-svg class="icon" icon-class="category"></icon-svg>
                    <div class="description">
                        <div>
                            <count-to class="count-to" ref="collection" :startVal='0' :endVal='numbers.collection' :duration='3000' :autoplay="false">本</count-to>
                        </div>
                        <div>已记录图书馆馆藏</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <icon-svg class="icon" icon-class="survey"></icon-svg>
                    <div class="description">
                        <div>
                            <count-to class="count-to" ref="order" :startVal='0' :endVal='numbers.order' :duration='3000' :autoplay="false"></count-to>个</div>
                        <div>已产生订单</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row v-if="!loading" :gutter="30">
            <el-col :span="12">
                <el-card>
                    <div id="orderChart" style="width: 100%; height:400px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div id="userChart" style="width: 100%; height:400px;"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
import CountTo from 'vue-count-to';
import { getSummary } from '../../api/index.js';

// 最近7天对应的日期字符串数组
var date = [];
var now = new Date().getTime();
for (let i = 0; i < 7; i++) {
    let time = new Date(now - i * 24 * 3600 * 1000);
    date.unshift([time.getMonth() + 1, time.getDate()].join('/'));
}

export default {
    components: {
        CountTo
    },
    data() {
        return {
            numbers: {
                wechat: 0,
                library: 0,
                wiki: 0,
                book: 0,
                order: 0,
                collection: 0,
            },
            loading: true
        }
    },
    methods: {
        drawUserChart(data) {
            var chartLine = echarts.init(document.getElementById(('userChart')));
            chartLine.setOption({
                title: {
                    text: '近7日用户增长数量',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16,
                    },
                    left: '3%'
                },
                tooltip: {
                    trigger: 'axis'
                },
                //图例配置
                legend: {
                    itemGap: 13,
                    data: ['小程序', '图书馆', 'Wiki'],
                    top: 10,
                    right: '4%',
                    textStyle: {
                        fontSize: 12,
                    }
                },
                calculable: true,
                //x轴配置
                xAxis: [{
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    axisTick: {
                        alignWithLabel: true,
                        inside: true,
                        interval: 1
                    },
                    boundaryGap: false,
                    data: date,
                    name: "日期" // ** x轴配置:name
                }],
                // Y轴配置
                yAxis: [{
                    type: 'value',
                    name: "新增人数"
                }],
                series: [{
                    name: "小程序",
                    type: 'line',
                    data: data.wechat,
                    smooth: true
                }, {
                    name: "图书馆",
                    type: 'line',
                    data: data.library,
                    smooth: true
                }, {
                    name: "Wiki",
                    type: 'line',
                    data: data.wiki,
                    smooth: true
                }],
                color: [
                    '#00a2ae',
                    '#108ee9',
                    '#ffbf00'
                ]
            });
        },
        drawOrderChart(data) {
            var chartLine = echarts.init(document.getElementById(('orderChart')));
            chartLine.setOption({
                title: {
                    text: '近7日订单数量',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16,
                    },
                    left: '3%'
                },
                tooltip: {
                    trigger: 'axis'
                },
                calculable: true,
                //x轴配置
                xAxis: [{
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    axisTick: {
                        alignWithLabel: true,
                        inside: true,
                        interval: 1
                    },
                    boundaryGap: false,
                    data: date,
                    name: "日期" // ** x轴配置:name
                }],
                // Y轴配置
                yAxis: [{
                    type: 'value',
                    name: "订单数"
                }],
                series: [{
                    name: "订单数量",
                    type: 'line',
                    data: data,
                    smooth: true
                }],
                color: ['#20A0FF']
            });
        },
    },
    mounted: function() {
        getSummary().then((res) => {
            this.loading = false
            this.$nextTick().then(() => {
                this.drawUserChart(res.numberChangeLog);
                this.drawOrderChart(res.numberChangeLog.order);
                this.numbers = res.number;
                Object.keys(this.numbers).forEach(key => this.$refs[key].start())
            });
        }).catch(() => this.loading = false);
    }
}
</script>
<style scoped>
.container {
    padding: 0 15px;
}

.el-col {
    margin-bottom: 15px;
}

.el-row {
    margin-bottom: 10px;
}

.number-card-container {
    font-size: 12px;
    color: #8492A6;
}

.count-to {
    color: #1F2D3D;
    font-size: 24px;
    font-weight: 500;
}
</style>
<style>
.number-card-container .icon {
    width: 30px;
    height: 30px;
    margin-left: 20px;
}

.number-card-container .el-card__body {
    display: flex;
    align-items: center;
    justify-content: center;
}

.number-card-container .description {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
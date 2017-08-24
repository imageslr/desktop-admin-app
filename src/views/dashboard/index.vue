<template>
  <div v-loading="loading" class="container">
    <template v-if="!loading">
      <el-row :gutter="20" class="number-card-container">
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
                <count-to class="count-to" ref="collection" :startVal='0' :endVal='numbers.collection' :duration='3000' :autoplay="false"></count-to>本
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
        <el-col :span="8">
          <el-card>
            <icon-svg class="icon" icon-class="viewlist"></icon-svg>
            <div class="description">
              <div>
                <count-to class="count-to" ref="booklist" :startVal='0' :endVal='numbers.booklist' :duration='3000' :autoplay="false"></count-to>个</div>
              <div>已创建书单</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <icon-svg class="icon" icon-class="edit"></icon-svg>
            <div class="description">
              <div>
                <count-to class="count-to" ref="review" :startVal='0' :endVal='numbers.review' :duration='3000' :autoplay="false"></count-to>条</div>
              <div>已发表书评</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <icon-svg class="icon" icon-class="help"></icon-svg>
            <div class="description">
              <div>
                <count-to class="count-to" ref="message" :startVal='0' :endVal='numbers.message' :duration='3000' :autoplay="false"></count-to>条</div>
              <div>已收集意见</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="12">
          <el-card>
            <line-chart ref="lineChart" :title="lineChartParams.title" :formatter="lineChartParams.formatter" :x-axis="lineChartParams.xAxis" :y-axis="lineChartParams.yAxis" :data="lineChartParams.data" :height="400"></line-chart>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div id="userChart" style="width: 100%; height:400px;"></div>
          </el-card>
        </el-col>
      </el-row>
      <el-card>
        <map-chart ref="mapChart"></map-chart>
      </el-card>
    </template>
  </div>
</template>
<script>
import { getSummary } from '../../api/index.js';
import echarts from 'echarts';
import CountTo from 'vue-count-to';
import LineChart from '../../components/LineChart.vue';
import MapChart from '../../components/MapChart.vue';

// 图表横坐标：最近7天的日期
var date = [];
var now = new Date().getTime();
for (let i = 0; i < 7; i++) {
  let time = new Date(now - i * 24 * 3600 * 1000);
  date.unshift([time.getFullYear(), time.getMonth() + 1, time.getDate()].join('/'));
}

export default {
  components: {
    CountTo,
    LineChart,
    MapChart
  },
  data() {
    return {
      lineChartParams: {
        title: '近7日订单数量',
        xAxis: {
          name: '日期',
          data: date
        },
        yAxis: {
          name: '订单数'
        },
        data: {
          name: '借书数量',
          data: []
        }
      },
      numbers: {
        wechat: 0,
        library: 0,
        wiki: 0,
        book: 0,
        order: 0,
        collection: 0,
      },
      loading: true,
    }
  },
  methods: {
    renderMultiLineChart(data) {
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
  },
  mounted: function() {
    getSummary().then((res) => {
      this.loading = false
      this.$nextTick().then(() => {
        // 开始计数
        this.numbers = res.number;
        Object.keys(this.numbers).forEach(key => this.$refs[key].start());

        // 渲染图表
        this.lineChartParams.data.data = res.numberChangeLog.order;
        this.$refs.lineChart.render();
        this.renderMultiLineChart(res.numberChangeLog);
        this.$refs.mapChart.render();
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
.number-card-container .icon.svg-icon {
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

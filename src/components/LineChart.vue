<template>
  <div :id="id" :style="{height: height + 'px'}"></div>
</template>
<script>
import echarts from 'echarts';
export default {
  props: {
    id: {
      type: String,
      default: 'line-chart'
    },
    height: {
      type: Number,
      default: 300
    },
    title: {
      type: String,
      default: ''
    },
    formatter: {
      type: Function,
      default: () => {}
    },
    xAxis: {
      type: Object,
      default: () => {
        return {
          name: '',
          data: []
        }
      }
    },
    yAxis: {
      type: Object,
      default: () => {
        return {
          name: '',
        }
      }
    },
    data: {
      type: Object,
      default: () => {
        return {
          name: '',
          data: []
        }
      }
    }
  },
  methods: {
    render() {
      var chart = echarts.init(document.getElementById(this.id));
      chart.setOption({
        title: {
          text: this.title,
          textStyle: {
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        // 工具箱配置
        toolbox: {
          show: true,
          formatter: this.formatter,
          right: 25,
          feature: {
            saveAsImage: {
              name: this.title
            }
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
          data: this.xAxis.data,
          name: this.xAxis.name // ** x轴配置:name
        }],
        // Y轴配置
        yAxis: [{
          type: 'value',
          name: this.yAxis.name
        }],
        series: [{
          name: this.data.name,
          type: 'line',
          data: this.data.data,
          smooth: true
        }],
        color: [
          '#20A0FF'
        ]
      });
    }
  }
}

</script>

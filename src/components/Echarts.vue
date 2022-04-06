<template>
  <div class="echarts" ref="echarts"></div>
</template>

<script>
import * as echart from "echarts";
export default {
  props: {
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  //监听chartData
  watch: {
    chartData: {
      handler: function () {
        //一有变化就执行这个函数
        this.initCharts();
      },
      deep: true, //设置这个能监听到chartData内部属性的变化
    },
  },
  data() {
    return {
      axisOption: {
        legend: {
          textStyle: {
            color: "#333", //图例字体颜色
          },
        },
        grid: {
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0, //强制显示所有坐标轴标签
            color: "#333",
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
        color: ["#2ec7c9", "#b6a2de"],
        series: [],
      },
      pieOption: {
        tooltip: {
          trigger: "item",
        },
        series: [],
      },
      echart: null,
    };
  },
  methods: {
    initCharts() {
      this.initChartsData();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echart.init(this.$refs.echarts);
        this.echart.setOption(this.options);
      }
    },
    initChartsData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        this.pieOption.series = this.chartData.series;
      }
    },
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.pieOption;
    },
  },
};
</script>

<style>
</style>
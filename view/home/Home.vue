<template>
  <el-row :gutter="48">
    <el-col :span="8" style="margin-top: 20px">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <img class="userImage" :src="userImage" alt="" />
          <div class="userinfo">
            <p class="admin">Admin</p>
            <p>超级管理员</p>
          </div>
        </div>
        <div class="logininfo">
          <p>上次登录时间 <span>2022-3-28</span></p>
          <p>上次登录地点 <span>江苏南京</span></p>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(value, name) in tableLabel"
            :key="name"
            :prop="name"
            :label="value"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16" style="margin-top: 20px; padding: 0">
      <div class="numdiv">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{
            display: 'flex',
            padding: 0,
          }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>

          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="text">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <el-card style="height: 280px">
        <!-- <div style="height: 280px" ref="echarts"></div> -->
        <echarts :chart-data="echartsData.order" style="height: 280px" />
      </el-card>

      <div class="graph">
        <el-card style="height: 200px">
          <!-- <div style="height: 200px" ref="userEcharts"> -->
          <echarts :chart-data="echartsData.user" style="height: 200px" />
          <!-- </div> -->
        </el-card>
        <el-card style="height: 200px">
          <!-- <div style="height: 200px" ref="videoEcharts"></div> -->
          <echarts
            style="height: 200px"
            :chartData="echartsData.video"
            :is-axis-chart="false"
          />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/data.js";
// import * as echarts from "echarts";
import Echarts from "../../src/components/Echarts.vue";

export default {
  data() {
    return {
      userImage: require("../../src/assets/img/photo.jpeg"),
      tableData: [
        {
          name: "oppo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "小米",
          todayBuy: 1000,
          monthBuy: 200,
          totalBuy: 800,
        },
        {
          name: "华为",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 1000,
        },
        {
          name: "Apple",
          todayBuy: 100,
          monthBuy: 8000,
          totalBuy: 9000,
        },
        {
          name: "vivo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      tableLabel: {
        name: "名称",
        todayBuy: "今日购买",
        monthBuy: "月购买",
        totalBuy: "总销量",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartsData: {
        order: {
          xData: [],
          series: [],
        },
        user: { xData: [], series: [] },
        video: { series: [] },
      },
    };
  },
  components: {
    Echarts,
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code == 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const XData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        // const option = {
        //   xAxis: {
        //     data: XData,
        //   },
        //   yAxis: {},
        //   legend: {
        //     data: keyArray,
        //   },
        //   tooltip: {
        //     //加提示
        //     trigger: "axis",
        //     confine: true, //防止被遮挡
        //   },
        //   series,
        // };
        // const E = echarts.init(this.$refs.echarts);
        // E.setOption(option);
        this.echartsData.order.xData = XData;
        this.echartsData.order.series = series;

        //用户图
        const user = data.userData;
        // const userOption = {
        //   legend: {
        //     textStyle: {
        //       color: "#333", //图例字体颜色
        //     },
        //   },
        //   grid: {
        //     left: "20%",
        //   },
        //   tooltip: {
        //     trigger: "axis",
        //   },
        //   xAxis: {
        //     type: "category",
        //     data: user.map((item) => item.date),
        //     axisLine: {
        //       lineStyle: {
        //         color: "#17b3a3",
        //       },
        //     },
        //     axisLabel: {
        //       interval: 0, //强制显示所有坐标轴标签
        //       color: "#333",
        //     },
        //   },
        //   yAxis: {
        //     type: "value",
        //     axisLine: {
        //       lineStyle: {
        //         color: "#17b3a3",
        //       },
        //     },
        //   },
        //   color: ["#2ec7c9", "#b6a2de"],
        //   series: [
        //     {
        //       name: "新增用户",
        //       data: user.map((item) => item.new),
        //       type: "bar",
        //     },
        //     {
        //       name: "活跃用户",
        //       data: user.map((item) => item.active),
        //       type: "bar",
        //     },
        //   ],
        // };
        // const U = echarts.init(this.$refs.userEcharts);
        // U.setOption(userOption);
        this.echartsData.user.xData = user.map((item) => item.date);
        this.echartsData.user.series = [
          {
            name: "新增用户",
            data: user.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: user.map((item) => item.active),
            type: "bar",
          },
        ];

        //饼图
        const video = data.videoData;
        // const videoOption = {
        //   tooltip: {
        //     trigger: "item",
        //   },
        //   series: [
        //     {
        //       type: "pie",
        //       data: video,
        //     },
        //   ],
        // };
        // const V = echarts.init(this.$refs.videoEcharts);
        // V.setOption(videoOption);

        this.echartsData.video.series = [
          {
            type: "pie",
            data: video,
          },
        ];
      }
      // console.log(res);
    });
  },
};
</script>

<style lang='less' scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix {
  position: relative;

  p {
    margin: 5px 0;
    font-size: 14px;
    color: rgb(119, 117, 117);
  }
  .admin {
    font-size: 22px;
    // font-weight: 700;
    color: #000;
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.userinfo {
  position: absolute;
  top: 20px;
  left: 135px;
}
.userImage {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.logininfo {
  color: rgb(119, 117, 117);
  font-size: 14px;
  p {
    margin: 5px 0;
    span {
      margin-left: 30px;
    }
  }
}

.numdiv {
  display: flex;
  flex-wrap: wrap;
  font-size: 28px;
  color: #fff;
  .detail {
    height: 80px;
    width: 245px;
  }
  .icon {
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  p {
    margin: 10px 10px 0px 20px;
  }
}

.el-card {
  margin-bottom: 20px;
  margin-right: 27px;
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
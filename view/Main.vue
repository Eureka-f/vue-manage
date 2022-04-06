<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <left-slide></left-slide>
    </el-aside>
    <el-container>
      <el-header>
        <common-header />
      </el-header>
      <tags />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LeftSlide from "../src/components/LeftSlide.vue";
import CommonHeader from "../src/components/Header.vue";
import Tags from "../src/components/Tags.vue";

// import CommonHeader from "components/Header.vue";
export default {
  components: {
    LeftSlide,
    CommonHeader,
    Tags,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #000;
}
.main {
  height: 100%;
}
</style>
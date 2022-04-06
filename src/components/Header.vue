<template>
  <header>
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
      ></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="item in tag"
            :key="item.path"
            :to="{ path: item.path }"
            >{{ item.label }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
    </div>

    <div class="r-content">
      <el-dropdown>
        <span>
          <img class="userimg" :src="imgsrc" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown" trigger="click" size="mini">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      imgsrc: require("../assets/img/photo.jpeg"),
    };
  },

  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    logout() {
      this.$store.commit("removeToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState({
      tag: (state) => state.tab.tabList,
    }),
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
    // height: 80%;
  }
}
.r-content {
  .userimg {
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }
}
.breadcrumb /deep/ .el-breadcrumb__inner {
  color: #fff;
}
</style>
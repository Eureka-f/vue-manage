<template>
  <div class="login">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login-container"
    >
      <h3 class="login-title">系统登陆</h3>
      <el-form-item
        label="用户名"
        label-width="80px"
        prop="username"
        class="username"
      >
        <el-input
          type="input"
          v-model="form.username"
          auto-complete="off"
          placeholder="请输入账号"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item class="loginsubmit">
        <el-button type="primary" @click="loginSubmit" class="loginsubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMenu } from "../../api/data";
export default {
  data() {
    return {
      form: {},
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigge: "blur", //失去焦点就触发
          },
          {
            min: 3,
            message: "用户名长度不能小于3位",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    loginSubmit() {
      getMenu(this.form).then(({ data: res }) => {
        // console.log(res);
        if (res.code === 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push("/home");
        } else {
          this.$message.warning(res.data.message);
        }
      });
      // const token = Mock.random.guid();
      // this.$store.commit("setToken", token);
      // this.$router.push("/home");
    },
  },
};
</script>

<style lang='less' scoped>
form {
  // margin: 0;
  // padding: 0;
  // border: 0;
  // font-size: 100%;
  // font: inherit;
  // vertical-align: baseline;
  box-sizing: border-box;
}
.login-container {
  border-radius: 15px;
  background-clip: 15px; //背景裁剪
  width: 350px;
  margin: 180px auto; //水平居中
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6; //三个参数分别是水平、垂直、模糊距离
}
.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.loginsubmit {
  margin: 10px auto 0 auto;
  // text-align: center;
}
</style>
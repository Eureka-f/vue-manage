<template>
  <div class="mall">
    <div class="mallheader">
      <el-dialog
        :visible.sync="isShow"
        :title="oprateType === 'add' ? '新增数据' : '编辑数据'"
      >
        <common-form :form="Form" :formLabel="FormLabel" class="common-form">
        </common-form>
        <div class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </el-dialog>
      <div class="left">
        <el-button type="primary" @click="addrecord">+新增</el-button>
      </div>
      <div class="right">
        <!-- <common-form :form="form" :form-label="searchFormLable" :inline="true">
          <el-button type="primary">搜索</el-button>
        </common-form> -->
        <el-input v-model="keywords" placeholder="请输入"></el-input>
        <el-button type="primary" @click="getData(keywords)">搜索</el-button>
      </div>
    </div>
    <div class="mall-content">
      <common-table
        :table-data="tableData"
        :table-label="tableLabel"
        :config="config"
        @del="delData"
        @edit="editData"
        @changePage="getData()"
      >
      </common-table>
    </div>
  </div>
</template>

<script>
import CommonForm from "../../src/components/Form.vue";
import CommonTable from "../../src/components/CommonTable.vue";

import { getMallData } from "../../api/data";
export default {
  data() {
    return {
      // searchFormLable: [
      //   {
      //     type: "input",
      //     label: "",
      //     model: "keywords",
      //   },
      // ],
      // form: {
      //   keywords: "",
      // },
      keywords: "",
      Form: {
        id: "",
        date: "",
        name: "",
        count: "",
      },
      FormLabel: [
        {
          type: "date",
          model: "date",
          label: "日期",
        },
        {
          type: "input",
          label: "产品",
          model: "name",
        },

        {
          type: "input",
          model: "count",
          label: "销量",
        },
      ],
      isShow: false,
      oprateType: "",
      tableData: [],
      tableLabel: [
        {
          prop: "date",
          label: "日期",
          width: "300",
        },
        {
          prop: "name",
          label: "产品",
          width: "300",
        },

        {
          prop: "count",
          label: "销量",
          width: "300",
        },
      ],
      config: {
        page: 1,
        total: 20, //总条目数
      },
    };
  },
  components: {
    CommonForm,
    CommonTable,
  },
  created() {
    this.getData();
  },
  methods: {
    addrecord() {
      this.oprateType = "add";
      this.isShow = true;
      this.Form = {
        id: "",
        date: "",
        name: "",
        count: "",
      };
    },
    confirm() {
      if (this.oprateType === "add") {
        this.$http.post("mall/add", this.Form).then(() => {
          this.isShow = false;
          this.getData();
          // console.log(this.tableData);
        });
      }
      if (this.oprateType === "edit") {
        this.$http.post("mall/edit", this.Form).then(() => {
          this.isShow = false;
          this.getData();
        });
      }
    },
    delData(row) {
      let id = row.id;
      this.$confirm("确定要删除该条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.$http.post("/mall/dele", id).then(() => {
            this.getData();
          });
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },

    editData(row) {
      this.oprateType = "edit";
      this.isShow = true;
      this.Form = row;
    },

    getData(keywords = "") {
      getMallData({ page: this.config.page, keywords }).then((res) => {
        // console.log(res);
        this.config.loading = true;
        const mallData = res.data.list;
        this.tableData = mallData;
        this.config.total = res.data.counts;
        // console.log(this.config.total);
        this.config.loading = false;
      });
    },
  },
};
</script>

<style lang='less' scoped>
.mallheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 10px;
  .left {
    left: 0;
    height: 80%;
  }
  .right {
    display: flex;
  }
  .common-form {
    width: 60%;
  }
}
.el-dialog {
  position: relative;
  .dialog-footer {
    position: absolute;
    right: 20px;
    bottom: 10px;
  }
}
.mall-content {
  margin-top: 15px;
  margin-left: 20px;
}
</style>
<template>
  <div class="user">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '编辑用户'"
      :visible.sync="isShow"
    >
      <common-form :form-label="formLabel" :form="form" :inline="true">
      </common-form>
      <div class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <div class="userheader">
      <el-button @click="adduser" type="primary">+ 新增</el-button>
      <common-form :form-label="searchLabel" :form="searchForm" :inline="true">
        <el-button @click="getList(searchForm.keywords)" type="primary"
          >搜索</el-button
        >
      </common-form>
    </div>
    <common-table
      :table-data="tableData"
      :table-label="tableLabel"
      :config="config"
      @edit="editUser"
      @del="delUser"
      @changePage="getList()"
    >
    </common-table>
  </div>
</template>

<script>
import CommonForm from "../../src/components/Form.vue";
import CommonTable from "../../src/components/commonTable.vue";
import { getUserData } from "../../api/data";
export default {
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      formLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },

        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],

      form: {
        name: "",
        age: "",
        addr: "",
        birth: "",
        sex: "",
      },
      searchLabel: [{ type: "input", model: "keywords", label: "" }],
      searchForm: {
        keywords: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    adduser() {
      this.isShow = true;
      this.operateType = "add";
      this.form = { name: "", age: "", addr: "", birth: "", sex: "" };
    },

    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/user/edit", this.form).then((res) => {
          this.isShow = false;
          console.log(res);
          this.getList();
        });
      } else {
        this.$http.post("/user/add", this.form).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.form = row;
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该文件，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const id = row.id;
          this.$http.post("/user/del", {
            params: { id },
          });
        })
        .then(() => {
          this.$message({ type: "success", message: "删除成功" });
          this.getList();
        })
        .catch((err) => {
          this.$message({ type: "info", message: "取消删除" });
          this.getList();
        });
    },
    getList(name = "") {
      this.config.loading = true; //获取数据前给config加一个loading属性
      name ? (this.config.page = 1) : ""; //判断是否要搜索
      getUserData({ page: this.config.page, name }).then(({ data: res }) => {
        //{data: res } 是解构赋值
        console.log(res);
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
};
</script>

<style lang='less' scoped>
.userheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-dialog {
  position: relative;
  .dialog-footer {
    position: absolute;
    margin-top: 120px;
    right: 15px;
    bottom: 15px;
  }
}
</style>
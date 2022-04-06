<template>
  <el-form :model="form" label-width="100px" :inline="inline">
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
    >
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="form[item.model]"
      ></el-input>

      <el-radio-group v-if="item.type === 'select'" v-model="form[item.model]">
        <el-radio
          v-for="opt in item.opts"
          :key="opt.value"
          :label="opt.label"
        ></el-radio>
      </el-radio-group>

      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
        v-model="form[item.model]"
      >
      </el-date-picker>
      <!-- <el-select
        v-if="item.type === 'select'"
        v-model="form[item.model]"
        placeholder="请选择"
      >
        <el-option
          v-for="opt in item.opts"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        >
        </el-option>
      </el-select> -->
    </el-form-item>
    <el-form-item>
      <slot> </slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
  },
};
</script>

<style>
</style>
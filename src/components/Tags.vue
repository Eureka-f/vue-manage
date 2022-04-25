<template>
  <div class="tags">
    <!-- header下面那一栏 -->
    <el-tag
      size="small"
      v-for="(item, index) in tag"
      :key="item.path"
      :closable="item.path !== '/home'"
      :effect="$route.path == item.path ? 'dark' : 'plain'"
      @click="clickItem(item)"
      @close="closeItem(item, index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      tag: (state) => state.tab.tabList,
    }),
  },

  methods: {
    ...mapMutations(["deleteMenu"]),
    clickItem(item) {
      this.$router.push(item.path);
    },

    closeItem(item, index) {
      if (this.$route.path !== item.path) {
        this.deleteMenu(item);
        return;
      }
      // console.log(index);

      let length = this.tag.length - 1;
      if (index === length) {
        this.$router.push(this.tag[index - 1].path);
      } else {
        this.$router.push(this.tag[index + 1].path);
      }

      this.deleteMenu(item);
    },
  },
};
</script>

<style lang='less'>
.tags {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
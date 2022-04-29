<template>
  <div class="pagination">
    <!-- 把整个分页器分成上中下三部分 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="startNumAndendNum.start > 1" @click="$emit('getPageNo', 1)" :class="{active: pageNo == 1}">
      1
    </button>
    <button v-if="startNumAndendNum.start > 2">···</button>

    <button
      v-for="(page, index) in startNumAndendNum.end"
      :key="index"
      v-if="page >= startNumAndendNum.start"
      @click="$emit('getPageNo', page)"
      :class="{active: pageNo == page}"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndendNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndendNum.end < totalPage" @click="$emit('getPageNo', totalPage)" :class="{active: pageNo == totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续页码的起始页码、末尾页码
    startNumAndendNum() {
      let start = 0,
        end = 0;
      // 不正常现象
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        // 正常现象   Math.floor:向下取整
        start = this.pageNo - Math.floor(this.continues / 2);
        end = this.pageNo + Math.floor(this.continues / 2);
        // start出现不正常现象纠正
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        // end出现不正常现象纠正
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
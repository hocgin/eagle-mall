<template>
  <el-table v-bind="$attrs" v-on="$listeners" style="width: 100%;">
    <template v-for="(column, index) in columns">
      <table-cell :key="index" :column="column" />
    </template>
  </el-table>
</template>

<script>
import tableCell from './cell'
export default {
  components: {
    tableCell
  },
  props: ['columns'],
  inheritAttrs: false
}
</script>

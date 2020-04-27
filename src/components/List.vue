<template>
  <div>
    <Search></Search>
    <Table></Table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Table } from 'view-design';
import Search from './Search.vue';

export default Vue.extend({
  name: 'List',
  props: {
    msg: String,
  },
  components: {
    Table,
    Search,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>

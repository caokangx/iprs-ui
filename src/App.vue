<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/notFound">NotFound</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { Error } from './schema/error';

export default Vue.extend({
  computed: mapState(['error']),
  watch: {
    error: {
      handler(error: Error) {
        if (error.hasError && error.msg) {
          this.$Message.error(error.msg);
        }
      },
      deep: true
    }
  }
});
</script>

<style lang="less">
@import url('./styles/base.less');
</style>

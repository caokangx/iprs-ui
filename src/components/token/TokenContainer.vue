<template>
  <div class="container">
    <Token
      @close="handleCloseBtnClick"
      class="token"
      :token="token"
      :key="key"
      :name="key"
      v-for="(token, key) in tokens"
    >
      <template slot v-if="token.type === DocFieldType.Date">
        <span class="token-text">{{ dateRange(token.value) }}</span>
      </template>
    </Token>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import {  } from 'view-design';
import Token from './Token.vue';
import { DocFieldType } from '../../schema';

export default Vue.extend({
  components: {
    Token
  },
  props: {
    tokens: {
      type: [Array, Object],
      required: true
    }
  },
  methods: {
    handleCloseBtnClick(value: any) {
      this.$emit('on-close', value);
    },
    dateRange(data: any) {
      let result = '';
      const { start, end } = data || {};
      if (!start || !end) {
        return result;
      }
      result = `${start} - ${end}`;
      return result;
    }
  },
  computed: {
    DocFieldType() {
      return DocFieldType;
    }
  }
});
</script>

<style lang="less" scoped>
.container {
  .token {
    margin: 4px;
  }
}
</style>

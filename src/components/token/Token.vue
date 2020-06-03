<template>
  <Badge :offset="badgeOffset" type="warning">
    <Card :padding="0" class="token">
      <slot>
        <span class="token-text">{{ value || token.value }}</span>
      </slot>
    </Card>
    <Icon
      class="token-close-icon"
      :size="badgeSize"
      color="white"
      :type="badgeIcon"
      slot="count"
      @click="handleCloseBtnClick"
    ></Icon>
  </Badge>
</template>

<script lang="ts">
import Vue from 'vue';
import { Card, Badge, Icon } from 'view-design';

export default Vue.extend({
  components: {
    Card,
    Badge,
    Icon
  },
  props: {
    value: String,
    name: String,
    token: [String, Object],
    badgeOffset: {
      type: Array,
      default: () => [4, 4]
    },
    badgeIcon: {
      type: String,
      default: () => 'md-close'
    },
    badgeSize: {
      type: Number,
      default: 14
    }
  },
  methods: {
    handleCloseBtnClick() {
      this.$emit('close', {
        ...this.token,
        key: this.name
      });
    }
  },
  computed: {
    dateRange() {
      let result = '';
      const { start, end } = this.token.value || {};
      if (!start || !end) {
        return result;
      }
      result = `${start} - ${end}`;
      return result;
    }
  }
});
</script>

<style lang="less">
.token {
  width: fit-content;
  padding: 2px 0;

  .token-text {
    padding: 0 12px;
  }
}
.token-close-icon {
  background: red;
  border-radius: 50%;
  transition: all ease 0.3s;
  &:hover {
    box-shadow: 1px 1px 6px rgba(92, 0, 0, 0.2);
    border-color: #eee;
    cursor: pointer;
    background: lighten(red, 12%);
  }
  &:active {
    background: darken(red, 3%);
  }
}
</style>

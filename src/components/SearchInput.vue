<template>
  <div class="search-item">
    <span class="search-item-name">{{ name }}</span>
    <input class="search-item-input" :value="value" @input="$emit('input', $event.target.value)"/>
  </div>
</template>

<script lang="ts">

export default {
  props: {
    value: String,
    name: String,
  },
};
</script>

<style lang="less" scoped>
.search-item {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 5px 0;
  width: 250px;

  .search-item-name {
    margin-right: 8px;
    font-size: 14px;
  }
  .search-item-input {
    border-radius: 2px;
    border: 1px solid #dcdee2;
    color: #515a6e;
    font-size: 14px;
    padding: 3px 3px;
  }
}
</style>

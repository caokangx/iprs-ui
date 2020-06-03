<template>
  <div class="search-item">
    <template v-if="type === DocFieldType.String">
      <span class="search-item-name">{{ name }}</span>
      <input
        class="search-item-input"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
    </template>
    <template v-if="type === DocFieldType.Date">
      <span class="search-item-name">{{ name }}</span>
      <DatePicker
        confirm
        :open="showDatePicker"
        @on-ok="handleDatePickerOK"
        @on-change="handleDatePickerChange"
        @on-clear="handleDatePickerClear"
        type="daterange"
        placeholder="请选择日期"
        placement="bottom-end"
        transfer
        class="date-picker"
      >
        <input
          readonly
          @click="handleDatePickerClick"
          :value="dateRange"
          class="search-item-input"
        />
        <Icon class="date-picker-icon" type="ios-calendar-outline" />
      </DatePicker>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DatePicker, Icon } from 'view-design';
import { DocFieldType } from '../schema';

export default Vue.extend({
  data() {
    return {
      showDatePicker: false,
      date: {}
    };
  },
  components: {
    DatePicker,
    Icon
  },
  computed: {
    DocFieldType() {
      return DocFieldType;
    },
    dateRange() {
      let result = '';
      const { start, end } = this.value || {};
      if (!start || !end) {
        return result;
      }
      result = `${start} - ${end}`;
      return result;
    }
  },
  props: {
    value: [String, Object],
    name: String,
    type: String
  },
  methods: {
    handleDatePickerChange(data: Array<string>) {
      const [start, end] = data;
      this.date = {
        start,
        end
      };
    },
    handleDatePickerOK() {
      this.$data.showDatePicker = !this.$data.showDatePicker;
      this.$emit('input', this.date);
    },
    handleDatePickerClear() {
      this.$data.showDatePicker = !this.$data.showDatePicker;
      this.$emit('input', {});
    },
    handleDatePickerClick() {
      this.$data.showDatePicker = !this.$data.showDatePicker;
    }
  }
});
</script>

<style lang="less">
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
.date-picker {
  position: relative;
  .date-picker-icon {
    position: absolute;
    right: 4px;
    top: 5px;
  }
}
</style>

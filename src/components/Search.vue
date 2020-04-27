<template>
  <div class="search-wrapper">
    <Input v-model='a' size="large" class="search-input">
      <div class="search-input-wrapper" slot="prepend">
        <Button @click="handleAdvancedBtnClick"
          v-model="select3" icon="ios-arrow-down"
          :class="['search-input-advanced-btn', {'show-advanced': !hide}]">
          <span>高级搜索</span>
        </Button>
        <transition name='advanced'>
          <div v-show="!hide" class="search-advanced-wrapper">
            <SearchInput v-bind:key="item.key" v-for="item in searchItem" v-bind:name="item.name"/>
          </div>
        </transition>
      </div>
      <Button class="search-input-btn" slot="append" icon="ios-search"></Button>
    </Input>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Input, Button } from 'view-design';
import SearchInput from './SearchInput.vue';

export default Vue.extend({
  name: 'Search',
  components: {
    Input,
    Button,
    SearchInput,
    // Icon,
  },
  methods: {
    handleAdvancedBtnClick() {
      this.hide = !this.hide;
    },
  },
  data() {
    return {
      hide: true,
      searchItem: [{
        key: 'product',
        name: '产品',
      }, {
        key: 'criteria',
        name: '伤害事件',
      }, {
        key: 'content',
        name: '全文',
      }, {
        key: 'name',
        name: '案件名称',
      }, {
        key: 'litigant',
        name: '当事人',
      }, {
        key: 'court',
        name: '法院',
      }, {
        key: 'type',
        name: '案件类型',
      }],
    };
  },
});

</script>

<style lang="less">
.search-wrapper {
  margin: 20px 20%;
  // width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  .search-input {
    .search-advanced-wrapper {
      display: flex;
      flex-wrap: wrap;
      width: 530px;
      position: absolute;
      background: #f8f8f9;
      z-index: 10;
      left: 0;
      top: 40px;
      border: 1px solid rgb(214, 214, 214);
      border-radius: 2px;
    }
  }

  .search-input-btn {
    // margin: 0 20px;
  }
  .search-input-advanced-btn {
    .ivu-icon {
      transition: all ease 0.3s;
    }
    &.show-advanced .ivu-icon {
      transform: rotate(180deg);
    }

    .search-input-advanced-btn-arrow {
      margin: 0 -4px 0 4px;
    }
    span {
      display: inline-block;
      text-overflow: ellipsis;
      max-width: 200px;
    }
  }
}

.search-advanced-form {
  position: absolute;
}

.advanced-enter-active, .advanced-leave-active {
  transition: all ease 0.3s;
}
.advanced-enter, .advanced-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
</style>

<template>
  <div class="search-wrapper">
    <Input @on-enter="handleSearch" placeholder="请输入查询内容..."
      autofocus v-model="searchItem.content.value"
      size="large" class="search-input">
      <div class="search-input-wrapper" slot="prepend">
        <Button
          @click="toggleAdvancedSearch"
          type="primary"
          icon="ios-arrow-down"
          :class="['search-input-advanced-btn', { 'show-advanced': !hide }]"
        >
          <span>高级搜索</span>
        </Button>
        <transition name="advanced">
          <div v-show="!hide" class="search-advanced-wrapper">
            <div class="search-advanced-input-list">
              <SearchInput
                v-model="item.value"
                v-bind:key="key"
                v-for="(item, key) in searchItem"
                v-bind:name="item.name"
              />
            </div>
            <div>
              <button @click="handleSearch" class="advanced-search-btn btn-error">检索</button>
              <button @click="handleReset" class="advanced-search-btn btn-primary">重置</button>
            </div>
          </div>
        </transition>
      </div>
      <Button @click="handleSearch" class="search-input-btn" slot="append"
        icon="ios-search"></Button>
    </Input>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Input, Button } from 'view-design';
import SearchInput from './SearchInput.vue';
import _ from 'lodash';
import Constants from '../store/constants';

export default Vue.extend({
  name: 'Search',
  components: {
    Input,
    Button,
    SearchInput
    // Icon,
  },
  methods: {
    // handleAdvancedBtnClick() {
    //   this.$data.hide = !this.$data.hide;
    // },
    // handleAdvancedSearchBlur() {
    //   this.$data.hide = !this.$data.hide;
    // },
    toggleAdvancedSearch() {
      this.$data.hide = !this.$data.hide;
    },
    handleSearch: _.throttle(function (this: any) {
      this.$data.hide = true;
      this.$store.dispatch(Constants.action.GET_DOC_LIST);
    }, 100),
    handleReset() {
      this.$store.commit(Constants.mutation.RESET_SEARCH_FIELD);
    }
  },
  computed: {
    searchItem() {
      let { searchItem } = this.$store.state;
      searchItem = _.omitBy(searchItem, item => item.search === false);
      return searchItem;
    },
  },
  data() {
    return {
      hide: true
    };
  },
  watch: {
    searchItem: {
      handler: function handleSearchItemUpdate(searchItem) {
        const searchPayload: Record<string, any> = {};
        _.forEach(searchItem, (value, key) => {
          searchPayload[key] = value.value;
        });
        (this as any).$store.commit(Constants.mutation.UPDATE_SEARCH_PAYLOAD, searchPayload);
      },
      deep: true
    }
  }
});
</script>

<style lang="less">
.search-wrapper {
  margin: 20px 20% 50px;
  // width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  .search-input {
    .search-advanced-wrapper {
      width: 530px;
      position: absolute;
      background: #f8f8f9;
      z-index: 10;
      left: 0;
      top: 40px;
      border: 1px solid rgb(214, 214, 214);
      border-radius: 2px;

      .search-advanced-input-list {
        display: flex;
        flex-wrap: wrap;
        padding-top: 12px;
      }
    }
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

.advanced-enter-active,
.advanced-leave-active {
  transition: all ease 0.3s;
}
.advanced-enter,
.advanced-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
.advanced-search-btn {
  margin: 10px 4px;
}
</style>

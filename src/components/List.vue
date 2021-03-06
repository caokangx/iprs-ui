<template>
  <div class="page-wrapper">
    <Search class="search-area"></Search>
    <TokenContainer
      class="token-container"
      @on-close="handleTokenDelete"
      :tokens="tokens"
    ></TokenContainer>
    <Table
      :loading="searchingFlag"
      highlight-row
      stripe
      max-height="520"
      :columns="docColumns"
      :data="docList"
    >
      <template slot-scope="{ row }" slot="name">
        <Tooltip transfer placement="right" :content="row.name">
          <a class="case-name" target="_blank" :href="docUrl(row.docId)">{{ row.name }}</a>
        </Tooltip>
      </template>
      <template slot-scope="{ row }" slot="publishDate">
        <p>{{ publishDate(row.publishDate) }}</p>
      </template>
      <template slot-scope="{ row }" slot="productList">
        <Button type="primary" @click="handleProdContextBtnClick(row.prodList)">
          点击查看
        </Button>
      </template>
    </Table>
    <div class="pagination-wrapper">
      <Page
        @on-change="handleChangePage"
        show-total
        transfer
        :current="pagination.pageNumber"
        :total="pagination.count"
      ></Page>
    </div>
    <Drawer width="40" v-model="showDrawer">
      <Table :columns="prodColumns" :data="prodList">
        <div slot="product" slot-scope="{ row }">
          {{ row.context }}
        </div>
      </Table>
    </Drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Table, Tooltip, Page, Drawer, Button
} from 'view-design';
import Search from './Search.vue';
import _ from 'lodash';
import moment from 'moment';
import Constants from '../store/constants';
import { TimeStamp } from '../schema';
import TokenContainer from './token/TokenContainer.vue';

// function getEmptySearchPayload() {

// }
interface ListPageData {
  prodColumns: Array<any>;
  prodList: Array<any>;
  showDrawer: boolean;
}

export default Vue.extend({
  name: 'List',
  props: {
    msg: String
  },
  components: {
    Table,
    Search,
    Tooltip,
    Page,
    Drawer,
    Button,
    TokenContainer
  },
  data() {
    return {
      prodColumns: [
        {
          slot: 'product',
          title: '产品上下文'
        }
      ],
      prodList: [],
      showDrawer: false
    };
  },
  methods: {
    docUrl(docId: string) {
      return `http://wenshu.court.gov.cn/website/wenshu/181107ANFZ0BXSK4/index.html?docId=${docId}`;
    },
    publishDate(date: TimeStamp) {
      return moment(date).format('YYYY-MM-DD');
    },
    handleChangePage(newPageNumber: number) {
      this.$store.commit(Constants.mutation.CHANGE_PAGE_NUMBER, newPageNumber);
      this.$store.dispatch(Constants.action.GET_DOC_LIST);
    },
    handleProdContextBtnClick(prodList: Array<any>): void {
      (this as any).showDrawer = true;
      (this as any).prodList = prodList;
    },
    handleTokenDelete(data = {}) {
      this.$store.commit(Constants.mutation.DELETE_SEARCH_ITEM_VALUE, data);
    }
  },
  computed: {
    docColumns() {
      const { searchItem } = this.$store.state;
      const docColumns: object[] = [];

      _.forEach(searchItem, (item, key) => {
        let pushItem;
        if (item.show) {
          pushItem = {
            key,
            title: item.name
          };
          if (item.slot) {
            // eslint-disable-next-line
            pushItem = Object.assign(pushItem, {
              slot: item.slot
            });
          }
          if (item.sortable) {
            pushItem = Object.assign(pushItem, {
              slot: item.slot
            });
          }
          docColumns.push(pushItem);
        }
      });

      return docColumns;
    },
    docList() {
      return this.$store.state.docList;
    },
    searchingFlag() {
      return this.$store.state.searchingFlag;
    },
    pagination() {
      return this.$store.state.pagination;
    },
    tokens() {
      let { searchItem } = this.$store.getters;
      searchItem = _.omitBy(searchItem, item => _.isEmpty(item.value));
      return searchItem;
    }
  },
  mounted() {
    this.$store.dispatch(Constants.action.GET_DOC_LIST);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.page-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;

  .token-container {
    min-height: 45px;
    padding-bottom: 5px;
  }

  .case-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .pagination-wrapper {
    margin: 20px 0;
    margin-top: auto;
  }
}
</style>

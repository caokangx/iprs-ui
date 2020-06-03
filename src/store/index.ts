import Vue from 'vue';
import Vuex from 'vuex';
import { AppState } from './types';
import emptyDocField from '../config/doc-field';
import emptyQueryField from '../config/query-field';
import { getDoc } from '@/service';
import Constants from './constants';
import _ from 'lodash';
import emptyPagination from '@/config/pagination';
import emptyError from '@/config/error';
import { processDate } from './utils';

Vue.use(Vuex);


export default new Vuex.Store<AppState>({
  state: {
    searchItem: _.cloneDeep(emptyDocField),
    query: _.cloneDeep(emptyQueryField),
    docList: [],
    searchingFlag: false,
    searchFieldChange: false,
    pagination: emptyPagination,
    error: emptyError,
  },
  getters: {
    searchItem(state) {
      let { searchItem } = state;
      searchItem = _.omitBy(searchItem, item => item.search === false);
      return searchItem;
    }
  },
  mutations: {
    [Constants.mutation.DELETE_SEARCH_ITEM_VALUE](state, payload: Record<string, any>) {
      state.searchItem[payload.key].value = null;
    },
    [Constants.mutation.UPDATE_SEARCH_PAYLOAD](state, payload: Record<string, any>) {
      state.query = {
        ...state.query,
        ...payload
      };
      state.searchFieldChange = true;
    },
    [Constants.mutation.UPDATE_DOC_LIST_SUCCESS](state, { docList, pagination }) {
      state.docList = docList;
      state.pagination = pagination;
      state.searchFieldChange = false;
    },
    [Constants.mutation.RESET_SEARCH_FIELD](state) {
      state.query = _.cloneDeep(emptyQueryField);
      state.searchItem = _.cloneDeep(emptyDocField);
    },
    [Constants.mutation.UPDATE_DOC_LIST_START](state) {
      state.searchingFlag = true;
    },
    [Constants.mutation.UPDATE_DOC_LIST_FAILED](state) {
      state.searchingFlag = false;
    },
    [Constants.mutation.TOGGLE_SEARCHING_FLAG](state) {
      state.searchingFlag = !state.searchingFlag;
    },
    [Constants.mutation.CHANGE_PAGE_NUMBER](state, newPageNumber) {
      state.pagination.pageNumber = newPageNumber;
    },
    [Constants.mutation.SERVICE_ERROR_OCCURED](state, error) {
      state.error = {
        ...error,
        hasError: true
      };
    },
    [Constants.mutation.SERVICE_ERROR_RESET](state) {
      state.error = {
        hasError: false
      };
    }
  },
  actions: {
    async [Constants.action.GET_DOC_LIST]({ commit, state, dispatch }, payload) {
      commit(Constants.mutation.TOGGLE_SEARCHING_FLAG);

      const publishDate = processDate(state.query.publishDate);
      const pagination = state.searchFieldChange ? emptyPagination : state.pagination;
      try {
        const data = await getDoc({
          query: {
            ...state.query,
            publishDate
          },
          pagination,
          ...payload,
        });
        commit(Constants.mutation.UPDATE_DOC_LIST_SUCCESS, data);
        commit(Constants.mutation.TOGGLE_SEARCHING_FLAG);
      } catch (error) {
        const {
          response: {
            data = {}
          } = {}
        } = error;
        commit(Constants.mutation.TOGGLE_SEARCHING_FLAG);
        dispatch(Constants.action.SERVICE_ERROR_OCCURED, data);
      }
    },
    async [Constants.action.SERVICE_ERROR_OCCURED]({ commit }, payload) {
      commit(Constants.mutation.SERVICE_ERROR_OCCURED, payload);

      setTimeout(() => {
        commit(Constants.mutation.SERVICE_ERROR_RESET);
      }, 10);
    }
  },
  modules: {
  },
});

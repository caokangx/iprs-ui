import Vue from 'vue';
import Vuex from 'vuex';
import { AppState } from './types';
import emptyDocField from '../config/doc-field';
import emptyQueryField from '../config/query-field';
import { getDoc } from '@/service';
import Constants from './constants';
import _ from 'lodash';
import emptyPagination from '@/config/pagination';

Vue.use(Vuex);


export default new Vuex.Store<AppState>({
  state: {
    searchItem: _.cloneDeep(emptyDocField),
    query: _.cloneDeep(emptyQueryField),
    docList: [],
    searchingFlag: false,
    pagination: emptyPagination
  },
  mutations: {
    [Constants.mutation.UPDATE_SEARCH_PAYLOAD](state, payload: Record<string, any>) {
      state.query = {
        ...state.query,
        ...payload
      };
    },
    [Constants.mutation.UPDATE_DOC_LIST_SUCCESS](state, { docList, pagination }) {
      state.docList = docList;
      state.pagination = pagination;
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
    }
  },
  actions: {
    async [Constants.action.GET_DOC_LIST]({ commit, state }, payload) {
      commit(Constants.mutation.TOGGLE_SEARCHING_FLAG);

      try {
        const data = await getDoc({
          query: {
            ...state.query,
          },
          pagination: state.pagination,
          ...payload,
        });
        commit(Constants.mutation.UPDATE_DOC_LIST_SUCCESS, data);
        commit(Constants.mutation.TOGGLE_SEARCHING_FLAG);
      } catch (error) {
        commit(Constants.mutation.TOGGLE_SEARCHING_FLAG);
      }
    }
  },
  modules: {
  },
});

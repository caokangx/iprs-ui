export default {
  name: {
    name: '案件名称',
    value: '',
    show: true,
    search: true,
    slot: 'name',
  },
  product: {
    name: '产品',
    value: '',
    show: true,
    search: true,
    sortable: true
  },
  criteria: {
    name: '伤害关键词',
    value: '',
    show: true,
    search: true,
    sortable: true
  },
  content: {
    name: '全文',
    value: '',
    show: false,
    search: true
  },
  litigant: {
    name: '当事人',
    value: '',
    show: false,
    search: true
  },
  court: {
    name: '法院',
    value: '',
    show: true,
    search: true
  },
  type: {
    name: '案件类型',
    value: '',
    show: true,
    search: true
  },
  causeOfAction: {
    name: '案由',
    value: '',
    show: true,
    search: false
  },
  prodList: {
    name: '产品型号列表',
    value: '',
    show: true,
    search: false,
    slot: 'productList'
  },
};

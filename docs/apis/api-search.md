### Search API, 用于搜索伤害文书列表

### Request:
``` 
{
  query: {
    content?: String,
    name?: String,
    court?: String,
    type?: String,
    causeOfAction?: String,
    processing?: String,
    date?: {
      start?: TimeStamp,
      end?: TimeStamp,
    },
    litigant?: String,
    product?: String,
    criteria?: String,
  },
  pagination: {
    start: Number,
    pageSize: Number
  }
}
```

### Response:
``` 
{
  docList: [{
    docId: String,
    url: String,
    name: String,
    court: String,
    type: String,
    causeOfAction: String,
    processing: String,
    litigant: String,
    product: String,
    criteria: String,
    publishDate: TimeStamp,
    prodList: [{
      context: String,

    }],
    prodInfo: {
      // TODO: 暂时先留个口子
    }
  }],
  pagination: {
    start: Number,
    pageSize: Number,
    total: Number,
  }
}
```
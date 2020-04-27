import { TimeStamp } from '../base';

export interface SearchApiRequest {
  query: {
    content?: string;
    name?: string;
    court?: string;
    type?: string;
    causeOfAction?: string;
    processing?: string;
    date?: {
      start?: TimeStamp;
      end?: TimeStamp;
    };
    litigant?: string;
    product?: string;
    criteria?: string;
  };
  pagination: Pagination;
}

export interface SearchApiResponse {
  docList: Array<JudgementDocInfo>;
  pagination: Pagination;
}

export interface JudgementDocInfo {
  docId: string;
  url: string;
  name: string;
  court: string;
  type: string;
  causeOfAction: string;
  processing: string;
  litigant: string;
  product: string;
  criteria: string;
  publishDate: TimeStamp;
  prodList: [{
    context: string;
  }];
  // 留个口子
  // prodInfo: ProductInfo
}

interface Pagination {
  start: number;
  pageSize: number;
  total?: number;
}
// interface ProductInfo {

// }

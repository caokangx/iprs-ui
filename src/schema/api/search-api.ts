import { TimeStamp } from '../base';

export interface SearchApiRequest {
  query: {
    content?: string;
    name?: string;
    court?: string;
    type?: string;
    causeOfAction?: string;
    processing?: string;
    publishDate?: {
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
  url?: string;
  name: string;
  content: string;
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

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  count?: number;
}
// interface ProductInfo {

// }

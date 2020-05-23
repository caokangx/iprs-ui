import { JudgementDocInfo, Pagination } from '@/schema';

export interface AppState {
    query: any;
    searchItem: Record<string, any>;
    docList: JudgementDocInfo[];
    searchingFlag: boolean;
    pagination: Pagination;
  }

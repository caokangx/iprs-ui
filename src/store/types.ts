import { JudgementDocInfo, Pagination } from '@/schema';
import { Error } from '@/schema/error';

export interface AppState {
    query: any;
    searchItem: Record<string, any>;
    docList: JudgementDocInfo[];
    searchingFlag: boolean;
    searchFieldChange: boolean;
    pagination: Pagination;
    error: Error;
  }

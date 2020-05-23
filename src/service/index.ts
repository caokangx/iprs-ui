import Service from './requests';
import { DATA_ANALYSIS_FILE_UPLOAD_URL, GET_DOC_URL } from './constants';
import { SearchApiRequest, SearchApiResponse } from '@/schema';

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('uploadedFile', file);

  const { data } = await Service.post(DATA_ANALYSIS_FILE_UPLOAD_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });

  return data;
}

export async function getDoc(request: SearchApiRequest) {
  const {
    data: {
      data
    }
  } = await Service.post<typeof request, SearchApiResponse>(GET_DOC_URL, request);

  return data;
}

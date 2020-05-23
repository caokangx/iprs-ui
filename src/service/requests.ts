import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiMessage } from '@/schema';

const baseRequestConfig: Record<string, any> = {
  method: 'get',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-type': 'application/json;charset=utf-8',
  },
};

async function get<Req, Res>(url: string, params?: Req, config?: Record<string, any>) {
  const result = await axios.get<Req, AxiosResponse<ApiMessage<Res>>>(url, {
    ...baseRequestConfig,
    ...config,
    params,
  } as AxiosRequestConfig);
  return result;
}

async function post<Req, Res>(url: string, data?: Req, config?: Record<string, any>) {
  const result = await axios.post<Req, AxiosResponse<ApiMessage<Res>>>(url, data, {
    ...baseRequestConfig,
    ...config,
  } as AxiosRequestConfig);
  return result;
}

async function put<Req, Res>(url: string, data?: Record<string, any>,
  config?: Record<string, any>) {
  const result = await axios.put<Req, AxiosResponse<ApiMessage<Res>>>(url, data, {
    ...baseRequestConfig,
    ...config,
  } as AxiosRequestConfig);
  return result;
}

export default {
  get,
  post,
  put,
};

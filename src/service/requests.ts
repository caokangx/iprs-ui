import axios, { AxiosRequestConfig } from 'axios';

const baseRequestConfig: Record<string, any> = {
  method: 'get',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-type': 'application/json;charset=utf-8',
  },
};

async function get(url: string, param?: Record<string, any>) {
  const result = await axios({
    ...baseRequestConfig,
    url,
    param,
  } as AxiosRequestConfig);
  return result;
}

async function post(url: string, param?: Record<string, any>) {
  const result = await axios({
    ...baseRequestConfig,
    method: 'post',
    url,
    param,
  } as AxiosRequestConfig);
  return result;
}

async function put(url: string, param?: Record<string, any>) {
  const result = await axios({
    ...baseRequestConfig,
    method: 'put',
    url,
    param,
  } as AxiosRequestConfig);
  return result;
}

export default {
  get,
  post,
  put,
};

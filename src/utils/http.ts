import { HttpMethod, Result } from '@/interface/base';
import _ from 'lodash';
import * as pathToRegexp from 'path-to-regexp';
import axios from 'axios';
import { message } from 'antd';
import { getToken } from './userToken';

export interface Options {
  url: string;
  method: HttpMethod;
  data?: any;
  params?: any;
  headers?: any;
  cancelToken?: any;
  responseType?: string;
}

axios.defaults.timeout = 10 * 1000;

// use(两个参数)
axios.interceptors.request.use(
  (req: any) => {
    // 在发送请求前要做的事儿
    req.headers['Authorization'] = `Bearer ${getToken()}`; //JWT固定格式
    return req;
  },
  (err) => {
    // 在请求错误时要做的事儿
    // 该返回的数据则是axios.catch(err)中接收的数据
    return Promise.reject(err);
  },
);

//响应拦截器
axios.interceptors.response.use(
  (res) => {
    const resData = (res.data || {}) as Result<any>;
    const { code, data, messages } = resData;
    if (code !== 200) {
      if (messages) {
        message.error(messages);
      }
      throw new Error(messages);
    }
    return data as any;
  },
  (err) => {
    //统一异常提示
    return err;
  },
);

export async function request<R extends any>(name: string, options: Options): Promise<R> {
  const { method = 'get', data, params, headers, cancelToken, responseType } = options;
  let url: string = options.url;
  // if (!_.startsWith(url, 'http')) {
  //    url = baseURL + url
  // }
  // 跨域设置
  const withCredentials = true;
  const cloneParams = _.cloneDeep(params);

  // 解析URl并将params中的数据填充到URL中
  try {
    const domainReg = new RegExp(/[a-zA-Z]+:\/\/[^/]*/);
    let domain = '';
    if (domainReg.test(url)) {
      domain = domainReg.exec(url)?.[0] || '';
      url = url.slice(domain.length);
    }

    const match = pathToRegexp.parse(url);
    params && (url = pathToRegexp.compile(url)(params));
    for (const item of match) {
      item instanceof Object &&
        cloneParams &&
        item.name in cloneParams &&
        delete cloneParams[item.name];
    }
    url = domain + url;
  } catch (e: any) {
    console.log(url, '请求参数错误：', e.message);
  }

  const realOptions: any = {
    method,
    url,
    params: cloneParams,
    data,
    withCredentials,
    responseType,
  };

  if (cancelToken) {
    realOptions.cancelToken = cancelToken;
  }

  const jsonHeader = {
    'Content-Type': 'application/json',
  };
  realOptions.headers = _.merge(jsonHeader, headers);
  try {
    const data: any = await axios(realOptions);
    return data;
  } catch (error: any) {
    return error;
  }
}

export const Get = async <T>(url: string, params: any = {}) => {
  return request<T>('', { url, params, method: HttpMethod.GET });
};

export const Post = async <T>(url: string, params: any = {}, data: any = {}) => {
  return request<T>('', { url, params, data, method: HttpMethod.POST });
};

export const Put = async <T>(url: string, params: any = {}, data: any = {}) => {
  return request<T>('', { url, params, data, method: HttpMethod.PUT });
};

export const Delete = async <T>(url: string, params: any = {}) => {
  return request<T>('', { url, params, method: HttpMethod.DELETE });
};

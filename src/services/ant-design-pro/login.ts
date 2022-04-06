// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** login  login  POST /login */
export async function login(body: API.loginReq, options?: { [key: string]: any }) {
  return request<API.loginRes>(`/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 验证码  获取验证码  POST /verify */
export async function verify(options?: { [key: string]: any }) {
  return request<any>(`/api/verify`, {
    method: 'POST',
    ...(options || {}),
  });
}

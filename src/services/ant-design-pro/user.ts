// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取用户列表  通过条件查询获取用户列表  POST /user/getList */
export async function getList(body: API.userListReq, options?: { [key: string]: any }) {
  return request<API.userListRes>(`/api/user/getList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户详情  通过用户ID获取用户详情  POST /user/getInfo/${param0} */
export async function getInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.controllerUserGetInfoParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.userInfoRes>(`/api/user/getInfo/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 新建用户  新建用户  POST /user/create */
export async function create(body: API.userListReq, options?: { [key: string]: any }) {
  return request<API.resBase>(`/api/user/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑用户  编辑用户  POST /user/update */
export async function update(body: API.userListReq, options?: { [key: string]: any }) {
  return request<API.resBase>(`/api/user/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户  删除用户  POST /user/destroy/${param0} */
export async function destroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.controllerUserDestroyParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.resBase>(`/api/user/destroy/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

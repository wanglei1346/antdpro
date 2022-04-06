// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取文章列表  通过条件查询获取文章列表  POST /article/getList */
export async function getList(body: API.articleListReq, options?: { [key: string]: any }) {
  return request<API.articleListRes>(`/api/article/getList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文章详情  通过文章ID获取文章详情  POST /article/getInfo/${param0} */
export async function getInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.controllerArticleGetInfoParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.articleInfoRes>(`/api/article/getInfo/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 新建文章  新建文章  POST /article/create */
export async function create(body: API.articleCreateReq, options?: { [key: string]: any }) {
  return request<API.resBase>(`/api/article/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑文章  编辑文章  POST /article/update */
export async function update(body: API.articleUpdateReq, options?: { [key: string]: any }) {
  return request<API.resBase>(`/api/article/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除文章  通过文章ID删除文章  POST /article/destroy/${param0} */
export async function destroy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.controllerArticleDestroyParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.resBase>(`/api/article/destroy/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

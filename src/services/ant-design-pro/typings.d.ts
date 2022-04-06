declare namespace API {
  type articleInfo = {
    /** 文章ID */
    id?: number;
    /** 文章标题 */
    title?: string;
    /** 文章状态 */
    state?: number;
    /** 文章内容 */
    content?: string;
    /** 文章作者名称 */
    cnName?: string;
  };

  type articleItem = {
    /** 文章ID */
    id?: number;
    /** 文章标题 */
    title?: string;
    /** 文章状态 */
    state?: number;
    /** 文章作者名称 */
    cnName?: string;
    /** 文章发表时间 */
    createdAt?: string;
  };

  type articleList = {
    /** 列表总数 */
    count?: number;
    /** 当前页码 */
    pageNum?: number;
    /** 当前页条数 */
    pageSize?: number;
    data?: articleItem[];
  };

  type loginInfo = {
    /** 用户ID */
    id?: number;
    /** 账号 */
    userName?: string;
    /** 用户名称 */
    cnName?: string;
    /** 邮箱 */
    email?: string;
    /** 性别 1男 2女 */
    gender?: number;
    /** 地址 */
    address?: string;
    /** 手机号 */
    mobile?: string;
    /** 注册时间 */
    createdAt?: string;
    /** token */
    token?: string;
  };

  type page = {
    /** 列表总数 */
    count?: number;
    /** 当前页码 */
    pageNum?: number;
    /** 当前页条数 */
    pageSize?: number;
  };

  type user = {
    /** 用户ID */
    id?: number;
    /** 用户账号 */
    userName?: string;
    /** 用户名称 */
    cnName?: string;
    /** 用户邮箱 */
    email?: string;
    /** 用户性别 */
    gender?: number;
    /** 用户地址 */
    address?: string;
    /** 用户地址编号 */
    addressCodes?: string;
    /** 用户手机号 */
    mobile?: string;
    /** 用户状态 */
    state?: number;
    /** 创建时间 */
    createdAt?: string;
  };

  type userList = {
    /** 列表总数 */
    count?: number;
    /** 当前页码 */
    pageNum?: number;
    /** 当前页条数 */
    pageSize?: number;
    data?: user[];
  };

  type articleListReq = {
    /** 当前页码 */
    pageNum?: number;
    /** 每页条数 */
    pageSize?: number;
    /** 作者名称 */
    cnName?: string;
    /** 文章标题 */
    title?: string;
    /** 开始时间 */
    createDate?: string;
    /** 结束时间 */
    endDate?: string;
  };

  type articleCreateReq = {
    /** 文章标题 */
    title?: string;
    /** 文章内容 */
    content?: string;
  };

  type articleUpdateReq = {
    /** 文章ID */
    id?: number;
    /** 文章标题 */
    title?: string;
    /** 文章内容 */
    content?: string;
  };

  type loginReq = {
    /** 账号 */
    userName?: string;
    /** 密码 */
    password?: string;
    /** 验证码 */
    verifyCode?: string;
  };

  type userListReq = {
    /** 当前页码 */
    pageNum?: number;
    /** 每页条数 */
    pageSize?: number;
    /** 用户名称 */
    cnName?: string;
    /** 用户账号 */
    userName?: string;
    /** 用户状态 */
    state?: number;
    /** 用户性别 */
    gender?: number;
    /** 开始时间 */
    createDate?: string;
    /** 结束时间 */
    endDate?: string;
  };

  type articleInfoRes = {
    /** 响应code */
    code?: number;
    /** 响应描述 */
    message?: string;
    /** 是否成功 */
    success?: boolean;
    data?: articleInfo;
  };

  type articleListRes = {
    /** 响应code */
    code?: number;
    /** 响应描述 */
    message?: string;
    /** 是否成功 */
    success?: boolean;
    data?: articleList;
  };

  type loginRes = {
    /** 响应code */
    code?: number;
    /** 响应描述 */
    message?: string;
    /** 是否成功 */
    success?: boolean;
    data?: loginInfo;
  };

  type resBase = {
    /** 响应code */
    code?: number;
    /** 响应描述 */
    message?: string;
    /** 是否成功 */
    success?: boolean;
  };

  type userInfoRes = {
    /** 响应code */
    code?: number;
    /** 响应描述 */
    message?: string;
    /** 是否成功 */
    success?: boolean;
    data?: user;
  };

  type userListRes = {
    /** 响应code */
    code?: number;
    /** 响应描述 */
    message?: string;
    /** 是否成功 */
    success?: boolean;
    data?: userList;
  };

  type controllerArticleGetInfoParams = {
    /** 文章ID  */
    id: number;
  };

  type controllerArticleDestroyParams = {
    /** 文章ID  */
    id: number;
  };

  type controllerUserGetInfoParams = {
    /** 用户ID  */
    id: number;
  };

  type controllerUserDestroyParams = {
    /** 用户ID  */
    id: number;
  };
}

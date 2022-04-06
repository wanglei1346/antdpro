import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import defaultSettings from '../config/defaultSettings';
import { message } from 'antd';

const loginPath = '/login';
// 请求拦截器
const requestInterceptor = (url: string, options: any) => {
  const token = JSON.parse(sessionStorage.getItem('userInfo') || '{}').token;
  if (token) {
    options.headers.Authorization = token;
  }
  return options;
};
// 响应拦截器
const responseInterceptor = async (response: any) => {
  // const res = await response.clone().json();
  // const { code, message: msg } = res;
  // console.log(res, response);
  // if (code === 401) {
  //   message.error(msg);
  //   history.push(loginPath);
  // }
  return response;
};
// 错误处理
const errorHandler = (error: any) => {
  if (error.name === 'BizError') {
    if (error.data.code === 30001 || error.data.code === 30002) {
      history.push(loginPath);
    }
    if (error.response.message) {
      message.error({
        content: error.response.message,
        key: 'process',
        duration: 3,
      });
    } else {
      message.error({
        content: error.message,
        key: 'process',
        duration: 3,
      });
    }
  }
  if (error.name === 'ResponseError') {
    message.error({
      content: `${error.response.status}${error.response.statusText}`,
      key: 'process',
      duration: 3,
    });
  }
  if (error.name === 'TypeError') {
    message.error({
      content: 'Network error.Please try again',
      key: 'process',
      duration: 3,
    });
  }
  return Promise.resolve(error.response);
};

export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor],
};

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  loading?: boolean;
}> {
  return {
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: undefined,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {},
    menuHeaderRender: undefined,

    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

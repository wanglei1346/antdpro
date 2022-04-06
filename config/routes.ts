export default [
  {
    name: 'login',
    path: '/login',
    layout: false,
    component: './Login',
    hideInMenu: true,
  },
  {
    name: 'overview',
    path: '/overview',
    component: './Overview',
    icon: 'home',
  },
  {
    name: 'article',
    path: '/article',
    component: './Article',
    icon: 'table',
  },
  {
    name: 'article.add',
    path: '/article/add',
    component: './Article/Detail',
    hideInMenu: true,
  },
  {
    name: 'article.edit',
    path: '/article/edit/:id',
    component: './Article/Detail',
    hideInMenu: true,
  },
  {
    name: 'user',
    path: '/user',
    component: './User',
    icon: 'user',
  },
  {
    name: 'user.add',
    path: '/user/add',
    component: './User/Detail',
    hideInMenu: true,
  },
  {
    name: 'user.edit',
    path: '/user/edit/:id',
    component: './User/Detail',
    hideInMenu: true,
  },
  {
    name: 'role',
    path: '/role',
    component: './Role',
    icon: 'user',
  },
  {
    path: '/',
    redirect: '/overview',
  },
  {
    component: './404',
  },
];

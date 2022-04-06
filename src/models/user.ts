import { useState } from 'react';
export default () => {
  const [user, setUser] = useState(sessionStorage.getItem('userInfo') || '{}');
  const userInfo = JSON.parse(user);
  const setUserInfo = (info: any) => {
    sessionStorage.setItem('userInfo', JSON.stringify(info));
    setUser(JSON.stringify(info));
  };
  return {
    userInfo,
    setUserInfo,
  };
};

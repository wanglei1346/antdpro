import { useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import { Card, Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, VerifiedOutlined } from '@ant-design/icons';
import { verify, login } from '@/services/ant-design-pro/login';
import styles from './index.less';
const Login = () => {
  // 验证码地址
  const [verifyUrl, setVerifUrl] = useState('');

  // 存储用户信息dva
  const { setUserInfo } = useModel('user');

  // 获取验证码
  const getVerify = async () => {
    const url = await verify();
    setVerifUrl(url);
  };

  // 初始化数据
  useEffect(() => {
    getVerify();
  }, []);

  // 登录
  const onFinish = async (values: API.loginReq) => {
    const { data, success } = await login({ ...values });
    if (success) {
      // 登录成功后存储用户信息以及token
      setUserInfo(data as API.loginInfo);
      history.push('/');
    }
  };
  return (
    <div className={styles.container}>
      <Card
        hoverable
        className={styles.card}
        bordered
        title="后台管理系统"
        headStyle={{ borderBottom: 'none', textAlign: 'center', fontSize: '26px', color: '#fff' }}
      >
        <Form name="normal_login" className={styles.login_from} onFinish={onFinish}>
          <Form.Item name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              style={{ color: '#fff' }}
              placeholder="请输入用户名"
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              style={{ color: '#fff' }}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item name="verifyCode" rules={[{ required: true, message: '请输入验证码' }]}>
            <Row>
              <Col span={16}>
                <Input
                  prefix={<VerifiedOutlined className="site-form-item-icon" />}
                  style={{ color: '#fff' }}
                  placeholder="请输入验证码"
                />
              </Col>
              <Col span={8}>
                <div
                  className={styles.verify}
                  dangerouslySetInnerHTML={{ __html: verifyUrl }}
                  onClick={getVerify}
                ></div>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { offset: 0, span: 4 },
              md: { offset: 4, span: 16 },
              xl: { offset: 10, span: 4 },
            }}
          >
            <Button type="primary" htmlType="submit" className={styles.login_btn}>
              登 录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

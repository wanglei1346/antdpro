import { useEffect } from 'react';
import { history, useRouteMatch } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Input, Button, Card, Select, Cascader, Space, message } from 'antd';
import { create, getInfo, update } from '@/services/ant-design-pro/user';
import { city, ICity } from './city';
const validateMessages = {
  required: '请输入 ${label}',
  types: {
    email: '${label} 格式不正确，请重新输入',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
const Edit = () => {
  const layout = {
    labelCol: { xs: { span: 4, offset: 0 }, sm: { span: 4, offset: 6 } },
    wrapperCol: { xs: { span: 6 }, sm: { span: 10 } },
  };
  const { path, params } = useRouteMatch<{ id: string }>();
  const [form] = Form.useForm();
  const isEdit = path === '/user/edit/:id';
  if (isEdit) {
    if (!params.id) {
      message.error('参数错误');
      history.push('/user');
    } else {
      const getUserInfo = async () => {
        const { data, success } = await getInfo({ id: Number(params.id) });
        if (success) {
          form.setFieldsValue({ ...data, addressCodes: JSON.parse(data?.addressCodes as string) });
        }
      };
      useEffect(() => {
        getUserInfo();
      }, []);
    }
  }

  // 通过addressCodes获取省市区名称
  const getAddress = (addressCodes: Array<string>) => {
    const [provinceCode, cityCode, countyCode] = addressCodes;
    const province = city.find((item) => item.value === provinceCode);
    const { label: provinceLabel, children: citys } = province as ICity;
    const cityItem = citys.find((item) => item.value === cityCode);
    const { label: cityLabel, children: countys } = cityItem as ICity;
    const countyItem = countys.find((item) => item.value === countyCode);
    const { label: countyLabel } = countyItem as ICity;
    return `${provinceLabel}${cityLabel}${countyLabel}`;
  };
  const onFinish = async (values: any) => {
    const address = getAddress(values.addressCodes);
    // 判断是否是编辑
    if (!isEdit) {
      const { success } = await create({
        ...values,
        address,
        addressCodes: JSON.stringify(values.addressCodes),
      });
      if (success) {
        message.success('添加成功');
        history.goBack();
      }
    } else {
      const { success } = await update({
        id: Number(params.id),
        ...values,
        address,
        addressCodes: JSON.stringify(values.addressCodes),
      });
      if (success) {
        message.success('编辑成功');
        history.goBack();
      }
    }
  };
  return (
    <PageContainer>
      <Card>
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          validateMessages={validateMessages}
          form={form}
        >
          <Form.Item
            name={['userName']}
            label="用户账号"
            rules={[
              () => ({
                validator(_, value) {
                  if (!/^[A-Za-z0-9@_.]{4,25}$/.test(value)) {
                    return Promise.reject(
                      '账号格式错误，账号由字母、数字、“_”、“@”、“.”组成，长度4-25位',
                    );
                  }
                  return Promise.resolve();
                },
              }),
              { required: true },
            ]}
          >
            <Input placeholder="请输入用户账号" disabled={isEdit} />
          </Form.Item>
          <Form.Item
            name={['cnName']}
            label="用户名称"
            rules={[
              () => ({
                validator(_, value) {
                  if (!/^[a-zA-Z\u4e00-\u9fa5]{2,10}$/.test(value)) {
                    return Promise.reject('用户名称格式错误，用户名称由中文、英文组成，长度2-10位');
                  }
                  return Promise.resolve();
                },
              }),
              { required: true },
            ]}
          >
            <Input placeholder="请输入用户名称" />
          </Form.Item>

          <Form.Item name={['email']} label="邮箱" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item name={['addressCodes']} label="地址" rules={[{ required: true }]}>
            <Cascader options={city} placeholder="请选择地址" />
          </Form.Item>
          <Form.Item
            name={['mobile']}
            label="手机号"
            rules={[
              () => ({
                validator(_, value) {
                  if (!/^1[3|4|5|7|8]\d{9}$/.test(value)) {
                    return Promise.reject('手机号格式错误，请重新输入');
                  }
                  return Promise.resolve();
                },
              }),
              { required: true },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item name={['gender']} label="性别" rules={[{ required: true }]}>
            <Select placeholder="请选择用户性别">
              <Select.Option value={1}>男</Select.Option>
              <Select.Option value={2}>女</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={['state']} label="状态" rules={[{ required: true }]}>
            <Select placeholder="请选择用户状态">
              <Select.Option value={1}>启用</Select.Option>
              <Select.Option value={2}>禁用</Select.Option>
            </Select>
          </Form.Item>
          {!isEdit ? (
            <>
              <Form.Item
                name={['password']}
                label="密码"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (
                        !/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,15}$/.test(
                          value,
                        )
                      ) {
                        return Promise.reject('密码格式错误，密码需包含字母+数字组合，长度6-15位');
                      }
                      return Promise.resolve();
                    },
                  }),
                  { required: true },
                ]}
              >
                <Input.Password placeholder="请输入密码" />
              </Form.Item>
              <Form.Item
                name={['againPassword']}
                label="确认密码"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,15}$/.test(
                          value,
                        )
                      ) {
                        return Promise.reject('密码格式错误，密码需包含字母+数字组合，长度6-15位');
                      }
                      if (value && value !== getFieldValue('password')) {
                        return Promise.reject('两次密码输入不一致!');
                      }
                      return Promise.resolve();
                    },
                  }),
                  { required: true },
                ]}
              >
                <Input.Password placeholder="请再次输入密码" />
              </Form.Item>
            </>
          ) : null}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
              <Button
                type="default"
                onClick={() => {
                  history.goBack();
                }}
              >
                返回
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default Edit;

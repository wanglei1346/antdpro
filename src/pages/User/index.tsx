import { useEffect, useState } from 'react';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, message, Tag, Space, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Form from '@/components/Form';
import Table from '@/components/Table';
import { getList, destroy } from '@/services/ant-design-pro/user';
const User = () => {
  // 定义用户表格
  const [tableData, setTableData] = useState<API.userList>({});

  // 定义表格加载
  const [loading, setloading] = useState<boolean>(true);

  // 定义表格查询参数
  const [formParams, setFormParams] = useState<API.userListReq>({ pageNum: 1, pageSize: 10 });

  /**
   * @author wanglei<wanglei@cdtrust.com>
   * @date 2022-04-06 13:44:37
   * @description 获取用户列表
   * @param { API.userListReq } formParams 查询参数
   * @returns { Promise<void> }
   */
  const getUserList = async (formParams: API.userListReq) => {
    setloading(true);
    const { data = { data: [], count: 0, pageNum: 1, pageSize: 10 }, success } = await getList(
      formParams,
    );
    if (success) {
      setloading(false);
      setTableData(data);
    }
  };

  // 当查询参数发生变化时调用接口
  useEffect(() => {
    if (formParams) {
      getUserList(formParams);
    }
  }, [formParams]);

  // 新增用户
  const addUser = () => {
    history.push('/user/add');
  };

  // 编辑用户
  const editUser = (id: number) => {
    history.push({
      pathname: `/user/edit/${id}`,
    });
  };

  // 删除用户
  const destroyUser = (id: number) => {
    Modal.confirm({
      title: '是否删除此用户？',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return destroy({ id }).then((res) => {
          if (res.success) {
            getUserList(formParams);
            message.success('删除成功');
          }
        });
      },
    });
  };
  // 表单配置项
  const options = [
    {
      label: '用户账号',
      type: 'input',
      key: 'userName',
      placeholder: '请输入用户账号',
    },
    {
      label: '用户名称',
      type: 'input',
      key: 'cnName',
      placeholder: '请输入用户名称',
    },
    {
      label: '性别',
      type: 'select',
      key: 'gender',
      placeholder: '请选择性别',
      status: [
        {
          label: '全部',
          value: null,
        },
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
      ],
    },
    {
      label: '状态',
      type: 'select',
      key: 'state',
      placeholder: '请选择状态',
      status: [
        {
          label: '全部',
          value: null,
        },
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 2,
        },
      ],
    },
    {
      label: '创建时间',
      type: 'dateRange',
      key: 'createDate$endDate',
    },
  ];
  // 表格列配置
  const columns = [
    {
      title: '用户账号',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
    },
    {
      title: '用户名称',
      dataIndex: 'cnName',
      key: 'cnName',
      ellipsis: true,
    },

    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      ellipsis: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render(gender: number) {
        return gender === 1 ? '男' : '女';
      },
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      render(state: number) {
        return <Tag color={state === 1 ? 'green' : 'volcano'}>{state === 1 ? '启用' : '禁用'}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: API.user) => (
        <Space size="middle">
          <Button
            type="link"
            disabled={record.id === 1}
            onClick={() => editUser(record.id as number)}
          >
            编辑用户
          </Button>
          <Button
            type="link"
            disabled={record.id === 1}
            onClick={() => destroyUser(record.id as number)}
          >
            删除用户
          </Button>
        </Space>
      ),
      ellipsis: true,
    },
  ];
  // 查询表单
  const query = async (values: API.userListReq) => {
    setFormParams({ ...values, pageNum: 1 });
  };
  // 表格分页
  const pageChange = (pageNum: number, pageSize: number) => {
    setFormParams({ ...formParams, pageNum, pageSize });
  };
  return (
    <PageContainer>
      <Form options={options} query={query} />
      <Card
        hoverable
        extra={
          <Button type="primary" onClick={addUser}>
            新建用户
          </Button>
        }
        headStyle={{ borderBottom: 'none' }}
      >
        <Table
          columns={columns}
          dataSource={tableData.data as API.user[]}
          pageChange={pageChange}
          total={tableData.count as number}
          pageNum={tableData.pageNum as number}
          pageSize={tableData.pageSize as number}
          loading={loading}
        />
      </Card>
    </PageContainer>
  );
};

export default User;

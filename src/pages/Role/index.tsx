import { PageContainer } from '@ant-design/pro-layout';
import { Card, Button, Tag, TableColumnsType, Space } from 'antd';
import Form from '@/components/Form';
import Table from '@/components/Table';
const Role = () => {
  type IOptions = {
    type: string;
    label: string;
    key: string;
    placeholder?: string;
    status?: Record<string, any>[];
  };
  const options: IOptions[] = [
    {
      type: 'input',
      label: '角色名称',
      key: 'roleName',
      placeholder: '请输入角色名称',
    },
    {
      type: 'dateRange',
      label: '创建时间',
      key: 'createDate$endDate',
    },
  ];
  const query = (values: any) => {
    console.log(values);
  };
  const columns: TableColumnsType<Record<string, unknown>> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      render: (text) => <a>{text}</a>,
      ellipsis: true,
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      render: (state) => (
        <Tag color={state === 1 ? 'green' : 'volcano'}>{state === 1 ? '已发表' : '未发表'}</Tag>
      ),
      ellipsis: true,
    },
    {
      title: '发表时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record: API.articleItem) => (
        <Space size="middle">
          <a>编辑文章</a>
          <a>删除文章</a>
        </Space>
      ),
      ellipsis: true,
    },
  ];
  return (
    <PageContainer>
      <Form options={options as IOptions[]} query={query} />
      <Card extra={<Button type="primary">新增角色</Button>}>
        {/* <Table columns={columns} dataSource={dataSource} /> */}
      </Card>
    </PageContainer>
  );
};

export default Role;

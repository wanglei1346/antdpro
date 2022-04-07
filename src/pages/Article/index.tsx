import { PageContainer } from '@ant-design/pro-layout';
import { useEffect, useState } from 'react';
import { Tag, Space, TableColumnsType, Card, Button, Modal, message } from 'antd';
import { history, useIntl } from 'umi';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getList, destroy } from '@/services/ant-design-pro/article';
import Table from '@/components/Table';
import Form from '@/components/Form';
const Article = () => {
  const intl = useIntl();
  // 查询文章列表参数
  const [formParams, setFormParams] = useState<API.articleListReq>({ pageNum: 1, pageSize: 10 });

  // 接口返回表格数据
  const [tableData, setTableData] = useState<API.articleList>({});

  // 表格加载
  const [loading, setloading] = useState<boolean>(true);

  /**
   * @author wanglei<wanglei@cdtrust.com>
   * @date 2022-04-01 19:25:39
   * @description 获取文章列表
   * @param { API.articleListReq } formParams 查询参数
   */
  const getArticleList = async (formParams: API.articleListReq) => {
    setloading(true);
    const { success, data = { data: [], count: 0, pageNum: 1, pageSize: 10 } } = await getList(
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
      getArticleList(formParams);
    }
  }, [formParams]);

  // 发表文章
  const addAritcle = () => {
    history.push({
      pathname: '/article/add',
    });
  };

  // 编辑文章
  const editArticle = (id: number) => {
    history.push({
      pathname: `/article/edit/${id}`,
    });
  };

  // 删除文章
  const destroyArticle = (id: number) => {
    Modal.confirm({
      title: intl.formatMessage({ id: 'article.delete.title' }),
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return destroy({ id }).then(() => {
          getArticleList(formParams);
          message.success('删除成功');
        });
      },
    });
  };
  // 表格配置项
  const columns: TableColumnsType<Record<string, unknown>> = [
    {
      title: intl.formatMessage({ id: 'article.cnName' }),
      dataIndex: 'cnName',
      key: 'cnName',
      render: (text) => <a>{text}</a>,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'article.title' }),
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'article.state' }),
      key: 'state',
      dataIndex: 'state',
      render: (state) => (
        <Tag color={state === 1 ? 'green' : 'volcano'}>
          {state === 1
            ? intl.formatMessage({ id: 'article.state.published' })
            : intl.formatMessage({ id: 'article.state.unpublished' })}
        </Tag>
      ),
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'article.createAt' }),
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'article.action' }),
      key: 'action',
      render: (text, record: API.articleItem) => (
        <Space size="middle">
          <a onClick={() => editArticle(record.id as number)}>
            {intl.formatMessage({ id: 'article.edit' })}
          </a>
          <a onClick={() => destroyArticle(record.id as number)}>
            {intl.formatMessage({ id: 'article.delete' })}
          </a>
        </Space>
      ),
      ellipsis: true,
    },
  ];
  // 分页
  const pageChange = (pageNum: number, pageSize: number) => {
    setFormParams({ ...formParams, pageNum, pageSize });
  };
  // 表单配置项
  const options = [
    {
      label: intl.formatMessage({ id: 'article.cnName' }),
      type: 'input',
      key: 'cnName',
      placeholder: `${intl.formatMessage({ id: 'form.input.placeholder' })}${intl.formatMessage({
        id: 'article.cnName',
      })}`,
    },
    {
      label: intl.formatMessage({ id: 'article.title' }),
      type: 'input',
      key: 'title',
      placeholder: `${intl.formatMessage({ id: 'form.input.placeholder' })}${intl.formatMessage({
        id: 'article.title',
      })}`,
    },
    {
      label: intl.formatMessage({ id: 'article.state' }),
      type: 'select',
      key: 'state',
      placeholder: `${intl.formatMessage({ id: 'form.select.placeholder' })}${intl.formatMessage({
        id: 'article.state',
      })}`,
      status: [
        {
          label: intl.formatMessage({ id: 'article.state.whole' }),
          value: null,
        },
        {
          label: intl.formatMessage({ id: 'article.state.published' }),
          value: 1,
        },
        {
          label: intl.formatMessage({ id: 'article.state.unpublished' }),
          value: 2,
        },
      ],
    },
    {
      label: intl.formatMessage({ id: 'article.createAt' }),
      type: 'dateRange',
      key: 'createDate$endDate',
    },
  ];
  // 查询
  const query = async (values: any) => {
    setFormParams({ pageNum: 1, ...values });
  };
  return (
    <PageContainer>
      <Form query={query} options={options} />
      <Card
        hoverable
        extra={
          <Button type="primary" onClick={addAritcle}>
            发表文章
          </Button>
        }
        headStyle={{ borderBottom: 'none' }}
      >
        <Table
          columns={columns}
          dataSource={tableData.data as API.articleItem[]}
          pageChange={pageChange}
          total={tableData?.count as number}
          pageNum={tableData?.pageNum as number}
          pageSize={tableData?.pageSize as number}
          loading={loading}
        />
      </Card>
    </PageContainer>
  );
};

export default Article;

import { Table as AntdTable, Pagination, TableColumnsType } from 'antd';
import styles from './index.less';
const Table = ({
  columns,
  dataSource = [],
  pageChange,
  total = 0,
  pageNum = 1,
  pageSize = 10,
  loading = false,
}: {
  columns: TableColumnsType<Record<string, unknown>>;
  dataSource: Record<string, unknown>[];
  pageChange: (page: number, pageSize: number) => void;
  total: number;
  pageNum: number;
  pageSize: number;
  loading: boolean;
}) => {
  const handleChange = (page: number, pageSize: number) => {
    pageChange(page, pageSize);
  };
  return (
    <>
      <AntdTable
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="id"
        loading={loading}
        scroll={{ x: true }}
      />
      <Pagination
        showSizeChanger
        className={styles.pagination}
        total={total}
        pageSize={pageSize}
        current={pageNum}
        showTotal={(total) => `共 ${total} 条`}
        onChange={handleChange}
      />
    </>
  );
};

export default Table;

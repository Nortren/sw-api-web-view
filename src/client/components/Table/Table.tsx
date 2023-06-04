import React from 'react';
import classes from './Table.module.scss';
import { Table as AntdTable } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TablePaginationConfig } from 'antd/es/table/interface';

interface TableProps {
  columns: ColumnsType<any>;
  dataSource: any[];
  hideOnSinglePage?: boolean;
  className?: string;
  loading?: boolean;
  pagination?: false | TablePaginationConfig;
}

const Table = ({
  columns,
  dataSource,
  className,
  pagination,
  loading,
}: TableProps) => {
  return (
    <AntdTable
      loading={loading}
      className={className}
      rowClassName={() => classes.row_size}
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
    />
  );
};

export default Table;

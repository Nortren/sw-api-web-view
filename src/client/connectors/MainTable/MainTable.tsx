import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import classes from './MainTable.module.scss';
import { getPersonList } from '../../api/api';
import { Input, Pagination, Table } from 'antd';

import Link from 'next/link';
import { useSelectors } from '../../hooks/useSelectors';
import { useActions } from '../../hooks/useAction';

import { useDebounce } from '../../hooks/useDebounce';
import { StarWarsCharacter } from '../../types/data';

interface IMainTable {
  data: StarWarsCharacter[];
  totalPaginationSize: number;
}

// Pick<
// StarWarsCharacter,
// 'name' | 'height' | 'mass' | 'skin_color' | 'hair_color'
// >

interface IColumn {
  dataIndex: string;
  key: string;
  title: string;
  render?: (
    value: any,
    record: StarWarsCharacter,
    index: number,
  ) => React.ReactNode;
}

export const PAGE_SIZE = 10;

const TableText: FC<any> = ({ value, onClick }) => {
  return <div onClick={onClick}>{value}</div>;
};

const MainTable: FC<IMainTable> = ({ data, totalPaginationSize }) => {
  const { pageNumber } = useSelectors(
    (state) => state.mainReducer.toolsReducer,
  );

  const { userList } = useSelectors(
    (state) => state.mainReducer.userListReducer,
  );

  const { setPageNumber, addNewDataToList } = useActions();

  const [page, setPage] = useState<number>(pageNumber);
  const [tableData, setTableData] = useState<StarWarsCharacter[]>(data);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    changePageHandler(pageNumber);
  }, [userList]);

  const loadData = async (currentPageNumber: number) => {
    setLoading(true);
    try {
      const getData = await getPersonList(currentPageNumber);
      setTableData(getData.results);
      addNewDataToList({ data: getData.results, page: currentPageNumber });
      setInputValue('');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const checkDataInState = (currentPageNumber: number) => {
    setPageNumber(currentPageNumber);
    setPage(currentPageNumber);
    const existingData = userList.find(
      (item) => item.page === currentPageNumber,
    );
    if (existingData) {
      setTableData(existingData.data);
    } else {
      loadData(currentPageNumber);
    }
  };

  const changePageHandler = async (currentPageNumber: number) => {
    try {
      setInputValue('');
      checkDataInState(currentPageNumber);
    } catch (error) {
      console.log(error);
    }
  };

  const callAPI = async (value: string) => {
    setLoading(true);
    try {
      if (value.length > 0) {
        const text: string = value;
        setInputValue(text);
        const getData = await getPersonList(1, text);
        setTableData(getData.results);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    callAPI(debouncedInputValue);
  }, [debouncedInputValue]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const calculateCurrentIndex = (index: number): number => {
    return index + 1 + (page - 1) * PAGE_SIZE;
  };

  const columns: IColumn[] = [
    {
      title: '№',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => calculateCurrentIndex(index),
    },
    {
      title: 'Person name',
      dataIndex: 'name',
      key: 'Item',
      render: (value: number, record: StarWarsCharacter, index) => {
        return (
          <Link
            href={`/fullInformationPage/${calculateCurrentIndex(
              index,
            )}?client_render=true`}
          >
            {value}
          </Link>
        );
      },
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'Predicted',
      render: (value: number) => <TableText value={value} />,
    },
    {
      title: 'Mass',
      dataIndex: 'mass',
      key: 'Changes',
    },
    {
      title: 'Skin color',
      dataIndex: 'skin_color',
      key: 'ChangesPercent',
    },
  ];

  return (
    <div>
      <Input
        className={classes.search_container}
        placeholder="Search"
        onChange={handleInputChange}
        value={inputValue}
      />
      <Table
        className={classes.table_container}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        loading={loading}
        rowKey="name"
        size={'large'}
      />
      <Pagination
        className={classes.pagination_container}
        total={totalPaginationSize}
        defaultPageSize={PAGE_SIZE}
        onChange={changePageHandler}
        showSizeChanger={false}
        defaultCurrent={page}
      />
    </div>
  );
};

export default MainTable;

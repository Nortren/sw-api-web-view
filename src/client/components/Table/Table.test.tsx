import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './Table';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

describe('Table', () => {
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Age', dataIndex: 'age' },
  ];

  const dataSource = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
  ];

  it('renders table with correct columns and data', () => {
    const { getByText } = render(
      <Table columns={columns} dataSource={dataSource} />,
    );

    // Assert that table columns are rendered
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Age')).toBeInTheDocument();

    // Assert that table data is rendered
    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('25')).toBeInTheDocument();
    expect(getByText('Jane')).toBeInTheDocument();
    expect(getByText('30')).toBeInTheDocument();
  });

  it('renders table with custom className', () => {
    const { container } = render(
      <Table
        columns={columns}
        dataSource={dataSource}
        className="custom-table"
      />,
    );

    expect(container.firstChild).toHaveClass('custom-table');
  });

  it('renders table without pagination', () => {
    const { queryByText } = render(
      <Table columns={columns} dataSource={dataSource} pagination={false} />,
    );

    expect(queryByText('1')).toBeNull();
  });
});

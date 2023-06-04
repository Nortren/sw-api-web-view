import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Selector from './Selector';

const renderComponent = (
  defaultValue: string,
  options: any[],
  handleChange?: () => void,
) => {
  render(
    <Selector
      defaultValue={defaultValue}
      options={options}
      open={true}
      onChange={handleChange}
    />,
  );
};

describe('Selector', () => {
  it('should render with default value and options', async () => {
    const defaultValue = 'default';
    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ];

    renderComponent(defaultValue, options);

    const selectElement = screen.getByRole('combobox');
    const defaultOption = screen.getByText(defaultValue);

    fireEvent.click(selectElement);

    await waitFor(
      async () => {
        const menuElement = await screen.findByRole('listbox');
        expect(menuElement).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');
    const option3 = screen.getByText('Option 3');

    expect(selectElement).toBeInTheDocument();
    expect(defaultOption).toBeInTheDocument();
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });

  it('should call onChange handler when value is changed', async () => {
    const defaultValue = 'default';
    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ];
    const handleChange = jest.fn();

    renderComponent(defaultValue, options, handleChange);

    const selectElement = screen.getByRole('combobox');

    expect(selectElement).toBeInTheDocument();

    fireEvent.click(selectElement);
    fireEvent.click(screen.getByText('Option 2'));

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith('option2', {
        label: 'Option 2',
        value: 'option2',
      });
    });
  });
});

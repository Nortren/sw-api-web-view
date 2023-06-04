import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Loader } from './Loader';

test('renders Loader component', () => {
  render(<Loader />);

  const loaderSpace = screen.getByTestId('loader-space');
  const loaderAlert = screen.getByTestId('loader-alert');

  expect(loaderSpace).toBeInTheDocument();
  expect(loaderAlert).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

const title = 'Header Title';
const subtitle = 'Header Subtitle';
const childText = 'Child Component';
const childComponent = <div data-testid="child-component">{childText}</div>;

const renderComponent = () => {
  render(
    <Header title={title} sub_title={subtitle}>
      {childComponent}
    </Header>,
  );
};

describe('Header', () => {
  it('should render title and subtitle correctly', () => {
    renderComponent();

    const titleElement = screen.getByText(title);
    const subtitleElement = screen.getByText(subtitle);

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  it('should render children correctly', () => {
    renderComponent();
    const childElement = screen.getByText(childText);

    expect(childElement).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Layout, LayoutContent } from './Layout';

const renderComponentLayout = (childText: string) => {
  render(
    <Layout>
      <div>{childText}</div>
    </Layout>,
  );
};

const renderComponentLayoutContent = (childText: string) => {
  render(
    <LayoutContent>
      <div>{childText}</div>
    </LayoutContent>,
  );
};

describe('Layout', () => {
  it('should render children correctly', () => {
    const childText = 'Test Child Component Layout';
    renderComponentLayout(childText);

    const childElement = screen.getByText(childText);

    expect(childElement).toBeInTheDocument();
  });
});

describe('LayoutContent', () => {
  it('should render children correctly', () => {
    const childText = 'Test Child Component LayoutContent';
    renderComponentLayoutContent(childText);

    const childElement = screen.getByText(childText);

    expect(childElement).toBeInTheDocument();
  });
});

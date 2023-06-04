import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Button from './Button';

const buttonText = 'Loader Name';
const testTextAfterClickButton = 'render text after click Loader';

const testOnclickFunction = (text: string) => {
  render(<div>{text}</div>);
};

const renderComponent = (nameButton: string, text: string) => {
  render(
    <Button
      onClick={() => {
        testOnclickFunction(text);
      }}
    >
      {nameButton}
    </Button>,
  );
};

describe('Render button with text', () => {
  it('renders a heading', () => {
    renderComponent(buttonText, testTextAfterClickButton);
    const button = screen.getByRole('button');
    const buttonName = screen.getByText(buttonText);

    expect(button).toBeInTheDocument();
    expect(buttonName).toBeInTheDocument();
  });

  it('check click button and button effect after click', () => {
    renderComponent(buttonText, testTextAfterClickButton);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText(testTextAfterClickButton));
  });
});

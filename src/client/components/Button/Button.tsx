import React, { FC } from 'react';
import { Button as AntdButton } from 'antd';
import classNames from 'classnames';
import classes from './Button.module.scss';

type ButtonType =
  | 'link'
  | 'text'
  | 'ghost'
  | 'default'
  | 'primary'
  | 'dashed'
  | undefined;

export type ButtonStatus =
  | 'success'
  | 'warning'
  | 'danger'
  | 'link'
  | undefined;

interface IButton {
  children?: string | JSX.Element | JSX.Element[];
  icon?: string | JSX.Element | JSX.Element[];
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  type?: ButtonType;
  status?: ButtonStatus;
}

const Button: FC<IButton> = ({
  children,
  onClick,
  className,
  htmlType,
  type,
  icon,
  status,
  disabled,
}) => {
  const buttonClasses = classNames(className, {
    [classes.button_container_success]: status === 'success',
    [classes.button_container_warning]: status === 'warning',
    [classes.button_container_danger]: status === 'danger',
    [classes.button_container_link]: status === 'link',
    [classes.button_container]: !type,
    [classes.text_button_container]: type === 'text',
    [classes.text_button_disable_container]: disabled,
  });
  return (
    <AntdButton
      className={buttonClasses}
      htmlType={htmlType}
      onClick={onClick}
      type={type}
      icon={icon}
      disabled={disabled}
    >
      {children}
    </AntdButton>
  );
};

export default Button;

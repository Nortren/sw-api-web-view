import React, { FC } from 'react';
import { Layout as AntdLayout } from 'antd';
import classes from './Layout.module.scss';

interface ILayout {
  children?: string | JSX.Element | JSX.Element[];
}

export const Layout: FC<ILayout> = ({ children }) => {
  return <AntdLayout className={classes.container}>{children}</AntdLayout>;
};

export const LayoutContent: FC<ILayout> = ({ children }) => {
  return <AntdLayout.Content>{children}</AntdLayout.Content>;
};

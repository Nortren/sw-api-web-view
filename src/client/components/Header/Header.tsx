import React, { FC } from 'react';
import classes from './Header.module.scss';
import { Layout } from 'antd';

interface IHeader {
  title: string;
  sub_title: string;
  children?: string | JSX.Element | JSX.Element[];
}

const Header: FC<IHeader> = ({ title, sub_title, children }) => {
  return (
    <Layout.Header className={classes.container}>
      <div className={classes.container__top}>
        <h3 className={classes.container__title}>{title}</h3>
        <h3 className={classes.container__subtitle}>{sub_title}</h3>
      </div>
      {children}
    </Layout.Header>
  );
};

export default Header;

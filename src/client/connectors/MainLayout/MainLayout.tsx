import React, { FC } from 'react';
import Header from '../../components/Header/Header';
import { LayoutContent, Layout } from '../../components/Layout/Layout';
import classes from './MainLayout.module.scss';
import BackRoutingButton from '../../components/BackRoutingButton/BackRoutingButton';
interface IMainLayout {
  children: string | JSX.Element | JSX.Element[];
  classNameBody?: string;
}

const Logo: FC = () => {
  return (
    <div className={classes.image_container}>
      <div className={classes.image_container__content}></div>
    </div>
  );
};

const MainLayout: FC<IMainLayout> = ({ children }) => {
  return (
    <Layout>
      <Header title={'SWAPI'} sub_title={'by Nortren'}>
        <div className={classes.container__description}>
          <Logo />
          <div className={classes.container__description_text}>
            A long time ago in a galaxy far, far away..
          </div>
        </div>
      </Header>
      <div className={classes.main_container}>
        <BackRoutingButton />
        <LayoutContent>{children}</LayoutContent>
      </div>
    </Layout>
  );
};

export default MainLayout;

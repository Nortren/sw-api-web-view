import React, { FC } from 'react';
import classes from './Home.module.scss';
import MainTable from '../../connectors/MainTable/MainTable';
import { IStarWarsData } from '../../types/data';

interface IHome {
  data: IStarWarsData;
}

const Home: FC<IHome> = ({ data }) => {
  return (
    <div className={classes.container}>
      <div className={classes.home_container}>
        <MainTable data={data.results} totalPaginationSize={data.count} />
      </div>
    </div>
  );
};

export default Home;

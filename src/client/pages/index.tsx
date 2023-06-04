import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Home from '../view/Home/Home';
import { getPersonList } from '../api/api';
import { useActions } from '../hooks/useAction';
import { IStarWarsData } from '../types/data';

interface PageProps {
  personList: IStarWarsData;
}

const Index: NextPage = ({ personList }: PageProps) => {
  const { addNewDataToList } = useActions();
  addNewDataToList({ data: personList.results, page: 1 });
  return <Home data={personList} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const personList = await getPersonList();

  return {
    props: {
      personList,
    },
  };
};

export default Index;

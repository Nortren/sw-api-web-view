import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getPerson } from '../../api/api';

import CharacterPage from '../../view/CharacterPage/CharacterPage';
import { StarWarsCharacter } from '../../types/data';

interface IPageProps {
  personData: StarWarsCharacter | null;
  clientRender: string | string[] | boolean;
  errorMessage: boolean;
  id: string | string[];
}

interface ISSRParams {
  props: IPageProps;
}

const Index: NextPage<IPageProps> = ({
  personData,
  errorMessage,
  clientRender,
  id,
}) => {
  return (
    <CharacterPage
      id={id}
      personData={personData}
      errorMessage={errorMessage}
      clientRender={clientRender}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
}): Promise<ISSRParams> => {
  const id = query.id as string;
  const clientRender = query.client_render || false;

  let personData = null;
  let errorMessage = false;

  if (!clientRender) {
    try {
      personData = await getPerson(id);
      personData = { id, ...personData };
    } catch (error) {
      errorMessage = true;
    }
  }

  return {
    props: {
      personData,
      errorMessage,
      clientRender,
      id,
    },
  };
};

export default Index;

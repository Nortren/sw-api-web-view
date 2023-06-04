import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { getPerson } from '../../api/api';
import { Alert } from 'antd';
import CharacterInfo from '../../connectors/CharacterInfo/CharacterInfo';
import { useSelectors } from '../../hooks/useSelectors';
import { findUserById } from '../../helpers/userTools/userTools';
import { Loader } from '../../components/Loader/Loader';
import { StarWarsCharacter } from '../../types/data';

interface IPageProps {
  personData: StarWarsCharacter | null;
  errorMessage: boolean;
  clientRender: boolean;
  id: string;
}

interface IRenderPersonList {
  personData: StarWarsCharacter;
  disableEdit: boolean;
}

interface IComponentContainer {
  errorMessage: boolean;
  data: StarWarsCharacter | null;
  disableEdit: boolean;
}

const reFetchData = async (
  setData: Dispatch<SetStateAction<StarWarsCharacter>>,
  id: string,
  setLoader: Dispatch<SetStateAction<boolean>>,
) => {
  setLoader(true);
  const personData = await getPerson(id);
  setData({ id, ...personData });
  setLoader(false);
};

const RenderPersonList: FC<IRenderPersonList> = ({
  personData,
  disableEdit,
}) => {
  return (
    <div>
      <CharacterInfo data={personData} disableEdit={disableEdit} />
    </div>
  );
};

const RenderErrorMessage: FC = () => {
  return (
    <div>
      <Alert
        message="😅 Something went wrong"
        description="Please don't scold ❤"
        type="error"
        closable
      />
    </div>
  );
};

const ComponentContainer: FC<IComponentContainer> = ({
  errorMessage,
  data,
  disableEdit,
}) => {
  if (data) {
    return errorMessage ? (
      <RenderErrorMessage />
    ) : (
      <RenderPersonList personData={data} disableEdit={disableEdit} />
    );
  }
  return <Loader />;
};

const CharacterPage: FC<IPageProps> = ({
  personData,
  errorMessage,
  clientRender,
  id,
}) => {
  const [data, setData] = useState<StarWarsCharacter | null>(personData);
  const [loader, setLoader] = useState(false);
  const [disableEdit, setDisableEdit] = useState(true);
  const { userList } = useSelectors(
    (state) => state.mainReducer.userListReducer,
  );

  const { pageNumber } = useSelectors(
    (state) => state.mainReducer.toolsReducer,
  );
  useEffect(() => {
    const currentUser = findUserById(userList, id, pageNumber);

    if (Object.keys(currentUser).length !== 0) {
      setDisableEdit(false);
    }

    const resultData = clientRender ? currentUser : personData;

    if (resultData !== null) {
      Object.keys(resultData).length !== 0
        ? setData({ id, ...resultData } as StarWarsCharacter)
        : reFetchData(setData, id, setLoader);
    }
  }, []);
  return loader ? (
    <Loader />
  ) : (
    <ComponentContainer
      data={data}
      errorMessage={errorMessage}
      disableEdit={disableEdit}
    />
  );
};

export default CharacterPage;

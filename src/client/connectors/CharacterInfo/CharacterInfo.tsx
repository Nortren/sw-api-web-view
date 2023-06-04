import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import classes from './CharacterInfo.module.scss';

import { Image, Modal, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Button from '../../components/Button/Button';
import { useActions } from '../../hooks/useAction';
import { useSelectors } from '../../hooks/useSelectors';
import emptyAvatar from '../../assets/image/1msn4bl.png';
import Selector from '../../components/Select/Selector';
import {
  StarWarsCharacter,
  StarWarsFilm,
  StarWarsPlanet,
  StarWarsStarship,
  StarWarsVehicle,
} from '../../types/data';

export const StarWarsField: Record<string, string> = {
  name: 'Name',
  height: 'Height',
  mass: 'Mass',
  hair_color: 'Hair color',
  skin_color: 'Skin color',
  eye_color: 'Eye color',
  birth_year: 'Birth year',
  gender: 'Gender',
};

interface ICharacterInfo {
  data: StarWarsCharacter;
  disableEdit?: boolean;
}

interface IEditModal {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
  value: string;
  id: number | string | undefined;
  setDataValue: Dispatch<SetStateAction<string>>;
  disableEdit?: boolean;
}

const ChooseInformation: FC<{
  defaultValue: string;
  oncChange: Dispatch<SetStateAction<string>>;
}> = ({ defaultValue, oncChange }) => {
  const items = [
    { value: 'films', label: 'Films' },
    { value: 'homeworld', label: 'Homeworld' },
    { value: 'starships', label: 'Starships' },
    { value: 'vehicles', label: 'Vehicles' },
  ];
  const handleChange = (value: string) => {
    oncChange(value);
    console.log(`selected ${value}`);
  };
  return (
    <Selector
      popupClassName={classes.popup_container_selector}
      className={classes.select_container}
      defaultValue={defaultValue}
      onChange={handleChange}
      options={items}
    />
  );
};

const SubInfoItem: FC<{ value: string }> = ({ value }) => {
  return <div className={classes.sub_info_container__item}>{value}</div>;
};

const SubInfoContainer: FC<ICharacterInfo> = ({ data }) => {
  const [chooseTopic, setChooseTopic] = useState('films');

  useEffect(() => {
    console.log('data', data);
  }, [chooseTopic]);

  const chowInfoContainer = (
    data:
      | StarWarsStarship[]
      | StarWarsPlanet
      | StarWarsFilm[]
      | StarWarsVehicle[],
  ) => {
    const renderItem = (
      item: StarWarsStarship | StarWarsPlanet | StarWarsFilm | StarWarsVehicle,
      key?: number,
    ) => {
      const value = 'title' in item ? item.title : item.name;
      return <SubInfoItem value={value} key={key} />;
    };

    if (Array.isArray(data)) {
      return data.map(renderItem);
    } else {
      return renderItem(data);
    }
  };

  return (
    <div className={classes.sub_info}>
      <ChooseInformation
        defaultValue={chooseTopic}
        oncChange={setChooseTopic}
      />
      <div className={classes.sub_info_container}>
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          chowInfoContainer(data[chooseTopic])
        }
      </div>
    </div>
  );
};

const EditModal: FC<IEditModal> = ({
  isModalOpen,
  setIsModalOpen,
  name,
  value,
  id,
  setDataValue,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const { changeCurrentUser } = useActions();
  const { pageNumber } = useSelectors(
    (state) => state.mainReducer.toolsReducer,
  );

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleOk = () => {
    setIsModalOpen(false);
    setDataValue(inputValue);
    changeCurrentUser({
      page: pageNumber,
      id,
      updatedFields: { [name]: inputValue },
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setInputValue(value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text: string = event.target.value;
    setInputValue(text);
  };

  console.log('value', value);
  return (
    <Modal
      title={name}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input placeholder={name} value={inputValue} onChange={handleChange} />
    </Modal>
  );
};

const EditableComponent: FC<
  Pick<IEditModal, 'name' | 'value' | 'id' | 'disableEdit'>
> = ({ name, value, id, disableEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataValue, setDataValue] = useState<string>(value);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setDataValue(value);
  }, [value]);

  return (
    <div className={classes.view_data_container}>
      <div className={classes.view_data_container__data}>
        <div>{StarWarsField[name]}</div>
        <div>{dataValue}</div>
      </div>
      <Button onClick={showModal} disabled={disableEdit}>
        <EditOutlined />
      </Button>
      <EditModal
        id={id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        value={dataValue}
        setDataValue={setDataValue}
        name={name}
      />
    </div>
  );
};

function truncateUrl(url: string): string {
  const extensionRegex = /\.(png|jpg|jpeg)/i;
  const extensionMatch = url.match(extensionRegex);
  if (extensionMatch && extensionMatch.index) {
    const extensionIndex = extensionMatch.index + extensionMatch[0].length;
    return url.substring(0, extensionIndex);
  }
  return url;
}

const Avatar: FC<{ images: string[] | undefined }> = ({ images = [] }) => {
  const chooseImage = images.length ? truncateUrl(images[0]) : emptyAvatar.src;
  return (
    <div className={classes.avatar_image}>
      <Image width={300} loading={'eager'} src={chooseImage} />
    </div>
  );
};

const MainInfoContainer: FC<Pick<ICharacterInfo, 'data' | 'disableEdit'>> = ({
  data,
  disableEdit,
}) => {
  const { height, birth_year, eye_color, skin_color, gender, mass, id } = data;
  const mainData = { height, birth_year, eye_color, skin_color, gender, mass };
  return (
    <div className={classes.character_container__main_info}>
      {Object.keys(mainData).map((item) => {
        return (
          <div key={item}>
            <EditableComponent
              name={item}
              //eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              value={mainData[item]}
              id={id}
              disableEdit={disableEdit}
            />
          </div>
        );
      })}
    </div>
  );
};

const CharacterInfo: FC<ICharacterInfo> = ({ data, disableEdit }) => {
  const { images } = data;
  return (
    <div className={classes.character_container}>
      <div className={classes.character_container__header_title}>
        {data.name}
      </div>
      <div className={classes.character_container__avatar_container}>
        <Avatar images={images} />
      </div>
      <MainInfoContainer data={data} disableEdit={disableEdit} />
      <div className={classes.character_container__sub_info}>
        <SubInfoContainer data={data} />
      </div>
    </div>
  );
};

export default CharacterInfo;

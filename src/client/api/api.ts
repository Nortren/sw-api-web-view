import axios from 'axios';
import { LRUCache } from 'lru-cache';

import getConfig from 'next/config';
import { IStarWarsData, StarWarsCharacter } from '../types/data';

const { publicRuntimeConfig } = getConfig();

const URL = publicRuntimeConfig.url;

const cache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 5,
});

/* TODO On the swap 17 side, a character with an error
const crutchGetPersonIndex = (id: string) => {
  const parseId = parseInt(id);

  const indexResult = parseId > 16 ? parseId + 1 : parseId;
  return indexResult.toString();
};
*/

export const getPersonList = async (
  page = 1,
  search = '',
): Promise<IStarWarsData> => {
  const params = {
    page: String(page),
    search,
  };
  const urlGetUsers = `${URL}/character/list`;

  try {
    const cacheKey = urlGetUsers;
    const cachedData = cache.get(cacheKey) as Promise<IStarWarsData>;

    if (cachedData) {
      return cachedData;
    }

    const getPeopleList = await axios.get(urlGetUsers, {
      params,
    });
    return getPeopleList.data;
  } catch (error) {
    throw Error('Person acquisition error', error);
  }
};

export const getPerson = async (id: string): Promise<StarWarsCharacter> => {
  const urlGetPerson = `${URL}/character/person`;
  try {
    const cacheKey = `${urlGetPerson}/${id}`;
    const cachedData = cache.get(cacheKey) as Promise<StarWarsCharacter>;

    if (cachedData) {
      return cachedData;
    }

    const getPeopleList = await axios.get(`${urlGetPerson}/${id}`);
    cache.set(cacheKey, getPeopleList.data);
    return getPeopleList.data;
  } catch (error) {
    throw Error('Person acquisition error', error);
  }
};

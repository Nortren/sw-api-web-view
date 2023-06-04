import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LRUCache } from 'lru-cache';
import { GoogleSearchService } from '../googleSearch/googleSearch.service';

const cache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 5,
});

@Injectable()
export class CharacterService {
  constructor(private googleSearchService: GoogleSearchService) {}

  getOutsideRequest = async (url: string) => {
    try {
      const response = await axios.get(url); // Ваш асинхронный запрос (например, с помощью fetch)
      const data = await response.data; // Обработка ответа (парсинг JSON и т.д.)
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  isSwapiLink = (url: string): boolean => {
    const swapiDomain = 'https://swapi.dev';
    return url.startsWith(swapiDomain) && url.length > swapiDomain.length;
  };

  makeAsyncRequests = async (urls: string[]): Promise<any[]> => {
    const resultArray = [];

    for (const url of urls) {
      const res = await this.getOutsideRequest(url);
      resultArray.push(res);
    }
    return resultArray;
  };

  expandData = async (data) => {
    const expandedData = await Promise.all(
      data.map(async (item) => {
        const expandedItem = { ...item };
        expandedItem.images =
          await this.googleSearchService.searchImageByDescription(item.name);
        for (const value of Object.keys(item)) {
          if (Array.isArray(item[value])) {
            expandedItem[value] = await this.makeAsyncRequests(item[value]);
          } else if (this.isSwapiLink(item[value])) {
            expandedItem[value] = await this.getOutsideRequest(item[value]);
          }
        }

        return expandedItem;
      }),
    );

    return expandedData;
  };

  getPersonList = async (page = 1, search = ''): Promise<any> => {
    const params = {
      page: String(page),
      search,
    };
    const cacheKey = `getPersonList:${page}:${search}`;
    const cachedData = cache.get(cacheKey) as Promise<any>;

    if (cachedData) {
      return cachedData;
    }

    try {
      const getPeopleList = await axios.get('https://swapi.dev/api/people', {
        params,
      });
      const data = await this.expandData(getPeopleList.data.results);

      const processedValue = { ...getPeopleList.data, results: data };

      cache.set(cacheKey, processedValue);
      return processedValue;
    } catch (error) {
      throw Error('Data acquisition error');
    }
  };

  getPerson = async (id): Promise<any> => {
    try {
      const cacheKey = `https://swapi.dev/api/people/${id}`;
      const cachedData = cache.get(cacheKey) as Promise<any>;

      if (cachedData) {
        return cachedData;
      }

      const getPeopleList = await axios.get(
        `https://swapi.dev/api/people/${id}`,
      );
      const getPerson = getPeopleList.data;
      const data = await this.expandData([getPerson]);
      cache.set(cacheKey, data[0]);
      return data[0];
    } catch (error) {
      throw Error('Person acquisition error');
    }
  };
}

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getPersonList, getPerson } from './api';
const URL = 'http://localhost:8080';
const mockAxios = new MockAdapter(axios);

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    url: 'http://localhost:8080',
  },
}));

describe('getPersonList', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should return the list of people', async () => {
    const mockResponse = {
      results: [
        { id: 1, name: 'Luke Skywalker' },
        { id: 2, name: 'Darth Vader' },
      ],
      count: 2,
      next: null,
      previous: null,
    };

    mockAxios.onGet(`${URL}/character/list`).reply(200, mockResponse);

    const result = await getPersonList();

    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if there is an API error', async () => {
    mockAxios.onGet(`${URL}/character/list`).reply(500);

    await expect(getPersonList()).rejects.toThrowError(
      'Person acquisition error',
    );
  });
});

describe('getPerson', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should return the person data', async () => {
    const id = '1';
    const mockResponse = {
      id: 1,
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
    };

    mockAxios.onGet(`${URL}/character/person/${id}`).reply(200, mockResponse);

    const result = await getPerson(id);

    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if there is an API error', async () => {
    const id = '80';

    mockAxios.onGet(`${URL}/character/person/${id}`).reply(500);

    await expect(getPerson(id)).rejects.toThrowError(
      'Person acquisition error',
    );
  });
});

import { createSlice } from '@reduxjs/toolkit';
import { StarWarsCharacter } from '../../types/data';

export interface IList {
  page: number;
  data: StarWarsCharacter[];
}

interface UserListState {
  userList: IList[];
  currentUser: StarWarsCharacter | null;
}

const initialState: UserListState = {
  userList: [],
  currentUser: null,
};

// TODO On the swap 17 side, a character with an error
/*const crutchGetPersonIndex = (index: number, page: number): number => {
  const calculateId = index + 1 + (page - 1) * 10;

  const resultID = calculateId > 16 ? calculateId + 1 : calculateId;
  return resultID;
};*/

const calculatePersonIndex = (index: number, page: number): number => {
  const calculateId = index + 1 + (page - 1) * 10;
  return calculateId;
};

const userListSlice = createSlice({
  name: 'toolsSlice',
  initialState,
  reducers: {
    addNewDataToList(state, action) {
      const newData = action.payload;
      const { page } = newData as IList;

      const existingData = state.userList.find((item) => item.page === page);
      if (!existingData) {
        const modifiedData = newData.data.map(
          (item: StarWarsCharacter, index: number) => ({
            ...item,
            id: calculatePersonIndex(index, page),
          }),
        );
        state.userList.push({ data: modifiedData, page });
      }
    },
    changeCurrentUser(state, action) {
      const newData = action.payload;
      const { page, id, updatedFields } = newData;

      const existingData = state.userList.find((item) => item.page === page);
      if (existingData) {
        const { data } = existingData;
        const updatedData = data.map((item) => {
          if (item.id === parseInt(id)) {
            return {
              ...item,
              ...updatedFields,
            };
          }
          return item;
        });
        state.userList = state.userList.map((item) => {
          if (item.page === page) {
            return {
              ...item,
              data: updatedData,
            };
          }
          return item;
        });
      }
    },
    clearList(state) {
      state.userList = [];
    },
  },
});
export const userListSliceReducer = userListSlice.reducer;
export const userListSliceActions = userListSlice.actions;

import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { toolsSliceActions } from '../store/tools/tools';
import { userListSliceActions } from '../store/userList/userList';
const allActions = {
  ...toolsSliceActions,
  ...userListSliceActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};

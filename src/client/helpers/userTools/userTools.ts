import { IList } from '../../store/userList/userList';

export const findUserById = (
  userList: IList[],
  findId: string,
  pageNumber: number,
) => {
  const userId = parseInt(findId);

  const findCurrentPage = () => {
    return userList?.filter((item) => {
      return item.page === pageNumber;
    });
  };

  const reFind = findCurrentPage();

  if (reFind.length) {
    const findUser = reFind[0]?.data.filter((item) => {
      return item.id === userId;
    });

    return findUser[0];
  }
  return [];
};

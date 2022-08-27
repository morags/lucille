const fetchBoards = () => {
  const boards = JSON.parse(localStorage.getItem('boards'));
  return boards;
};

export default fetchBoards;

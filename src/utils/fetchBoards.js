const fetchBoards = () => {
  const boards = JSON.parse(localStorage.getItem('boards'));
  if(boards == null){
    return [{"id":"f082a062-5277-45fa-b55f-2746b365f598","name":"Create a new bucket"}]
  } 
  return boards;
};

export default fetchBoards;

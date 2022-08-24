const fetchUsers = () => {
  const users = JSON.parse(localStorage.getItem('users'));
  return users;
};

export default fetchUsers;

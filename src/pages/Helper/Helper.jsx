import React, { useState, useEffect } from 'react';
import { Box, Image, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ListIcon from '../../assets/images/list_footer_btn.png';
import fetchUsers from '../../utils/fetchUsers';

function Helper() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const data = fetchUsers();
    setUsers(data);
  }, []);

  if (!users) return <Text>LOading...</Text>;

  return (
    <Box border='3px' h='100%' borderColor='gray.300' position='relative'>
      {users.map((user) => (
        <Box key={user.id}>
          <Image src={user.image} />
          <Heading>{user.name}</Heading>
          <Text>{user.email}</Text>
        </Box>
      ))}
      hello
      <Box
        style={{ cursor: 'pointer' }}
        w='70px'
        position='absolute'
        right='-15px'
        bottom='0'
      >
        <Link to='create'>
          <Image src={ListIcon} />
        </Link>
      </Box>
    </Box>
  );
}

export default Helper;

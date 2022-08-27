/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Box, Image, Heading, Text, Grid, GridItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import fetchUsers from '../../utils/fetchUsers';
import { ListIcon, UserImage } from '../../assets';

function Helper({ mdFont, smFont, fontBright }) {
  const [users, setUsers] = useState(null);
  const startUser = [
    {
      name: 'Add new',
      email: 'Add new users',
      id: uuidv4(),
      image: UserImage,
    },
  ];

  useEffect(() => {
    const data = fetchUsers();
    setUsers(data);
  }, []);

  return (
    <Box border='3px' h='100%' borderColor='gray.300' position='relative'>
      <Grid templateColumns='repeat(2, 1fr)' gap={10} p='20px' overflowY='auto'>
        {users
          ? users.map((user) => (
              <GridItem
                key={user.id}
                bgColor='#ffffff'
                textAlign='center'
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                p='20px'
                rounded='xl'
                w='100%'
              >
                <Image src={user.image} w='150px' h='150px' rounded='full' />
                <Heading
                  style={{
                    fontSize: `${mdFont}px`,
                    filter: `contrast(${fontBright}%)`,
                  }}
                >
                  {user.name}
                </Heading>
                <Text
                  style={{
                    fontSize: `${smFont}px`,
                    filter: `contrast(${fontBright}%)`,
                  }}
                >
                  {user.email}
                </Text>
              </GridItem>
            ))
          : startUser.map((userData) => (
              <GridItem
                key={userData.id}
                bgColor='#ffffff'
                textAlign='center'
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                p='20px'
                rounded='xl'
                w='100%'
              >
                <Image src={userData.image} w='150px' rounded='full' />
                <Heading>{userData.name}</Heading>
                <Text>{userData.email}</Text>
              </GridItem>
            ))}
      </Grid>
      <Box
        style={{ cursor: 'pointer' }}
        w='70px'
        position='absolute'
        right='-0'
        bottom='-70px'
      >
        <Link to='create'>
          <Image src={ListIcon} />
        </Link>
      </Box>
    </Box>
  );
}

export default Helper;

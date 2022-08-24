/* eslint-disable consistent-return */

import React, { useState } from 'react';
import { Box, Button, Input, Heading, FormControl } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function CreateHelper() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userImage, setUserImage] = useState('');

  const handleSubmitUser = () => {
    if (!username || !userEmail || !userImage)
      return (
        <Heading as='h3' fontSize='md'>
          Please fill the form
        </Heading>
      );

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (userImage) {
      const reader = new FileReader();
      reader.onloadend = () => localStorage.setItem('userImage', reader.result);
      reader.readAsDataURL(userImage);
    }

    const img = localStorage.getItem('userImage');

    const user = {
      id: uuidv4(),
      name: username,
      email: userEmail,
      image: img,
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    navigate('/helper');
  };

  return (
    <Box border='2px' p='20px' borderColor='gray.600'>
      <Heading as='h2' fontSize='2xl' mb='20px' color='gray.800'>
        Create Helper
      </Heading>
      <FormControl>
        <Input
          type='text'
          placeholder='Enter your name'
          border='1px'
          borderColor='gray.400'
          mb='25px'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type='email'
          placeholder='Enter your name'
          border='1px'
          borderColor='gray.400'
          mb='25px'
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type='file'
          //   placeholder='Enter your name'
          //   border='1px'
          //   borderColor='gray.400'
          //   mb='25px'
          value=''
          onChange={(e) => setUserImage(e.target.files[0])}
        />
        <Button colorScheme='teal' size='md' onClick={handleSubmitUser}>
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}

export default CreateHelper;

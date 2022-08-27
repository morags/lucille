/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Button, Heading, Textarea } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function CreateList({ mdFont }) {
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState('');

  const handleSaveList = () => {
    const boards = JSON.parse(localStorage.getItem('boards') || '[]');

    const board = {
      id: uuidv4(),
      name: boardName,
      data: [],
    };

    boards.push(board);
    localStorage.setItem('boards', JSON.stringify(boards));
    navigate('/');
  };

  return (
    <Box p='30px 20px'>
      <Heading textAlign='left' mb='20px' style={{ fontSize: `${mdFont}px` }}>
        Add new board
      </Heading>
      <Textarea
        placeholder='Enter your board name'
        border='1px'
        borderColor='#444444'
        value={boardName}
        style={{ fontSize: `${mdFont}px` }}
        fontWeight='bold'
        onChange={(e) => setBoardName(e.target.value)}
      />
      <Button
        mt='20px'
        w='200px'
        onClick={handleSaveList}
        colorScheme='teal'
        size='lg'
      >
        Add Board
      </Button>
    </Box>
  );
}

export default CreateList;

import React, { useState } from 'react';
import { Box, Button, Textarea } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function CreateList() {
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState('');

  const handleSaveList = () => {
    const boards = JSON.parse(localStorage.getItem('boards') || '[]');

    const board = {
      id: uuidv4(),
      name: boardName,
    };

    boards.push(board);

    localStorage.setItem('boards', JSON.stringify(boards));
    navigate('/');
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Textarea
        placeholder='Enter Your List Name'
        border='1px'
        borderColor='#444444'
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
      />
      <Button mt='20px' onClick={handleSaveList}>
        Save
      </Button>
    </Box>
  );
}

export default CreateList;

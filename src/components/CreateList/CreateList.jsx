/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Button, Heading, Textarea } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../utils/db';

function CreateList({ mdFont }) {
  const navigate = useNavigate();
  // React hook to manage the state of the new board/list name
  const [boardName, setBoardName] = useState('');

  // The functions that gets fired when hitting the create new board/list
  const addBoard = async () => {
    try {
      await db.boards.add({
        name: boardName,
        archived: "false",
        deleted: "false",
        taskscount: 0
      })
    } catch (e) {
      console.log("Failed to add new board => ", e);
    }
    // Then navigate to the main page
    navigate('/');
  }

  return (
    <Box p='30px 20px'>
      <Heading textAlign='left' mb='20px' style={{ fontSize: `${mdFont}px` }}>
        Add new list
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
        onClick={addBoard}
        colorScheme='teal'
        size='lg'
      >
        Add List
      </Button>
    </Box>
  );
}

export default CreateList;

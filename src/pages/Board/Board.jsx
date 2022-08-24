/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Heading, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import NotebookIcon from '../../assets/images/parchment.png';
import ListIcon from '../../assets/images/list_footer_btn.png';
import fetchBoards from '../../utils/fetchBoards';

function Board() {
  const [boardList, setBoardList] = useState(null);

  useEffect(() => {
    const data = fetchBoards();
    setBoardList(data);
  }, []);

  if (!boardList) return 'Loading...';

  return (
    <Grid
      position='relative'
      templateColumns='repeat(3, 1fr)'
      gap={5}
      backgroundColor='#cedcbf'
    >
      {boardList.map((board) => (
        <GridItem
          w='100%'
          key={board.id}
          bgImage={NotebookIcon}
          bgRepeat='no-repeat'
          bgPosition='top'
          h='150px'
          border='1px'
          borderColor='#990000'
          display='flex'
          alignItems='center'
          justifyContent='center'
          p='10px'
        >
          <Link to={`/board/${board.name}`}>
            <Heading textAlign='center'>{board.name}</Heading>
          </Link>
        </GridItem>
      ))}

      <Box
        style={{ cursor: 'pointer' }}
        w='70px'
        position='absolute'
        right='-15px'
        bottom='-24%'
      >
        <Link to='board/create'>
          <Image src={ListIcon} />
        </Link>
      </Box>
    </Grid>
  );
}

export default Board;

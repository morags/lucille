/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Heading, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useLongPress } from 'use-long-press';
import fetchBoards from '../../utils/fetchBoards';
import {
  CancelIcon,
  DeleteIcon,
  MoveArchiveIcon,
  ShareIcon,
  ListIcon,
  NotebookBG,
} from '../../assets';

function Board({ mdFont, fontBright, smFont }) {
  const [boardList, setBoardList] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [users, setUsers] = useState([]);
  const usersData = JSON.parse(localStorage.getItem('users'));
  const [sharePopup, setSharePopup] = useState(false);

  const startBoardList = [
    {
      id: uuidv4(),
      name: 'Add New Boards',
    },
  ];

  useEffect(() => {
    if (users === null) {
      setUsers([]);
    } else {
      setUsers(usersData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const data = fetchBoards();
    setBoardList(data);
  }, []);

  const selectIdName = (boardId, boardName) => {
    setSelectedId(boardId);
    setSelectedName(boardName);
  };

  const bind = useLongPress(() => {
    boardList.map((board) => {
      if (board.id === selectedId) {
        setButtonPopup(true);
      }
      return board;
    });
  });

  const deleteBoard = (id) => {
    const removeBoard = boardList.filter((board) => board.id !== id);
    setBoardList(removeBoard);
    setButtonPopup(false);
    localStorage.setItem('boards', JSON.stringify(removeBoard));
  };

  const getArchives = JSON.parse(localStorage.getItem('archives') || '[]');

  const archiveBoard = (id) => {
    boardList.map((board) => {
      if (board.id === id) {
        getArchives.push(board);
      }
      return board;
    });
    const removeBoard = boardList.filter((board) => board.id !== id);
    setBoardList(removeBoard);
    localStorage.setItem('boards', JSON.stringify(removeBoard));
    localStorage.setItem('archives', JSON.stringify(getArchives));
    setButtonPopup(!buttonPopup);
  };

  const shareBoard = () => {
    setSharePopup(!sharePopup);
  };

  return (
    <Box position='relative' height='100%' p='20px' backgroundColor='#cedcbf'>
      <Grid
        p='0 20px'
        templateColumns='repeat(3, 1fr)'
        gap={5}
        overflowY='auto'
        height='inherit'
      >
        {boardList
          ? boardList.map((board) => (
              <GridItem
                w='100%'
                key={board.id}
                bgImage={NotebookBG}
                bgRepeat='no-repeat'
                bgPosition='top'
                h='150px'
                border='1px'
                borderColor='#990000'
                display='flex'
                alignItems='center'
                justifyContent='center'
                p='10px'
                {...bind()}
                onMouseEnter={() => selectIdName(board.id, board.name)}
                style={{ cursor: 'pointer' }}
                position='relative'
              >
                <Link to={`/board/${board.id}`}>
                  <Heading
                    textAlign='center'
                    style={{
                      fontSize: `${mdFont}px`,
                      filter: `contrast(${fontBright}%)`,
                    }}
                  >
                    {board.name}
                  </Heading>
                </Link>
              </GridItem>
            ))
          : startBoardList.map((data) => (
              <GridItem
                w='100%'
                key={data.id}
                bgImage={NotebookBG}
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
                <Heading textAlign='center'>{data.name}</Heading>
              </GridItem>
            ))}

        {buttonPopup && (
          <Box
            backgroundColor='#cccccc'
            position='absolute'
            width='full'
            h='full'
            opacity='0.9'
            display='flex'
            alignItems='start'
            p='20px'
            justifyContent='center'
            flexDirection='column'
            left='0'
            top='0'
          >
            <Heading
              as='h2'
              mb='20px'
              ml='20px'
              style={{
                fontSize: `${mdFont}px`,
                filter: `contrast(${fontBright}%)`,
              }}
            >
              {selectedName}
            </Heading>
            <Box display='flex'>
              <Image
                src={DeleteIcon}
                w='120px'
                m='0px 10px'
                cursor='pointer'
                onClick={() => deleteBoard(selectedId)}
              />
              <Image
                src={MoveArchiveIcon}
                w='120px'
                m='0px 10px'
                cursor='pointer'
                onClick={() => archiveBoard(selectedId)}
              />
              <Box position='relative'>
                <Image
                  src={ShareIcon}
                  w='120px'
                  m='0px 10px'
                  cursor='pointer'
                  onClick={shareBoard}
                />
                <Box position='absolute' display='flex'>
                  {sharePopup &&
                    users.map((user) => (
                      <Box
                        key={user.id}
                        backgroundColor='#ffffff'
                        w='80px'
                        h='80px'
                        m='10px'
                        p='10px'
                        rounded='full'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                      >
                        <Heading style={{ fontSize: `${smFont}px` }}>
                          {user.name}
                        </Heading>
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
            <Image
              src={CancelIcon}
              w='40px'
              position='absolute'
              top='25px'
              right='25px'
              cursor='pointer'
              onClick={() => setButtonPopup(!buttonPopup)}
            />
          </Box>
        )}
      </Grid>
      <Box
        style={{ cursor: 'pointer' }}
        w='70px'
        position='absolute'
        right='10px'
        bottom='-75px'
      >
        <Link to='board/create'>
          <Image src={ListIcon} />
        </Link>
      </Box>
    </Box>
  );
}

export default Board;

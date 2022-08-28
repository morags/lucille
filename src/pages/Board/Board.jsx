/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Box, Grid, GridItem, Heading, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useLongPress } from 'use-long-press';
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '../../utils/db';
import {
  CancelIcon,
  DeleteIcon,
  MoveArchiveIcon,
  ShareIcon,
  ListIcon,
  NotebookBG,
} from '../../assets';

function Board({ mdFont, fontBright, smFont }) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [sharePopup, setSharePopup] = useState(false);
  
  const allHelpers = useLiveQuery(
    () => db.helpers.toArray()
  );

  const boardList = useLiveQuery(
    () => db.boards
    .where({archived: "false", deleted: "false"})
    .toArray()
  );
  
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
    setButtonPopup(false);
    db.boards.update(id, {deleted: "true"})
  };

  const archiveBoard = (id) => {
    db.boards.update(id, {archived: "true"})
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
        {boardList?.map((board) => (
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
          }

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
                    allHelpers?.map((helper) => (
                      <Box
                        key={helper.id}
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
                          {helper.name}
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

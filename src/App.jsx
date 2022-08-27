/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import {
  Board,
  Archive,
  Guide,
  Helper,
  Setup,
  BoardDetail,
  CreateHelper,
} from './pages';
import CreateList from './components/CreateList/CreateList';

function App() {
  const [mdFont, setMdFont] = useState(30);
  const [smFont, setSmFont] = useState(20);
  const [fontBright, setFontBright] = useState(100);

  const increaseFont = () => {
    setMdFont(mdFont + 2);
    setSmFont(smFont + 2);
  };

  const decreaseFont = () => {
    setMdFont(mdFont - 2);
    setSmFont(smFont - 2);
  };

  const increaseBright = () => {
    setFontBright(fontBright + 20);
  };

  const decreaseBright = () => {
    if (fontBright <= 0) {
      setFontBright(0);
    } else {
      setFontBright(fontBright - 20);
    }
  };

  return (
    <main className='app'>
      <Container
        pt={10}
        pb={50}
        border='2px'
        borderColor='gray.500'
        w='100%'
        height='830px'
        centerContent
        mt={20}
        mb={20}
        display='flex'
        alignItems='center'
        flexDirection='column'
        pl={0}
        pr={0}
        maxWidth='720px'
      >
        <Box h='100%' bg='#e8e8e6' width='100%'>
          <Box h='100%' mt='-5px'>
            <Navbar />
            <Box m='20px' h='80%'>
              <Routes>
                <Route
                  path='/'
                  element={
                    <Board
                      mdFont={mdFont}
                      smFont={smFont}
                      fontBright={fontBright}
                    />
                  }
                />
                <Route
                  path='/board/:boardId'
                  element={
                    <BoardDetail
                      mdFont={mdFont}
                      smFont={smFont}
                      fontBright={fontBright}
                    />
                  }
                />
                <Route
                  path='/board/create'
                  element={<CreateList mdFont={mdFont} />}
                />
                <Route
                  path='/archive'
                  element={<Archive mdFont={mdFont} fontBright={fontBright} />}
                />
                <Route
                  path='/guide'
                  element={<Guide smFont={smFont} fontBright={fontBright} />}
                />
                <Route
                  path='/helper'
                  element={
                    <Helper
                      mdFont={mdFont}
                      smFont={smFont}
                      fontBright={fontBright}
                    />
                  }
                />
                <Route
                  path='/helper/create'
                  element={
                    <CreateHelper
                      mdFont={mdFont}
                      smFont={smFont}
                      fontBright={fontBright}
                    />
                  }
                />
                <Route
                  path='/setup'
                  element={
                    <Setup
                      mdFont={mdFont}
                      increaseFont={increaseFont}
                      decreaseFont={decreaseFont}
                      fontBright={fontBright}
                      decreaseBright={decreaseBright}
                      increaseBright={increaseBright}
                    />
                  }
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Container>
    </main>
  );
}

export default App;

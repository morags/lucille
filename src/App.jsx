import React from 'react';
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
  return (
    <main className='app'>
      <Container
        pt={10}
        pb={35}
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
        <Box h='100%' bg='#e8e8e6' pb='40px' pr={5} pl={5} width='100%'>
          <Box h='100%' mt='-5px'>
            <Navbar />
            <Box p={5} h='85%' style={{ overflow: 'auto' }}>
              <Routes>
                <Route path='/' element={<Board />} />
                <Route path='/board/:name' element={<BoardDetail />} />
                <Route path='/board/create' element={<CreateList />} />
                <Route path='/archive' element={<Archive />} />
                <Route path='/guide' element={<Guide />} />
                <Route path='/helper' element={<Helper />} />
                <Route path='/helper/create' element={<CreateHelper />} />
                <Route path='/setup' element={<Setup />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Container>
    </main>
  );
}

export default App;

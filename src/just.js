import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Center,
  Container,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Textarea,
  // VStack,
  // StackDivider,
} from '@chakra-ui/react';
import './App.css';
import Board from './pages/Board/Board';
import TabComp from './components/TabComp';

const IMGROOT = './assets/images';

function App() {
  const navIconsLoc = [
    `${IMGROOT}/board_nav_btn.png`,
    `${IMGROOT}/archive_nav_btn.png`,
    `${IMGROOT}/guide_nav_btn.png`,
    `${IMGROOT}/contact_nav_btn.png`,
    `${IMGROOT}/setup_nav_btn.png`,
  ];

  const navIcons = navIconsLoc.map((navIcon) => (
    <TabComp key={navIcon} fileLoc={navIcon} />
  ));

  return (
    <main className='App'>
      <Center w='100vw'>
        <Container
          w='720px'
          h='730px'
          bg='#e8e8e6'
          marginTop='20px'
          centerContent
        >
          <Tabs align='center' size='lg' variant='enclosed'>
            <TabList>{navIcons}</TabList>

            <TabPanels>
              <Routes>
                <Route path='/' element={<Board />} exact />
                <Route
                  path='/archive'
                  element={
                    <TabPanel border='1px' borderColor='rgba(0, 0, 0, 0.08)'>
                      <Textarea placeholder='Text' />
                    </TabPanel>
                  }
                />

                <Route
                  path='/guide'
                  element={
                    <TabPanel border='1px' borderColor='rgba(0, 0, 0, 0.08)'>
                      <Textarea placeholder='Text' />
                    </TabPanel>
                  }
                />

                <Route
                  path='/contact'
                  element={
                    <TabPanel border='1px' borderColor='rgba(0, 0, 0, 0.08)'>
                      <Textarea placeholder='Text' />
                    </TabPanel>
                  }
                />
              </Routes>
            </TabPanels>
          </Tabs>
        </Container>
      </Center>
    </main>
  );
}

export default App;
// ReactDOM.render(routes, document.getElementById("root"));

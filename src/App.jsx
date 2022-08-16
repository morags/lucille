/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Center,
  ChakraProvider,
  Container,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Textarea,
  VStack,
  StackDivider,
} from '@chakra-ui/react';
import './App.css';
import Home from './pages/Home';
import TabComp from './components/TabComp';
import Settings from './components/Settings';
import TestFunc from './components/Test';

// Location of the img folder path in the static build
const IMGROOT = '/lucille/img';

// const globalFontSize = 20;
let globalFontSize = 20;
function changeFontSize(num) {
  const changeValue = num;
  const maxFnt = 26;
  const minFnt = 16;
  let result = globalFontSize + changeValue;
  result = Math.min(Math.max(result, minFnt), maxFnt);
  globalFontSize = result;
}

function App() {
  // TODO: What does this do? Delete disableError.

  const navIconsLoc = [`${IMGROOT}/board_nav_btn.png`, `${IMGROOT}/archive_nav_btn.png`, `${IMGROOT}/guide_nav_btn.png`, `${IMGROOT}/contact_nav_btn.png`, `${IMGROOT}/setup_nav_btn.png`];
  const navIcons = navIconsLoc.map((navIcon) => <TabComp fileLoc={navIcon} />);
  return (
    <Router>
      <ChakraProvider className="App">
        <Center w="100vw">
          <Container w="720px" h="730px" bg="#e8e8e6" marginTop="20px" centerContent>

            <Tabs align="center" size="lg" variant="enclosed">

              <TabList>
                {navIcons}
              </TabList>

              <TabPanels>
                <Routes>
                  <Route
                    path="/"
                    element={<Home />}
                    exact
                  />
                  <Route
                    path="/page2"
                    element={(
                      <TabPanel border="1px" borderColor="rgba(0, 0, 0, 0.08)">
                        <Textarea placeholder="Text" />
                      </TabPanel>
                    )}
                  />

                  <Route
                    path="/page3"
                    element={(
                      <TabPanel border="1px" borderColor="rgba(0, 0, 0, 0.08)">
                        <Textarea placeholder="Text" />
                      </TabPanel>
                    )}
                  />

                  <Route
                    path="/page4"
                    element={(
                      <TabPanel border="1px" borderColor="rgba(0, 0, 0, 0.08)">
                        <Textarea placeholder="Text" />
                      </TabPanel>
                    )}
                  />

                  <Route
                    path="/page5"
                    element={(
                      /* Setup page */
                      <TabPanel position="absolute" border="3px" borderColor="#a9a9a9" borderStyle="solid" borderRadius="10px" bg="white" h="550px" w="490px">
                        <VStack
                          divider={<StackDivider borderColor="gray.200" />}
                          spacing={4}
                          align="stretch"
                        >
                          <Settings title="Font size: " btn1={`${IMGROOT}/font_down_btn.png`} btn2={`${IMGROOT}/font_up_btn.png`} />
                          <Settings title="Brightness: " btn1={`${IMGROOT}/bright_down_btn.png`} btn2={`${IMGROOT}/bright_up_btn.png`} />
                          <Settings title="Volume: " type="volume" btn1={`${IMGROOT}/vol_down_btn.png`} btn2={`${IMGROOT}/vol_up_btn.png`} />
                          <Settings title="Vibration: " type="volume" btn1={`${IMGROOT}/vibr_down_btn.png`} btn2={`${IMGROOT}/vibr_up_btn.png`} />
                        </VStack>
                      </TabPanel>
                    )}
                  />

                  <Route path="test" element={<TestFunc />} />
                </Routes>
              </TabPanels>
            </Tabs>

          </Container>
        </Center>

      </ChakraProvider>
    </Router>
  );
}

export default App;
// ReactDOM.render(routes, document.getElementById("root"));

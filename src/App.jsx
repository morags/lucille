import React, { useState } from 'react';
import {
  Box,
  Center,
  ChakraProvider,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  SimpleGrid,
} from '@chakra-ui/react';
import './App.css';

function Boxes(props) {
  return props.items.map((i) => <Box bg="lightgray" height="80px"><Center>{i}</Center></Box>);
}

function TabComp(props) {
  const prop = props;
  return (<Tab padding="3px" bg="#ededeb" margin="10px" boxShadow="5px 5px 5px rgb(137, 137, 137)" border="3px" borderColor="#a9a9a9" borderStyle="solid" borderRadius="10px"><img alt="fjsdkj" src={prop.fileLoc} /></Tab>);
}

function App() {
  // TODO: What does this do? Delete disableError.
  const [items] = useState([1, 2, 3, 4, 5, 6]);
  const navIconsLoc = ['/img/board_nav_btn.png', '/img/archive_nav_btn.png', '/img/guide_nav_btn.png', '/img/contact_nav_btn.png', '/img/setup_nav_btn.png'];
  const navIcons = navIconsLoc.map((navIcon) => <TabComp fileLoc={navIcon} />);

  return (
    <ChakraProvider className="App">
      <Center w="100vw">
        <Container w="720px" h="850px" bg="#e8e8e6" marginTop="20px" centerContent>

          <Tabs align="center" size="lg" variant="enclosed">

            <TabList>
              {navIcons}
            </TabList>

            <TabPanels>

              <TabPanel border="3px" borderColor="#a9a9a9" borderStyle="solid" borderRadius="10px" bg="#cedcbf" h="450px">
                <SimpleGrid columns={3} spacing={10}>
                  <Boxes items={items} />
                </SimpleGrid>
              </TabPanel>

              <TabPanel border="1px" borderColor="rgba(0, 0, 0, 0.08)">
                <Textarea placeholder="Text" />
              </TabPanel>

              <TabPanel border="1px" borderColor="rgba(0, 0, 0, 0.08)">
                <Textarea placeholder="Text" />
              </TabPanel>

              <TabPanel border="1px" borderColor="rgba(0, 0, 0, 0.08)">
                <Textarea placeholder="Text" />
              </TabPanel>

              <TabPanel border="1px" borderColor="rgba(0, 0, 0, 0.08)">
                <Textarea placeholder="Text" />
              </TabPanel>

            </TabPanels>
          </Tabs>

        </Container>
      </Center>

    </ChakraProvider>
  );
}

export default App;

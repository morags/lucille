import React, { useState } from 'react';
import { Box, Center, ChakraProvider, Container, Tabs, TabList, TabPanels, Tab, TabPanel, Textarea, SimpleGrid } from '@chakra-ui/react';
import { CalendarIcon, EditIcon } from '@chakra-ui/icons';
import './App.css';

function Boxes(props) {
  return props.items.map((i) => <Box bg="lightgray" height="80px"><Center>{i}</Center></Box>);
}

function App() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);

  return (
    <ChakraProvider className="App">
      <Container>

        <Tabs variant="enclosed">

          <TabList>
            <Tab><CalendarIcon /></Tab>
            <Tab><EditIcon /></Tab>
          </TabList>

          <TabPanels>

            <TabPanel border="1px" borderColor="rgba(0, 0, 0, 0.08)">
              <SimpleGrid columns={2} spacing={10}>
                <Boxes items={items} />
              </SimpleGrid>
            </TabPanel>

            <TabPanel border="1px" borderColor="rgba(0, 0, 0, 0.08)">
              <Textarea placeholder="Text" />
            </TabPanel>

          </TabPanels>
        </Tabs>

      </Container>

    </ChakraProvider>
  );
}

export default App;

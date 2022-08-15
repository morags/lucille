/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  TabPanels,
  TabPanel,
  Tabs,
  SimpleGrid,
  Box,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import Boxes from '../components/Boxes';
import PinnedList from '../components/PinnedList';
import CircularBtn from '../components/CircularBtn';

function Home() {
  const [items] = useState([1, 2, 3]);
  return (
    <Tabs>
      <TabPanels>
        <TabPanel position="absolute" border="3px" borderColor="#a9a9a9" borderStyle="solid" borderRadius="10px" bg="#cedcbf" h="550px" w="490px">
          <SimpleGrid columns={3} spacing={10}>
            <Boxes items={items} />
            <Box>
              <LinkBox>
                <LinkOverlay href="/board" />
                <PinnedList />
              </LinkBox>
            </Box>
            <Box>
              <LinkBox>
                <LinkOverlay href="/board" />
                <PinnedList />
              </LinkBox>
            </Box>
          </SimpleGrid>
          <SimpleGrid columns={5} spacing={15} position="relative" bottom="-265px">
            <Box />
            <Box />
            <Box />
            <Box />
            <Box>
              <CircularBtn fileLoc="/img/list_footer_btn.png" />
            </Box>
          </SimpleGrid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Home;

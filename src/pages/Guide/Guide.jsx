import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

const guideData = [
  {
    id: uuidv4(),
    title: 'I cannot read the text.',
    guide: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam`,
  },
  {
    id: uuidv4(),
    title: 'I cannot see the app well.',
    guide: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam`,
  },
  {
    id: uuidv4(),
    title: 'I cannot hear the sounds.',
    guide: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam`,
  },
  {
    id: uuidv4(),
    title: 'I cannot share tasks.',
    guide: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam`,
  },
  {
    id: uuidv4(),
    title: 'I have lost my older lists.',
    guide: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam`,
  },
  {
    id: uuidv4(),
    title: 'I want to delete my lists.',
    guide: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam`,
  },
  {
    id: uuidv4(),
    title: 'I want to archive my tasks.',
    guide: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam`,
  },
];

function Guide() {
  return (
    <Box backgroundColor='#ffffff' p='30px' style={{ overflow: 'auto' }}>
      {guideData.map((guide, i) => (
        <Accordion key={guide.id} allowMultiple>
          <AccordionItem
            mb='20px'
            border='2px'
            rounded='xl'
            boxShadow='md'
            borderColor='gray.200'
          >
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Heading as='h3' fontSize='xl'>
                    {i + 1}. {guide.title}
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{guide.guide}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  );
}

export default Guide;

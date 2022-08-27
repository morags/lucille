/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

function Archive({ mdFont, fontBright }) {
  const archives = JSON.parse(localStorage.getItem('archives'));

  return (
    <Box p='20px' backgroundColor='#f1f1f1' h='full'>
      <Heading
        mb='15px'
        style={{ fontSize: `${mdFont}px`, filter: `contrast(${fontBright}%)` }}
        textAlign='right'
      >
        {archives
          ? `Tasks
         Remaining:`
          : ''}
      </Heading>
      {archives ? (
        archives.map((archive, index) => (
          <Box
            key={archive.id}
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            border='4px'
            borderColor='gray.400'
            p='5px 10px'
            rounded='2xl'
            boxShadow='md'
            mb='20px'
            bgColor={archive.data.length <= 0 ? 'blue.200' : '#ffffff'}
          >
            <Heading
              as='h3'
              display='flex'
              style={{
                fontSize: `${mdFont}px`,
                filter: `contrast(${fontBright}%)`,
              }}
              color='blue.700'
            >
              <Text mr='10px' style={{ fontSize: `${mdFont}px` }}>
                {index + 1}.
              </Text>
              {archive.name}
            </Heading>
            <Text
              fontWeight='bold'
              style={{
                fontSize: `${mdFont}px`,
                filter: `contrast(${fontBright}%)`,
              }}
              color='pink.500'
            >
              {archive.data.length}
            </Text>
          </Box>
        ))
      ) : (
        <Heading>No Archives found</Heading>
      )}
    </Box>
  );
}

export default Archive;

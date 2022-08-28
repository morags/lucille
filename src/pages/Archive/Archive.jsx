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
        <Heading >何も付箋紙が保管されていません。まずボード Board を選択し、保管したい付箋紙を長押しします。保管ボタン ARCHIVEを押すと、こちらに保管されます。No Archives found. Press one of your list icons in  Board for a while. Your LIST can be archived when needed.</Heading>
      )}
    </Box>
  );
}

export default Archive;

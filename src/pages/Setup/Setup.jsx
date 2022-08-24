/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import VolumeUp from '../../assets/images/vol_up_btn.png';
import VolumeDown from '../../assets/images/vol_down_btn.png';
import BrightUp from '../../assets/images/bright_up_btn.png';
import BrightDown from '../../assets/images/bright_down_btn.png';
import FontUp from '../../assets/images/font_up_btn.png';
import FontDown from '../../assets/images/font_down_btn.png';
import VibrationUp from '../../assets/images/vibr_up_btn.png';
import VibrationDown from '../../assets/images/vibr_down_btn.png';
import Task from '../../assets/images/task_btn.png';

function Setup() {
  const [fontSize, setFontSize] = useState(16);

  return (
    <Box position='relative'>
      <Box>
        <Heading as='h3' fontSize='3xl' mb='15px'>
          Font Size:
        </Heading>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Image
            src={FontDown}
            w='90px'
            onClick={() => setFontSize(fontSize - 2)}
            style={{ cursor: 'pointer' }}
          />
          <Text style={{ fontSize: `${fontSize}px` }}>
            I can read this well
          </Text>
          <Image
            src={FontUp}
            w='90px'
            onClick={() => setFontSize(fontSize + 2)}
            style={{ cursor: 'pointer' }}
          />
        </Box>
      </Box>

      <Box>
        <Heading as='h3' fontSize='3xl' mb='15px'>
          Font Size:
        </Heading>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Image
            src={BrightDown}
            w='90px'
            onClick={() => setFontSize(fontSize - 2)}
            style={{ cursor: 'pointer' }}
          />
          <Text style={{ fontSize: `${fontSize}px` }}>
            I can read this well
          </Text>
          <Image
            src={BrightUp}
            w='90px'
            onClick={() => setFontSize(fontSize + 2)}
            style={{ cursor: 'pointer' }}
          />
        </Box>
      </Box>

      <Box>
        <Heading as='h3' fontSize='3xl' mb='15px'>
          Volume:
        </Heading>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Image
            src={VolumeDown}
            w='90px'
            onClick={() => setFontSize(fontSize - 2)}
            style={{ cursor: 'pointer' }}
          />
          <Text style={{ fontSize: `${fontSize}px` }}>
            I can read this well
          </Text>
          <Image
            src={VolumeUp}
            w='90px'
            onClick={() => setFontSize(fontSize + 2)}
            style={{ cursor: 'pointer' }}
          />
        </Box>
      </Box>

      <Box>
        <Heading as='h3' fontSize='3xl' mb='15px'>
          Volume:
        </Heading>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Image
            src={VibrationDown}
            w='90px'
            onClick={() => setFontSize(fontSize - 2)}
            style={{ cursor: 'pointer' }}
          />
          <Text style={{ fontSize: `${fontSize}px` }}>
            I can read this well
          </Text>
          <Image
            src={VibrationUp}
            w='90px'
            onClick={() => setFontSize(fontSize + 2)}
            style={{ cursor: 'pointer' }}
          />
        </Box>
      </Box>

      <Box
        style={{ cursor: 'pointer' }}
        w='70px'
        position='absolute'
        right='-15px'
        bottom='0'
      >
        <Image src={Task} />
      </Box>
    </Box>
  );
}

export default Setup;

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from 'react';
import {
  Box,
  Text,
} from '@chakra-ui/react';

function DisplayDemo(props) {
  const colours = ['#FFFFFF', '#FAF9F6', '#F1F0ED', '#E5E4E2', '#D9D8D6'];
  return (
    <Box bgColor={colours[3]} p="10px">
      <Text fontSize={props.fontSizeG}>I can read this well.</Text>
    </Box>
  );
}

export default DisplayDemo;

import React from 'react';
import {
  Box,
  Center,
} from '@chakra-ui/react';

function Boxes(props) {
  return props.items.map((i) => <Box bg="lightgray" height="80px"><Center>{i}</Center></Box>);
}

export default Boxes;

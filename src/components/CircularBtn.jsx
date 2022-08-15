/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button,
} from '@chakra-ui/react';

function CircularBtn(props) {
  const prop = props;
  let size = '75px';
  if (prop.size === 'small') {
    size = '60px';
  }
  return (
    <Button
      border="3px"
      borderColor="#a9a9a9"
      bgImage={`url( ${prop.fileLoc} )`}
      borderRadius="37.5px"
      w={size}
      h={size}
      bgSize="100%"
      bgPosition="center"
      bgRepeat="no-repeat"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="5px 5px 5px rgb(137, 137, 137)"
      onClick={() => props.clickHandler(1)}
    />
  );
}

export default CircularBtn;

import React from 'react';
import {
  Box,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Input,
} from '@chakra-ui/react';
import EditableControls from './EditableControls';

function PinnedList() {
  return (
    <Box
      w="150px"
      h="153.75px" // h = (205/200) x w
      bgImage="url('/img/parchment.png')"
      bgSize="100%"
      bgPosition="center"
      bgRepeat="no-repeat"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="5px 5px 5px rgb(137, 137, 137)"
    >
      <Editable defaultValue="Weekend shop">
        <EditablePreview />
        <EditableTextarea />
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>
    </Box>
  );
}

export default PinnedList;

/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import DisplayDemo from './DisplayDemo';
import VolumeDemo from './VolumeDemo';
import CircularBtn from './CircularBtn';

function Settings(props) {
  const prop = props;
  // title, btn1, brn-2, demo element
  let demo = <DisplayDemo fontSizeG={props.fontSizeG} />;
  if (prop.type === 'volume') {
    demo = <VolumeDemo />;
  }
  return (
    <Box h="100px" bg="transparent">
      <Grid
        templateAreas={`"title title title"
                        "circBtn1 demo circBtn2"`}
        gridTemplateRows="30px 70px"
        gridTemplateColumns="100px 1fr 100px"
        gap="3"
      >
        <GridItem pl="5" align="left" justifyContent="Center" fontSize="23px" area="title">{prop.title}</GridItem>
        <GridItem pl="2" area="circBtn1"><CircularBtn fileLoc={prop.btn1} size="small" /></GridItem>
        <GridItem pl="2" area="demo">{demo}</GridItem>
        <GridItem pl="2" area="circBtn2"><CircularBtn fileLoc={prop.btn2} size="small" /></GridItem>
      </Grid>
    </Box>
  );
}

export default Settings;

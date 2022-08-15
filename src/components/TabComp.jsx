import React from 'react';
import { Tab } from '@chakra-ui/react';

function TabComp(props) {
  const prop = props;
  return (<Tab padding="3px" bg="#ededeb" margin="10px" boxShadow="5px 5px 5px rgb(137, 137, 137)" border="3px" borderColor="#a9a9a9" borderStyle="solid" borderRadius="10px"><img alt="fjsdkj" src={prop.fileLoc} /></Tab>);
}

export default TabComp;

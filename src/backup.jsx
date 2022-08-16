/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Center,
  ChakraProvider,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  SimpleGrid,
  Flex,
  Spacer,
  Button,
  ButtonGroup,
  Stack,
} from '@chakra-ui/react';
import { CalendarIcon, EditIcon } from '@chakra-ui/icons';
import './App.css';

function Boxes(props) {
  return props.items.map((i) => <Box bg="lightgray" height="80px"><Center>{i}</Center></Box>);
}

function NavBtn(props) {
  return <a className="NavBtn" aria-label="Page" href={props.link}><img alt="icon" src={props.fileLoc} /></a>;
}

function FooterBtn(props) {
  return <a className="footerBtn" aria-label="Page" href={props.link}><img alt="icon" src={props.fileLoc} /></a>;
}

function Navigation() {
  return (
    <navBar>
      <NavBtn fileLoc="/img/board_nav_btn.png" link="/board" />
      <NavBtn fileLoc="/img/archive_nav_btn.png" link="/board" />
      <NavBtn fileLoc="/img/guide_nav_btn.png" link="/board" />
      <NavBtn fileLoc="/img/contact_nav_btn.png" link="/board" />
      <NavBtn fileLoc="/img/setup_nav_btn.png" link="/board" />
    </navBar>
  );
}

function Parchment(props) {
  return (
    <parchContainer>
      <a className="ParchBtn" aria-label="Page" href={props.link}><img alt="icon" src="/img/parchment.png" /></a>
      <textarea className="listTitle" type="text" value={props.title} />
    </parchContainer>
  );
}

function BoardPage(props) {
  return (
    <kanbanBoard>
      <Parchment title="Weekend Shop" link="/board" />
      <Parchment title="Gardening list" link="/board" />
      <Parchment title="Gardening list" link="/board" />
    </kanbanBoard>
  );
}

function Footer(props) {
  return (
    <footerBar>
      <FooterBtn fileLoc="/img/list_footer_btn.png" link="/board" />
    </footerBar>
  );
}

function App() {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);
  // pages = [board, archive, guide, contacts, setup]
  return (
    <body>
      <Navigation />
      {/* if pageChosen = boardPage then */}
      <BoardPage />
      <Footer />
    </body>
  );
}

export default App;

// eslint-disable-next-line no-trailing-spaces, no-lone-blocks
{ /* <Tab color="#ededeb" boxShadow="dark-lg" border="3px" borderColor="#a9a9a9" 
borderStyle="solid" borderRadius="15px"><img alt="fjsdkj" src="/img/board_nav_btn.png"
 /></Tab> */ }

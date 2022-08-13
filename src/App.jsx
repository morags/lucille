/* eslint-disable react/jsx-props-no-spreading */
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
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  // Image,
  Input,
  Flex,
  ButtonGroup,
  IconButton,
  useEditableControls,
  Button,
  LinkBox,
  LinkOverlay,
  // VisuallyHidden,
  // VisuallyHiddenInput,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import './App.css';
// import {
//   BrowserRouter,
//   Route,
//   Redirect,
//   Switch,
//   Link,
// } from 'react-router-dom';

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
    </Flex>
  );
}

function Boxes(props) {
  return props.items.map((i) => <Box bg="lightgray" height="80px"><Center>{i}</Center></Box>);
}

function TabComp(props) {
  const prop = props;
  return (<Tab padding="3px" bg="#ededeb" margin="10px" boxShadow="5px 5px 5px rgb(137, 137, 137)" border="3px" borderColor="#a9a9a9" borderStyle="solid" borderRadius="10px"><img alt="fjsdkj" src={prop.fileLoc} /></Tab>);
}

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

function CircularBtn() {
  return (
    <Button
      border="3px"
      borderColor="#a9a9a9"
      // bgImage='url( ${prop.fileLoc} )'
      bgImage="url('/img/list_footer_btn.png')"
      borderRadius="37.5px"
      w="75px"
      h="75px" // h = (205/200) x w
      bgSize="100%"
      bgPosition="center"
      bgRepeat="no-repeat"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="5px 5px 5px rgb(137, 137, 137)"
    />
  );
}

// function ListPage() {
//   return (<p>This is list page</p>);
// }

// function Profile() { return (<p>Youre on the Profile Tab</p>); }
// function Comments() { return (<p>Youre on the Comments Tab</p>); }

function App() {
  // TODO: What does this do? Delete disableError.
  const [items] = useState([1, 2, 3]);
  const navIconsLoc = ['/img/board_nav_btn.png', '/img/archive_nav_btn.png', '/img/guide_nav_btn.png', '/img/contact_nav_btn.png', '/img/setup_nav_btn.png'];
  const navIcons = navIconsLoc.map((navIcon) => <TabComp fileLoc={navIcon} />);
  // const routes = (
  //   <BrowserRouter>
  //     <Switch>
  //       <Route path="/home" component={App} />
  //       <Redirect from="/" to="/home" />
  //     </Switch>
  //   </BrowserRouter>
  // );
  return (
    <ChakraProvider className="App">
      <Center w="100vw">
        <Container w="720px" h="730px" bg="#e8e8e6" marginTop="20px" centerContent>

          <Tabs align="center" size="lg" variant="enclosed">

            <TabList>
              {navIcons}
            </TabList>

            <TabPanels>

              <TabPanel position="absolute" border="3px" borderColor="#a9a9a9" borderStyle="solid" borderRadius="10px" bg="#cedcbf" h="550px" w="490px">
                <SimpleGrid columns={3} spacing={10}>
                  <Boxes items={items} />
                  <Box>
                    <LinkBox>
                      <LinkOverlay href="/board" />
                      <PinnedList />
                    </LinkBox>
                  </Box>
                  <Box>
                    <LinkBox>
                      <LinkOverlay href="/board" />
                      <PinnedList />
                    </LinkBox>
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={5} spacing={15} position="relative" bottom="-265px">
                  <Box />
                  <Box />
                  <Box />
                  <Box />
                  <Box>
                    <CircularBtn />
                  </Box>
                </SimpleGrid>
              </TabPanel>

              <TabPanel border="1px" borderColor="rgba(0, 0, 0, 0.08)">
                <Textarea placeholder="Text" />
                {/* <div className="tabs">
                  <Switch>
                    <Route path="/home" exact component={Profile} />
                    <Route path="/home/comments" component={Comments} />
                  </Switch>
                </div>
                <Link to="/" className="link">Profile</Link>
                <Link to="/home/comments" className="link">Comments</Link> */}
              </TabPanel>

              <TabPanel border="1px" borderColor="rgba(0, 0, 0, 0.08)">
                <Textarea placeholder="Text" />
              </TabPanel>

              <TabPanel border="1px" borderColor="rgba(0, 0, 0, 0.08)">
                <Textarea placeholder="Text" />
              </TabPanel>

              <TabPanel border="1px" borderColor="rgba(0, 0, 0, 0.08)">
                <Textarea placeholder="Text" />
              </TabPanel>

            </TabPanels>
          </Tabs>

        </Container>
      </Center>

    </ChakraProvider>
  );
}

export default App;
// ReactDOM.render(routes, document.getElementById("root"));

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
  VStack,
  Flex,
  ButtonGroup,
  IconButton,
  useEditableControls,
  Button,
  StackDivider,
  LinkBox,
  LinkOverlay,
  Grid,
  GridItem,
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
    />
  );
}
// Setup page: individual settings
function Settings(props) {
  const prop = props;
  // title, btn1, brn-2, demo element
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
        <GridItem pl="2" area="demo">btn</GridItem>
        <GridItem pl="2" area="circBtn2"><CircularBtn fileLoc={prop.btn1} size="small" /></GridItem>

      </Grid>
    </Box>
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
                    <CircularBtn fileLoc="/img/list_footer_btn.png" />
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

              {/* Setup page */}
              <TabPanel position="absolute" border="3px" borderColor="#a9a9a9" borderStyle="solid" borderRadius="10px" bg="white" h="550px" w="490px">
                <VStack
                  divider={<StackDivider borderColor="gray.200" />}
                  spacing={4}
                  align="stretch"
                >
                  <Settings title="Font size: " btn1="/img/font_down_btn.png" btn2="/img/font_up_btn.png" />
                  <Settings title="Brightness: " btn1="/img/bright_down_btn.png" btn2="/img/bright_up_btn.png" />
                  <Settings title="Volume: " btn1="/img/vol_down_btn.png" btn2="/img/vol_up_btn.png" />
                  <Settings title="Vibration: " btn1="/img/vibr_down_btn.png" btn2="/img/vibr_up_btn.png" />
                </VStack>
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

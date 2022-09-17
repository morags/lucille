/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Divider,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLongPress } from "use-long-press";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../utils/db";
import {
  CancelIcon,
  DeleteIcon,
  MoveArchiveIcon,
  ShareIcon,
  ListIcon,
  NotebookBG,
} from "../../assets";
import { Archive } from ".";

function Board({ mdFont, fontBright, smFont, pathName }) {
  // React hook to handle the popup state, this is used to render the extra options when long pressing
  const [buttonPopup, setButtonPopup] = useState(false);
  // React hook to store and update the selected list ID
  const [selectedId, setSelectedId] = useState("");
  // React hook to store and update the selected list name
  const [selectedName, setSelectedName] = useState("");
  // React hook to handle the popup state for the sharing functionality
  const [sharePopup, setSharePopup] = useState(false);

  // Get all the helpers from the db
  const allHelpers = useLiveQuery(() => db.helpers.toArray());
  // Get all the tasks from the db
  const allTasks = useLiveQuery(() => db.tasks.toArray());

  // Get the pathname from the URL and pass it to the App component
  useEffect(() => {
    pathName(window.location.pathname);
  })
  
  // Get all the boards/lists which are not archived or deleted
  const boardList = useLiveQuery(() =>
    db.boards.where({ archived: "false", deleted: "false" }).toArray()
  );

  // Get and update the selected board/list ID and Name
  const selectIdName = (boardId, boardName) => {
    setSelectedId(boardId);
    setSelectedName(boardName);
  };

  // bind funtion to use whith the useLongPress hook (external library)
  const bind = useLongPress(() => {
    boardList.map((board) => {
      if (board.id === selectedId) {
        setButtonPopup(true);
      }
      return board;
    });
  });

  // The function that handles the board/list deletion
  const deleteBoard = (id) => {
    // First reverse the popup value
    setButtonPopup(false);
    // then update the db with the new value for that specific board/list
    db.boards.update(id, { deleted: "true" });
  };

  // The function that handles the archiving of the board/list
  const archiveBoard = (id) => {
    // Update the db with the new value for that specific board/list
    db.boards.update(id, { archived: "true" });
    // Then change the popup value to hide the option
    setButtonPopup(!buttonPopup);
  };

  // This function makes sure the onClick event for the sharing function is fired only if clicking on the exact component
  const shareBoard = (e) => {
    e.stopPropagation();
    setSharePopup(!sharePopup);
  };

  // This is used to change the screen view to the newly created board/list
  const newListRef = useRef(null)
  const executeScroll = () => newListRef.current.scrollIntoView()    

  // The function that handles the adding of new board/list in the db
  const addBoard = async () => {
    try {
      await db.boards.add({
        name: "",
        archived: "false",
        deleted: "false",
        taskscount: 0,
        new: "true",
      })
    } catch (e) {
      console.log("Failed to add new board => ", e);
    }
    executeScroll()
  };

  // Update the newly creatd board/list value when clicking anywhere on the screen
  const changeBoardNewValue = async (board) => {
    try {
      db.boards.update(board[0], { new: "false", name: board[1]});
    } catch (e) {
      console.log("Failed to update board => ", e);
    }
    
  };

  

  return (
    <Box height="107vh" margin="0px">
      <Box height="96vh" p="1vh" backgroundColor="#cedcbf" border="0.2vh" borderColor='gray.500'>
        <Grid 
          padding="1vh"         
          templateColumns="repeat(3, 1fr)"
          gap={5}
          overflowY="auto"
          width="54vh"
          height="80%"          
          // bgColor={'#aadcbf'} //green board grid
          justifySelf= "center"
          margin={'1vh'}
        >
          {boardList?.map((board) => // Check if there are any boards in the db, if yes then render the grid with items
            board.new === "true" ? (
              <GridItem
                key={board.id}
                bgImage={NotebookBG}
                border="0.5px"
                borderColor="#990000"
                p="10px"
                style={{ cursor: "pointer" }}
                position="relative"
                ref={newListRef}
                w="14.5vh"
                h="14.86vh" // h = (205/200) x w              
                bgSize="100%"
                bgPosition="center"
                bgRepeat="no-repeat"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="0.5vh 0.5vh 0.5vh rgb(137, 137, 137)"
              >
                <Textarea
                  key={board.id}
                  variant="filled"
                  h="14.86vh"
                  resize="none"
                  onBlur={(e) => changeBoardNewValue([board.id, e.target.value])}
                  placeholder="Add List name"
                  border="0px"
                  style={{ fontSize: `${mdFont - 2}px` }}
                  fontWeight="bold" />
              </GridItem>
            ) : (
              <Link
                to={`/board/${board.id}`}
                key={board.id}
                style={{ height: "150px" }}
              >
                <GridItem
                  key={board.id}
                  bgImage={NotebookBG}
                  border="0.5px"
                  borderColor="#990000"
                  alignItems="center"
                  justifyContent="center"
                  p="10px"
                  {...bind()}
                  onMouseEnter={() => selectIdName(board.id, board.name)}
                  style={{ cursor: "pointer" }}
                  position="relative"
                  w="14.5vh"
                  h="14.86vh" // h = (205/200) x w  
                  bgSize="100%"
                  bgPosition="center"
                  bgRepeat="no-repeat"
                  display="flex"
                  boxShadow="0.5vh 0.5vh 0.5vh rgb(137, 137, 137)"
                >
                  <Heading
                    textAlign="center"
                    style={{
                      fontSize: `${mdFont - 2}px`,
                      filter: `contrast(${fontBright}%)`,
                    }}
                  >
                    {board.name}
                  </Heading>
                </GridItem>
              </Link>
            )
          )}

          {buttonPopup && ( // If popup state value is true, show the extra options
            <Box
              backgroundColor="#cccccc"
              position="absolute"
              zIndex="1"
              width="full"
              h="full"
              opacity="0.9"
              display="flex"
              alignItems="start"
              p="20px"
              justifyContent="center"
              flexDirection="column"
              left="0"
              top="0"
              onClick={() => setButtonPopup(!buttonPopup)}
            >
              <Heading
                as="h2"
                mb="20px"
                ml="20px"
                style={{
                  fontSize: `${mdFont}px`,
                  filter: `contrast(${fontBright}%)`,
                }}
              >
                {selectedName}
              </Heading>
              <Box display="flex">
                <Image
                  src={DeleteIcon}
                  w="120px"
                  m="0px 10px"
                  cursor="pointer"
                  onClick={() => deleteBoard(selectedId)} />
                <Image
                  src={MoveArchiveIcon}
                  w="120px"
                  m="0px 10px"
                  cursor="pointer"
                  onClick={() => archiveBoard(selectedId)} />
                <Box position="relative">
                  <Image
                    src={ShareIcon}
                    w="120px"
                    m="0px 10px"
                    cursor="pointer"
                    onClick={shareBoard} />
                  <Box position="absolute" display="flex">
                    {sharePopup && // If popup state value is true, show the extra options for sharing
                      allHelpers?.map((helper) => (
                        <Box
                          key={helper.id}
                          onClick={() => window.open("mailto:" + helper.email + "?subject=I need your help with these tasks&body=" + allTasks?.filter((task) => task.boardid === String(selectedId)).map((task) => task.task).toString())} // eslint-disable-line
                          backgroundColor="#ffffff"
                          w="80px"
                          h="80px"
                          m="10px"
                          p="10px"
                          rounded="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Heading style={{ fontSize: `${smFont}px` }}>
                            {helper.name}
                          </Heading>
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Box>
              <Image
                src={CancelIcon}
                w="40px"
                position="absolute"
                top="25px"
                right="25px"
                cursor="pointer"
                onClick={() => setButtonPopup(!buttonPopup)} />
            </Box>
          )}
        </Grid>
        {/* //divider and archive area bgColor={'#9f755e'} */}
        <Box width="54vh">
          <Divider style={{ border: "0.3vh solid gray",backgroundColor:"gray", borderRadius: "5px" }} />
          <Box height="18%" overflowY="auto">
            <Archive mdFont={mdFont} fontBright={fontBright} />
          </Box>
        </Box>
        
      </Box>
      {/* // Add list button here */}
      <Box position="absolute" height="11vh">
        <Button
          border="0.1vh"
          borderColor="#a9a9a9"
          bgImage={`url( ${ListIcon} )`}
          _hover={{ bg: '#a9a9a980', bgImage: `url( ${ListIcon} )`, bgSize: "110%", bgPosition: "center" }}
          borderRadius="4.5vh"
          w="9vh"
          h="9vh"
          bgSize="100%"
          bgPosition="center"
          bgRepeat="no-repeat"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0.48vh 0.48vh 0.48vh rgb(137, 137, 137)"
          onClick={addBoard}
          position="relative"
          left="47vh"          
          top="1vh" />
      </Box>

    </Box>
  );
}

export default Board;

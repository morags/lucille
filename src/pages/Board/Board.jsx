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
  
  // Get all the board/lsits which are not archived or deleted
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
    await db.boards.add({
      name: "",
      archived: "false",
      deleted: "false",
      taskscount: 0,
      new: "true",
    });
    executeScroll()
  };

  // Update the newly creatd board/list value when clicking anywhere on the screen
  const changeBoardNewValue = async (board) => {
    db.boards.update(board[0], { new: "false", name: board[1]});
  };

  

  return (
    <Box position="relative" height="100%" p="15px" backgroundColor="#cedcbf" border='2px' borderColor='gray.500'>
      <Grid
        p="0 20px"
        templateColumns="repeat(3, 1fr)"
        gap={5}
        overflowY="auto"
        height="80%"
      >
        {boardList?.map((board) => // Check if there are any boards in the db, if yes then render the grid with items
          board.new === "true" ? (
            <GridItem
              // w="100%"
              key={board.id}
              bgImage={NotebookBG}
              // bgRepeat="no-repeat"
              // bgPosition="top"
              // h="150px"
              border="0.5px"
              borderColor="#990000"
              // display="flex"
              // alignItems="center"
              // justifyContent="center"
              p="10px"
              style={{ cursor: "pointer" }}
              position="relative"
              ref={newListRef}

              w="150px"
              h="153.75px" // h = (205/200) x w              
              bgSize="100%"
              bgPosition="center"
              bgRepeat="no-repeat"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="5px 5px 5px rgb(137, 137, 137)"
            >
              <Textarea
                key={board.id}
                variant="filled"
                h="120.75px"
                resize="none"
                onBlur={(e) => changeBoardNewValue([board.id, e.target.value])}
                placeholder="Add List name"
                border="0px"
                // borderColor="#DCD3D3"
                style={{ fontSize: `${mdFont - 10}px`}}
                fontWeight="bold"
              />
            </GridItem>
          ) : (
            <Link
              to={`/board/${board.id}`}
              key={board.id}
              style={{ height: "150px" }}
            >
              <GridItem
                // w="100%"
                key={board.id}
                bgImage={NotebookBG}
                // bgRepeat="no-repeat"
                // bgPosition="top"
                // h="150px"
                border="0.5px"
                borderColor="#990000"
                // display="flex"
                alignItems="center"
                justifyContent="center"
                p="10px"
                {...bind()}
                onMouseEnter={() => selectIdName(board.id, board.name)}
                style={{ cursor: "pointer" }}
                position="relative"

                w="150px"
                h="153.75px" // h = (205/200) x w                
                bgSize="100%"
                bgPosition="center"
                bgRepeat="no-repeat"
                display="flex"
                // alignItems="center"
                // justifyContent="center"
                boxShadow="5px 5px 5px rgb(137, 137, 137)"
              >
                <Heading
                  textAlign="center"
                  style={{
                    fontSize: `${mdFont - 10}px`,
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
                onClick={() => deleteBoard(selectedId)}
              />
              <Image
                src={MoveArchiveIcon}
                w="120px"
                m="0px 10px"
                cursor="pointer"
                onClick={() => archiveBoard(selectedId)}
              />
              <Box position="relative">
                <Image
                  src={ShareIcon}
                  w="120px"
                  m="0px 10px"
                  cursor="pointer"
                  onClick={shareBoard}
                />
                <Box position="absolute" display="flex">
                  {sharePopup && // If popup state value is true, show the extra options for sharing
                    allHelpers?.map((helper) => (
                      <Box
                        key={helper.id}
                        onClick={() => window.open("mailto:" +helper.email +"?subject=I need your help with these tasks&body=" + allTasks?.filter((task) => task.boardid === String(selectedId)).map((task) => task.task).toString())} // eslint-disable-line
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
              onClick={() => setButtonPopup(!buttonPopup)}
            />
          </Box>
        )}
      </Grid>
      <Divider style={{ border: "3px solid red", borderRadius: "5px" }} />
      <Box height="18%">
        <Archive mdFont={mdFont} fontBright={fontBright} />
      </Box>
      <Box
        style={{ cursor: "pointer" }}
        w="70px"
        position="absolute"
        right="10px"
        bottom="1px"
        onClick={addBoard}
      >
        <Image src={ListIcon} />
      </Box>
    </Box>
  );
}

export default Board;

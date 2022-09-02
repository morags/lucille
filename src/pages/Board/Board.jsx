/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, useRef } from "react";
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

function Board({ mdFont, fontBright, smFont }) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [sharePopup, setSharePopup] = useState(false);

  const allHelpers = useLiveQuery(() => db.helpers.toArray());
  const allTasks = useLiveQuery(() => db.tasks.toArray());

  const boardList = useLiveQuery(() =>
    db.boards.where({ archived: "false", deleted: "false" }).toArray()
  );

  const selectIdName = (boardId, boardName) => {
    setSelectedId(boardId);
    setSelectedName(boardName);
  };

  const bind = useLongPress(() => {
    boardList.map((board) => {
      if (board.id === selectedId) {
        setButtonPopup(true);
      }
      return board;
    });
  });

  const deleteBoard = (id) => {
    setButtonPopup(false);
    db.boards.update(id, { deleted: "true" });
  };

  const archiveBoard = (id) => {
    db.boards.update(id, { archived: "true" });
    setButtonPopup(!buttonPopup);
  };

  const shareBoard = (e) => {
    e.stopPropagation();
    setSharePopup(!sharePopup);
  };

  const newListRef = useRef(null)

  const executeScroll = () => newListRef.current.scrollIntoView()    

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

  const changeBoardNewValue = async (board) => {
    db.boards.update(board[0], { new: "false", name: board[1]});
  };

  return (
    <Box position="relative" height="100%" p="15px" backgroundColor="#cedcbf">
      <Grid
        p="0 20px"
        templateColumns="repeat(3, 1fr)"
        gap={5}
        overflowY="auto"
        height="80%"
      >
        {boardList?.map((board) =>
          board.new === "true" ? (
            <GridItem
              w="100%"
              key={board.id}
              bgImage={NotebookBG}
              bgRepeat="no-repeat"
              bgPosition="top"
              h="150px"
              border="1px"
              borderColor="#990000"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p="10px"
              style={{ cursor: "pointer" }}
              position="relative"
              ref={newListRef}
            >
              <Textarea
                key={board.id}
                variant="filled"
                resize="none"
                onBlur={(e) => changeBoardNewValue([board.id, e.target.value])}
                placeholder="Add List name"
                border="2px"
                borderColor="#DCD3D3"
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
                w="100%"
                key={board.id}
                bgImage={NotebookBG}
                bgRepeat="no-repeat"
                bgPosition="top"
                h="150px"
                border="1px"
                borderColor="#990000"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p="10px"
                {...bind()}
                onMouseEnter={() => selectIdName(board.id, board.name)}
                style={{ cursor: "pointer" }}
                position="relative"
              >
                <Heading
                  textAlign="center"
                  style={{
                    fontSize: `${mdFont}px`,
                    filter: `contrast(${fontBright}%)`,
                  }}
                >
                  {board.name}
                </Heading>
              </GridItem>
            </Link>
          )
        )}

        {buttonPopup && (
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
                  {sharePopup &&
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

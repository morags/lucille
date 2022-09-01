/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Grid, Box, Heading, Text, GridItem, Image } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useLongPress } from "use-long-press";
import { db } from "../../utils/db";
import { CancelIcon, RestoreList } from "../../assets";

function Archive({ mdFont, fontBright }) {
  const [selectedId, setSelectedId] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  let archives = useLiveQuery(() =>
    db.boards.where("archived").equals("true").toArray()
  );

  if (typeof archives !== "undefined") {
    if (archives.length === 0) {
      archives = undefined;
    }
  }
  const selectIdName = (boardId, boardName) => {
    setSelectedId(boardId);
    setSelectedName(boardName);
  };

  const bind = useLongPress(() => {
    archives.map((archivedBoard) => {
      if (archivedBoard.id === selectedId) {
        setButtonPopup(true);
      }
      return archivedBoard;
    });
  });

  const archiveBoard = (id) => {
    db.boards.update(id, { archived: "false" });
    setButtonPopup(!buttonPopup);
  };

  return (
    <Box p="10px" h="full" overflowY="auto">
      <Heading
        style={{ fontSize: `${mdFont}px`, filter: `contrast(${fontBright}%)` }}
        textAlign="center"
      >
        {archives ? `Archived lists` : ""}
      </Heading>
      <Heading
        mb="15px"
        style={{
          fontSize: `${mdFont - 10}px`,
          filter: `contrast(${fontBright}%)`,
        }}
        textAlign="right"
      >
        {archives ? `Tasks Remaining:` : ""}
      </Heading>
      <Grid
        p="0 20px"
        templateColumns="repeat(4, 1fr)"
        gap={5}
        overflowY="auto"
        height="50%"
      >
        {archives
          ? archives.map((archive) => (
              <GridItem
                key={archive.id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                border="4px"
                borderColor="gray.400"
                p="5px 10px"
                rounded="2xl"
                boxShadow="md"
                mb="20px"
                bgColor={archive.taskscount <= 0 ? "blue.200" : "#ffffff"}
                {...bind()}
                onMouseEnter={() => selectIdName(archive.id, archive.name)}
                style={{ cursor: "pointer" }}
                position="relative"
              >
                <Heading
                  as="h3"
                  display="flex"
                  style={{
                    fontSize: `${mdFont}px`,
                    filter: `contrast(${fontBright}%)`,
                  }}
                  color="blue.700"
                >
                  {archive.name}
                </Heading>
                <Text
                  fontWeight="bold"
                  style={{
                    fontSize: `${mdFont}px`,
                    filter: `contrast(${fontBright}%)`,
                  }}
                  color="pink.500"
                >
                  {archive.taskscount}
                </Text>
              </GridItem>
            ))
          : ""}
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
                src={RestoreList}
                w="120px"
                m="0px 10px"
                cursor="pointer"
                onClick={() => archiveBoard(selectedId)}
              />
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
    </Box>
  );
}

export default Archive;

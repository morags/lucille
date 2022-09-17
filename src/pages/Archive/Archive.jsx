/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Grid, Box, Heading, Text, GridItem, Image } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useLongPress } from "use-long-press";
import { db } from "../../utils/db";
import { CancelIcon, RestoreList, GreyedOutList } from "../../assets";

function Archive({ mdFont, fontBright }) {
  // React hook to manage the selected board/list id
  const [selectedId, setSelectedId] = useState("");
  // React hook to manage the state of popup control variable
  const [buttonPopup, setButtonPopup] = useState(false);
  // React hook to manage the selected board/list name
  const [selectedName, setSelectedName] = useState("");

  // Get all archived boards/list from the db by querying it from the boards table and checking for the archived column
  let archives = useLiveQuery(() =>
    db.boards.where("archived").equals("true").toArray()
  );

  if (typeof archives !== "undefined") {
    if (archives.length === 0) {
      archives = undefined;
    }
  }

  // Function to manage and set the selected boardid and name by calling the hooks callbacks functions
  const selectIdName = (boardId, boardName) => {
    setSelectedId(boardId);
    setSelectedName(boardName);
  };

  // bind funtion to use with the useLongPress hook (external library)
  const bind = useLongPress(() => {
    archives.map((archivedBoard) => {
      if (archivedBoard.id === selectedId) {
        setButtonPopup(true);
      }
      return archivedBoard;
    });
  });

  // Function to change the state of an archived board
  const archiveBoard = (id) => {
    db.boards.update(id, { archived: "false" });
    setButtonPopup(!buttonPopup);
  };

  return (
    <Box h="full" overflowY="auto">
      <Heading
        style={{ fontSize: `${mdFont - 2.5}px`, filter: `contrast(${fontBright}%)` }}
        textAlign="center"
      >
        {archives ? `Archived lists` : ""}
      </Heading>
      <Grid
        padding="1vh"         
        templateColumns="repeat(3, 1fr)"
        gap={5}
        overflowY="auto"
        width="54vh"
        height="80%"          
        // bgColor={'#aadcbf'} //green board grid
        justifySelf= "center"
        margin='1vh'
      >
        {archives
          ? archives.map((archive) => ( // Check if there are any archived boards/lists, if yes then render the below grid
              <GridItem
                key={archive.id}

                bgImage={GreyedOutList}
                border="0.5px"
                borderColor="#990000"
                p="10px"
                style={{ cursor: "pointer" }}
                position="relative"                
                w="14.5vh"
                h="14.86vh" // h = (205/200) x w              
                bgSize="100%"
                bgPosition="center"
                bgRepeat="no-repeat"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="0.5vh 0.5vh 0.5vh rgb(137, 137, 137)"


                bgColor={archive.taskscount <= 0 ? "blue.200" : "#ffffff"}
                {...bind()}
                onMouseEnter={() => selectIdName(archive.id, archive.name)}                
                
              >
                <Box display="flex" flexDirection="column">
                  <Heading
                    as="h3"
                    display="flex"
                    style={{
                      fontSize: `${mdFont - 5}px`,
                      filter: `contrast(${fontBright}%)`,
                    }}
                    color="blue.700"
                  >
                    {archive.name}
                  </Heading>
                  <Text
                    fontWeight="bold"
                    style={{
                      fontSize: `${mdFont - 5}px`,
                      filter: `contrast(${fontBright}%)`,
                    }}                    
                    color="pink.500"
                  >
                    Tasks left: {archive.taskscount}
                  </Text>
                </Box>

              </GridItem>
            ))
          : ""}
        {buttonPopup && ( // Check the popup control variable and show the extra options if the value is yes
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

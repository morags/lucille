/* eslint-disable react/prop-types */
import React from "react";
import { Box, Image, Heading, Text, Grid, GridItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../utils/db";
import { NewUser } from "../../assets";

function Helper({ mdFont, smFont, fontBright }) {

  // Get the added helpers from the browser DB
  const helpers = useLiveQuery(() => db.helpers.toArray());

  return (
    <Box border='2px' borderColor='gray.600' h="100%" position="relative">
      <Box height="100%" overflowY="auto">
        <Grid templateColumns="repeat(3, 1fr)" gap={5} p="20px" overflowY="auto">
          {helpers?.map((user) => ( // JS ternanry conditional operator to check if there users in the db, then render the below component with the users. If not, don't render any child component
            <GridItem
              key={user.id}
              bgColor="#ffffff"
              textAlign="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p="5px"
              rounded="xl"
              w="100%"
            >
              <Image
                src={user.profilepicture}
                w="150px"
                h="150px"
                rounded="full"
              />
              <Heading
                style={{
                  fontSize: `${mdFont}px`,
                  filter: `contrast(${fontBright}%)`,
                }}
              >
                {user.name}
              </Heading>
              <Text
                style={{
                  fontSize: `${smFont}px`,
                  filter: `contrast(${fontBright}%)`,
                }}
              >
                {user.email}
              </Text>
            </GridItem>
          ))}
        </Grid>
      </Box>
      <Box
        style={{ cursor: "pointer" }}
        w="70px"
        position="absolute"
        right="-0"
        bottom="10px"
      >
        <Link to="../helper/create">
          <Image src={NewUser} />
        </Link>
      </Box>
    </Box>
  );
}

export default Helper;

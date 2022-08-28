/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Image, Heading, Text, Grid, GridItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '../../utils/db';
import { NewUser} from '../../assets';

function Helper({ mdFont, smFont, fontBright }) {

  const helpers = useLiveQuery(
    () => db.helpers.toArray()
  );

  return (
    <Box border='3px' h='100%' borderColor='gray.300' position='relative'>
      <Grid templateColumns='repeat(2, 1fr)' gap={10} p='20px' overflowY='auto'>
        {helpers?.map((user) => (
              <GridItem
                key={user.id}
                bgColor='#ffffff'
                textAlign='center'
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                p='20px'
                rounded='xl'
                w='100%'
              >
                <Image src={user.profilepicture} w='150px' h='150px' rounded='full' />
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
            ))
          }
      </Grid>
      <Box
        style={{ cursor: 'pointer' }}
        w='70px'
        position='absolute'
        right='-0'
        bottom='-70px'
      >
        <Link to='create'>
          <Image src={NewUser} />
        </Link>
      </Box>
    </Box>
  );
}

export default Helper;

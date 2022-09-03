/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from "@chakra-ui/react";
import guideData from "./guideData";

function Guide({ smFont, fontBright, pathName }) {
  useEffect(() => {
    pathName(window.location.pathname);
  });

  return (
    <Box
      backgroundColor="#cedcbf"
      border="2px"
      borderColor="gray.500"
      p="30px"
      style={{ overflow: "auto" }}
      height="full"
    >
      {guideData?.map((guide, i) => ( // Go through all the items in the guideData file via the map method to render them on the screen via an Accordian component
        <Accordion key={guide.id} defaultIndex={[guide.id]} allowMultiple>
          <AccordionItem
            mb="20px"
            border="2px"
            rounded="xl"
            boxShadow="md"
            borderColor="gray.200"
            backgroundColor="white"
          >
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading
                    as="h3"
                    style={{
                      fontSize: `${smFont}px`,
                      filter: `contrast(${fontBright}%)`,
                    }}
                  >
                    {i + 1}. {guide.title}
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{guide.guide}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  );
}

export default Guide;

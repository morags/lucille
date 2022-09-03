/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { Helper } from ".";
import VolumeUp from "../../assets/images/vol_up_btn.svg";
import VolumeDown from "../../assets/images/vol_down_btn.svg";
import BrightUp from "../../assets/images/bright_up_btn.svg";
import BrightDown from "../../assets/images/bright_down_btn.svg";
import FontUp from "../../assets/images/font_up_btn.svg";
import FontDown from "../../assets/images/font_down_btn.svg";
import VibrationUp from "../../assets/images/vibr_up_btn.svg";
import VibrationDown from "../../assets/images/vibr_down_btn.svg";

function Setup({
  decreaseFont,
  increaseFont,
  mdFont,
  increaseBright,
  decreaseBright,
  fontBright,
  pathName,
}) {
  const [sliderValue, setSliderValue] = useState(20);

  // React useEffect hook to pass the pathname from the URL to the App component
  useEffect(() => {
    pathName(window.location.pathname);
  });

  // Function to increase the volume by calling the callback functin in the useState hook
  const increaseVol = () => {
    setSliderValue(sliderValue + 5);
  };

  // Function to decrease the volume by calling the callback functin in the useState hook
  const decreaseVol = () => {
    setSliderValue(sliderValue - 5);
  };

  return (
    <Box
      position="relative"
      h="full"
      backgroundColor="#cedcbf"
      border="2px"
      borderColor="gray.500"
    >
      <Box p="20px" overflowY="auto" h="full">
        <Box mb="15px" borderBottom="4px" borderColor="gray.400" pb="15px">
          <Heading
            as="h3"
            style={{
              // Pass the mdFont variables which contains the value stored in the db
              fontSize: `${mdFont}px`,
            }}
            filter={`contrast(${fontBright}%)`}
            mb="15px"
          >
            Font Size:
          </Heading>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Image
              src={FontDown}
              w="80px"
              // onClick event liseter to call the decreaseFont function when clicking on the element
              onClick={decreaseFont}
              style={{ cursor: "pointer" }}
            />
            <Text
              style={{
                fontSize: `${mdFont}px`,
                filter: `contrast(${fontBright}%)`,
              }}
              fontWeight="medium"
            >
              I can read this well
            </Text>
            <Image
              src={FontUp}
              w="80px"
              // onClick event liseter to call the increaseFont function when clicking on the element
              onClick={increaseFont}
              style={{ cursor: "pointer" }}
            />
          </Box>
        </Box>

        <Box mb="15px" borderBottom="4px" borderColor="gray.400" pb="15px">
          <Heading
            as="h3"
            fontSize="3xl"
            mb="15px"
            style={{
              fontSize: `${mdFont}px`,
              filter: `contrast(${fontBright}%)`,
            }}
          >
            Brightness:
          </Heading>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Image
              src={BrightDown}
              // onClick event liseter to call the decreaseBright function when clicking on the element
              onClick={decreaseBright}
              w="80px"
              style={{ cursor: "pointer" }}
            />
            <Text
              style={{
                fontSize: `${mdFont}px`,
                filter: `contrast(${fontBright}%)`,
              }}
              fontWeight="medium"
            >
              I can read this well
            </Text>
            <Image
              src={BrightUp}
              // onClick event liseter to call the increaseBright function when clicking on the element
              onClick={increaseBright}
              w="80px"
              style={{ cursor: "pointer" }}
            />
          </Box>
        </Box>

        <Box mb="15px" borderBottom="4px" borderColor="gray.400" pb="15px">
          <Heading
            as="h3"
            fontSize="3xl"
            mb="15px"
            style={{
              fontSize: `${mdFont}px`,
              filter: `contrast(${fontBright}%)`,
            }}
          >
            Volume:
          </Heading>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Image
              src={VolumeDown}
              onClick={decreaseVol}
              w="80px"
              style={{ cursor: "pointer" }}
            />
            <Slider
              aria-label="slider-ex-4"
              defaultValue={30}
              w="350px"
              value={sliderValue}
            >
              <SliderTrack
                h="10px"
                border="4px"
                p="5px 0"
                rounded="md"
                borderColor="gray.700"
              >
                <SliderFilledTrack bg="transparent" />
              </SliderTrack>
              <SliderThumb
                h="60px"
                w="10px"
                p="5px"
                border="4px"
                rounded="md"
                bg="#666666"
                borderColor="#000000"
              >
                <Box color="tomato" />
              </SliderThumb>
            </Slider>
            <Image
              src={VolumeUp}
              onClick={increaseVol}
              w="80px"
              style={{ cursor: "pointer" }}
            />
          </Box>
        </Box>
        <Box height="45%">
          <Heading
            as="h3"
            fontSize="3xl"
            mb="15px"
            textAlign="center"
            style={{
              fontSize: `${mdFont}px`,
              filter: `contrast(${fontBright}%)`,
            }}
          >
            Add and edit contacts below
          </Heading>
          <Helper mdFont={mdFont} fontBright={fontBright} />
        </Box>
      </Box>
    </Box>
  );
}

export default Setup;

/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Box, Button, Input, Heading, FormControl } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/db";
import { UserImage } from "../../assets";

function CreateHelper({ mdFont, smFont, fontBright }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");

  const onLoad = (img) => {
    setUserImage(img);
  };

  const imageToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    imageToBase64(file);
  };

  const addHelper = async () => {
    if (!username || !userEmail)
      return (
        <Heading as="h3" style={{ fontSize: `${mdFont}px` }}>
          Please fill the form
        </Heading>
      );

    await db.helpers.add({
      name: username,
      email: userEmail, // eslint-disable-next-line
      profilepicture: userImage ? userImage : UserImage,
    });
    navigate("/helper");
  };

  return (
    <Box border="2px" p="20px" borderColor="gray.500" h="full">
      <Heading
        as="h2"
        style={{ fontSize: `${mdFont}px`, filter: `contrast(${fontBright}%)` }}
        mb="20px"
        color="gray.800"
      >
        Add Helper
      </Heading>
      <FormControl>
        <Input
          type="text"
          placeholder="Enter the helper name"
          border="1px"
          borderColor="gray.400"
          style={{ fontSize: `${smFont}px` }}
          p="20px 15px"
          mb="25px"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Enter the helper email"
          border="1px"
          borderColor="gray.400"
          mb="20px"
          p="20px 15px"
          style={{ fontSize: `${smFont}px` }}
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <Input
          type="file"
          p="0"
          mb="10px"
          accept="image/png, image/jpeg"
          onChange={onImageChange}
        />
        <Button
          colorScheme="teal"
          size="md"
          style={{ fontSize: `${smFont}px` }}
          onClick={addHelper}
        >
          Add new helper
        </Button>
      </FormControl>
    </Box>
  );
}

export default CreateHelper;

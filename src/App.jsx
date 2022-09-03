/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./utils/db";
import { Navbar } from "./components";

import {
  Board,
  Archive,
  Guide,
  Helper,
  Setup,
  BoardDetail,
  CreateHelper,
} from "./pages";
import CreateList from "./components/CreateList/CreateList";

function App() {
  // The below two State Hook controls the font globally in the application
  const [mdFont, setMdFont] = useState(30);
  const [smFont, setSmFont] = useState(20);
  // The below State Hook controls the font contrast globally in the application
  const [fontBright, setFontBright] = useState(100);
  // The below State Hook is used to check on which page the user is to set the tab background
  const [pathValue, setPathValue] = useState("");

  // This function is used the get the prop from the child component to get the pathname in the URL
  const pullPathName = (pathName) => {
    setPathValue(pathName);
  };


  // Aync function to fetch settings table from the db and use the callback functions to store the data in variables
  const allSettings = db.settings.toArray().then((setting) => {
    setMdFont(setting[0].fontsize);
    setSmFont(setting[0].fontsize - 10);
    setFontBright(setting[0].brightness);
  });

  // The funciton below is being used to increase the font size and save its data back to the db
  const increaseFont = () => {
    const newMdFont = mdFont + 2;
    setMdFont(newMdFont);

    db.settings.update(1, { fontsize: newMdFont });
  };

  // The funciton below is being used to decrease the font size and save its data back to the db
  const decreaseFont = () => {
    const newMdFont = mdFont - 2;
    setMdFont(newMdFont);

    db.settings.update(1, { fontsize: newMdFont });
  };

  // The funciton below is being used to increase the font contrast and save its data back to the db
  const increaseBright = () => {
    const newFontBright = fontBright + 20;
    setFontBright(newFontBright);

    db.settings.update(1, { brightness: newFontBright });
  };

  // The funciton below is being used to decrease the font contrast and save its data back to the db
  const decreaseBright = () => {
    // If the the contrast is getting below 0, set it to zero
    if (fontBright <= 0) {
      setFontBright(0);
      db.settings.update(1, { brightness: 0 });
    } else { // Otherwise decrease it
      const newFontBright = fontBright - 20;
      setFontBright(fontBright - 20);
      db.settings.update(1, { brightness: newFontBright });
    }
  };

  return (
    <main className="app">
      <Container
        pb={8}
        border="2mm ridge rgba(192, 192, 192, .6);"
        borderColor="gray.500"
        w="100%"
        height="90vh"
        centerContent
        display="flex"
        alignItems="center"
        flexDirection="column"
        pl={0}
        pr={0}
        maxWidth="720px"
      >
        <Box h="100%" bg="#e8e8e6" width="100%">
          <Box h="100%" mt="-5px">
            <Navbar path={pathValue} />
            <Box mr="5px" ml="5px" h="90%" border="2mm ridge rgba(192, 192, 192, .7);">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Board
                    // Pass different setting props to the Board comp
                      mdFont={mdFont}
                      smFont={smFont}
                      fontBright={fontBright}
                      pathName={pullPathName}
                    />
                  }
                />
                <Route
                  path="/board/:boardId"
                  element={
                    <BoardDetail
                      // Pass different setting props to the BoardDetail comp
                      mdFont={mdFont}
                      smFont={smFont}
                      fontBright={fontBright}
                    />
                  }
                />
                <Route
                  path="/board/create"
                  element={<CreateList mdFont={mdFont} />}
                />
                <Route
                  path="/guide"
                  element={
                    <Guide
                      // Pass different setting props to the Guide comp
                      smFont={smFont}
                      fontBright={fontBright}
                      pathName={pullPathName}
                    />
                  }
                />
                <Route
                  path="/helper/create"
                  element={
                    <CreateHelper
                      // Pass different setting props to the CreateHelper comp
                      mdFont={mdFont}
                      smFont={smFont}
                      fontBright={fontBright}
                      pathName={pullPathName}
                    />
                  }
                />
                <Route
                  path="/setup"
                  element={
                    <Setup
                      // Pass different setting props to the Setup comp
                      mdFont={mdFont}
                      increaseFont={increaseFont}
                      decreaseFont={decreaseFont}
                      fontBright={fontBright}
                      decreaseBright={decreaseBright}
                      increaseBright={increaseBright}
                      pathName={pullPathName}
                    />
                  }
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Container>
    </main>
  );
}

export default App;

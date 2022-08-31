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
  const [mdFont, setMdFont] = useState(30);
  const [smFont, setSmFont] = useState(20);
  const [fontBright, setFontBright] = useState(100);

  const allSettings = db.settings.toArray().then((setting) => {
    setMdFont(setting[0].fontsize);
    setSmFont(setting[0].fontsize - 10);
    setFontBright(setting[0].brightness)
  });

  const increaseFont = () => {
    const newMdFont = mdFont + 2;
    setMdFont(newMdFont);

    db.settings.update(1, { fontsize: newMdFont });
  };

  const decreaseFont = () => {
    const newMdFont = mdFont - 2;
    setMdFont(newMdFont);

    db.settings.update(1, { fontsize: newMdFont });
  };

  const increaseBright = () => {
    const newFontBright = fontBright + 20;
    setFontBright(newFontBright);

    db.settings.update(1, { brightness: newFontBright });
  };

  const decreaseBright = () => {
    if (fontBright <= 0) {
      setFontBright(0);
      db.settings.update(1, { brightness: 0 });
    } else {
      const newFontBright = fontBright - 20;
      setFontBright(fontBright - 20);
      db.settings.update(1, { brightness: newFontBright });
    }
  };

  return (
    <main className="app">
      <Container
        pb={8}
        border='2px'
        borderColor='gray.500'
        w='100%'
        height='90vh'
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
            <Navbar />
            <Box mr="5px" ml="5px" h="90%">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Board
                      mdFont={mdFont}
                      smFont={smFont}
                      fontBright={fontBright}
                    />
                  }
                />
                <Route
                  path="/board/:boardId"
                  element={
                    <BoardDetail
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
                  path="/archive"
                  element={<Archive mdFont={mdFont} fontBright={fontBright} />}
                />
                <Route
                  path="/guide"
                  element={<Guide smFont={smFont} fontBright={fontBright} />}
                />
                <Route
                  path="/helper"
                  element={
                    <Helper
                      mdFont={mdFont}
                      smFont={smFont}
                      fontBright={fontBright}
                    />
                  }
                />
                <Route
                  path="/helper/create"
                  element={
                    <CreateHelper
                      mdFont={mdFont}
                      smFont={smFont}
                      fontBright={fontBright}
                    />
                  }
                />
                <Route
                  path="/setup"
                  element={
                    <Setup
                      mdFont={mdFont}
                      increaseFont={increaseFont}
                      decreaseFont={decreaseFont}
                      fontBright={fontBright}
                      decreaseBright={decreaseBright}
                      increaseBright={increaseBright}
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

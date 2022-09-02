/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Image } from "@chakra-ui/react";
import navData from "./navData";

function Navbar({ path }) {
  return (
    <header>
      <nav>
        <Box display="flex" justifyContent="space-between" p="0 20px">
          {navData.map((navItem) =>
            path === navItem.to ? (
              <NavLink
                to={navItem.to}
                key={navItem.title}
                style={{ margin: "0 10px" }}
              >
                <Image
                  src={navItem.icon}
                  key={navItem.title}
                  boxSize="100px"
                  objectFit="contain"
                  backgroundColor="#cedcbf"
                  padding="5px"
                  margin="10px 0px 0px 0px"
                  border="2px"
                  borderColor="gray.500"
                  borderBottomColor="#cedcbf"
                />
              </NavLink>
            ) : (
              <NavLink
                to={navItem.to}
                key={navItem.title}
                style={{ margin: "0 10px" }}
              >
                <Image
                  src={navItem.icon}
                  key={navItem.title}
                  boxSize="100px"
                  objectFit="contain"
                />
              </NavLink>
            )
          )}
        </Box>
      </nav>
    </header>
  );
}

export default Navbar;

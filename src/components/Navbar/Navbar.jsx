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
        <Box display="flex" justifyContent="space-between" p="0 20px" marginTop="10px">
          {navData.map((navItem) => // Go through the items in the navData file via the map method and render them 
            path === navItem.to ? ( // This ternanry operation will check the active pathname and set the coresponding nav item background to green
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
                  border="4mm ridge rgba(192, 192, 192, .6);"
                  borderBottomColor="#cedcbf"
                />
              </NavLink>
            ) : ( // Otherwise set the remaining nav items background to none
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
                  border="2mm ridge rgba(192, 192, 192, .6);"
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

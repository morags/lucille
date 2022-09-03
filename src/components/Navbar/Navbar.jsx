/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Button} from "@chakra-ui/react";
import navData from "./navData";

function Navbar({ path }) {
  return (
    <header>
      <nav>
        <Box display="flex" justifyContent="row-start" p="0 20px">
          {navData.map((navItem) => // Go through the items in the navData file via the map method and render them 
            path === navItem.to ? ( // This ternanry operation will check the active pathname and set the coresponding nav item background to green
              <NavLink
                to={navItem.to}
                key={navItem.title}
                style={{ margin: "0 10px" }}
              >
                {/* <Image
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
                  bg="#ededeb"
                  
                /> */}
                <Button padding="3px" bg="#cedcbf" boxSize="105px" margin="10px" boxShadow="5px 5px 5px rgb(137, 137, 137)" border="3px" borderColor="#a9a9a9" borderStyle="solid" borderRadius="10px"><img alt="fjsdkj" key={navItem.title} src={navItem.icon} /></Button>
              </NavLink>
            ) : ( // Otherwise set the remaining nav items background to none
              <NavLink
                to={navItem.to}
                key={navItem.title}
                style={{ margin: "0 10px" }}
              >
                {/* <Image
                  src={navItem.icon}
                  key={navItem.title}
                  boxSize="100px"
                  objectFit="contain"
                  border="3px"
                  borderColor="#a9a9a9"
                  borderRadius="37.5px"
                /> */}
                <Button padding="3px" bg="#ededeb" boxSize="100px" margin="10px" boxShadow="5px 5px 5px rgb(137, 137, 137)" border="3px" borderColor="#a9a9a9" borderStyle="solid" borderRadius="10px"><img alt="fjsdkj" key={navItem.title} src={navItem.icon} /></Button>
              </NavLink>
            )
          )}
        </Box>
      </nav>
    </header>
  );
}

export default Navbar;

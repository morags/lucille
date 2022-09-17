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
        <Box display="flex" justifyContent="center" p="0 2vh" >
          {navData.map((navItem) => // Go through the items in the navData file via the map method and render them 
            path === navItem.to ? ( // This ternary operation will check the active path_name and set the coresponding nav item background to green
              <NavLink
                to={navItem.to}
                key={navItem.title}
                style={{ margin: "0.6vh 0vh 0.1vh 0vh" }}  
              >                
                <Button padding="0.04vh" bg="#cedcbf" boxSize="10.5vh" margin="1vh" boxShadow="5px 5px 5px rgb(137, 137, 137)" border="0.3vh" borderColor="#a9a9a9" borderStyle="solid" borderRadius="1vh"><img alt="fjsdkj" key={navItem.title} src={navItem.icon} /></Button>
              </NavLink>
            ) : ( // Otherwise set the remaining nav items background to none
              <NavLink
                to={navItem.to}
                key={navItem.title}
                style={{ margin: "0.6vh 0vh 0.1vh 0vh" }}
              >                
                <Button padding="0.04vh" bg="#ededeb" boxSize="10vh" margin="1vh" boxShadow="5px 5px 5px rgb(137, 137, 137)" border="0.3vh" borderColor="#a9a9a9" borderStyle="solid" borderRadius="1vh"><img alt="fjsdkj" key={navItem.title} src={navItem.icon} /></Button>
              </NavLink>
            )
          )}
        </Box>
      </nav>
    </header>
  );
}

export default Navbar;

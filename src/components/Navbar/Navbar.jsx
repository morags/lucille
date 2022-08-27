import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Image } from '@chakra-ui/react';
import navData from './navData';

function Navbar() {
  return (
    <header>
      <nav>
        <Box display='flex' justifyContent='space-between' p='0 20px'>
          {navData.map((navItem) => (
            <NavLink
              to={navItem.to}
              key={navItem.title}
              style={{ margin: '0 10px' }}
            >
              <Image
                src={navItem.icon}
                key={navItem.title}
                boxSize='100px'
                objectFit='contain'
              />
            </NavLink>
          ))}
        </Box>
      </nav>
    </header>
  );
}

export default Navbar;

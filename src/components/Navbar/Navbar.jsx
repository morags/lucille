import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Image } from '@chakra-ui/react';
// import BoardIcon from '../../assets/images/board_nav_btn.png';
import {
  BoardIcon,
  ArchiveIcon,
  SetupIcon,
  GuideIcon,
  HelperIcon,
} from '../../assets';

const navData = [
  {
    title: 'Board',
    to: '/',
    // icon: '../../assets/images/board_nav_btn.png',
    icon: BoardIcon,
  },
  {
    title: 'Archive',
    to: '/archive',
    icon: ArchiveIcon,
  },
  {
    title: 'Guide',
    to: '/guide',
    icon: GuideIcon,
  },
  {
    title: 'Helper',
    to: '/helper',
    icon: HelperIcon,
  },
  {
    title: 'Setup',
    to: '/setup',
    icon: SetupIcon,
  },
];

function Navbar() {
  return (
    <header>
      <nav>
        <Box display='flex'>
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

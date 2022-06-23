import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  color,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import jsCookie from "js-cookie";
import auth_types from '../redux/reducers/types/auth';

// const SubMenu = ['Profile', 'Logout'];


const NavLink = ({ children, path }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('white'),
      color: "black"
    }}
    href={path}>
    {children}
  </Link>
);

export default function NavbarComponent() {
    const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
const authSelector = useSelector((state) => state.auth)

const SubMenu = [{ "link" : "Profile", "path" : "/profile", "klik" : undefined}, {
    "link" : "logout", "path" : "/", "klik" : btnlogout
}];


const Links = [{ "link" : "Home", "path" : "/"}, {
    "link" : "Product", "path" : "/product"
}];


function btnlogout() {

    jsCookie.remove("user_data")
  
    dispatch ({
      type: auth_types.AUTH_LOGOUT
    })
}


  return (
    <>
      <Box bg={useColorModeValue("black")  }  color="white" px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((val) => (
                <NavLink key={val}  path={val.path}>{val.link}</NavLink>
              ))}
            </HStack>
          </HStack>
        
            {
                 authSelector?.id ?
              

             <Flex alignItems={'center'}>
             <Menu>
               <MenuButton
                 as={Button}
                 rounded={'full'}
                 variant={'link'}
                 cursor={'pointer'}
                 minW={0}
                 >
                 <Avatar
                   size={'sm'}
                   src={
                     'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                   }
                 />
               </MenuButton>
               <MenuList bg="black"
          >     {SubMenu.map((val) => (
                 <MenuItem 
                 onClick={val.klik}
                 >{val.link}</MenuItem>
                 ))}
                
               </MenuList>
             </Menu>
           </Flex>
            : 
            <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
              <NavLink key="Login"  path="/auth/login">Login</NavLink>
          </HStack>
            
            }
          
         
        </Flex>

        {/* {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null} */}
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}
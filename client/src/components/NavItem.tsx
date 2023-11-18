/* eslint-disable react-hooks/rules-of-hooks */
import { Box, BoxProps, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface NavItemProps extends BoxProps {
  icon: IconType;
  isActive: boolean;
  children: React.ReactNode;
}

function NavItem({ icon, isActive, children, ...rest }: NavItemProps) {
  return (
    <Box as="a" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="2"
        m="4"
        mx="4"
        transition="all 0.1s"
        color={
          isActive
            ? useColorModeValue('white', 'gray.800')
            : useColorModeValue('gray.800', 'gray.100')
        }
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? useColorModeValue('teal.500', 'teal.200') : 'none'}
        _hover={
          isActive
            ? {}
            : {
                color: useColorModeValue('gray.800', 'gray.100'),
                bg: useColorModeValue('gray.100', 'gray.700')
              }
        }
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Box>
  );
}

export { NavItem };

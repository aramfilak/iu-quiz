import { Box, BoxProps, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface NavItemProps extends BoxProps {
  icon: IconType;
  isActive: boolean;
  children: React.ReactNode;
}

function NavItem({ icon, isActive, children, ...rest }: NavItemProps) {
  const inactiveHover = {
    color: useColorModeValue('gray.800', 'gray.100'),
    bg: useColorModeValue('gray.100', 'gray.700')
  };
  const appliedHoverStyle = isActive ? {} : inactiveHover;

  const inactiveColor = useColorModeValue('gray.800', 'gray.100');
  const activeColor = 'white';
  const appliedColor = isActive ? activeColor : inactiveColor;

  return (
    <Box as="a" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="2"
        m="4"
        mx="4"
        transition="all 0.1s"
        color={appliedColor}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? 'teal.500' : 'none'}
        _hover={appliedHoverStyle}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Box>
  );
}

export { NavItem };

import { Box, BoxProps, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface NavItemProps extends BoxProps {
  icon: IconType;
  isActive: boolean;
  children: React.ReactNode;
}

function NavItem({ icon, isActive, children, ...rest }: NavItemProps) {
  const activeTextColor = useColorModeValue('white', 'gray.800');
  const nonActiveTextColor = useColorModeValue('gray.800', 'gray.100');
  const textColor = isActive ? activeTextColor : nonActiveTextColor;

  const activeBgColor = useColorModeValue('teal.500', 'teal.200');
  const bgColor = isActive ? activeBgColor : 'none';

  const hoverActiveStyle = {
    color: useColorModeValue('gray.800', 'gray.100'),
    bg: useColorModeValue('gray.100', 'gray.700')
  };
  const hoverStyles = isActive ? {} : hoverActiveStyle;

  return (
    <Box as="a" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="2"
        m="4"
        mx="4"
        transition="all 0.1s"
        color={textColor}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={bgColor}
        _hover={hoverStyles}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Box>
  );
}

export { NavItem };

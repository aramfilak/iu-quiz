import { Box, Flex, FlexProps, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

function NavItem({ icon, children, ...rest }: NavItemProps) {
  return (
    <Box as="a" href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="2"
        m="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        transition="background 0.07s"
        _hover={{
          bg: 'teal.500',
          color: 'white'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
}

export { NavItem };

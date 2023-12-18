import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TextWithIconProps extends FlexProps {
  children?: ReactNode;
  gap?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}

function IconBox({ children, leftIcon, rightIcon, gap, ...rest }: TextWithIconProps) {
  return (
    <Flex
      {...rest}
      gap={gap || '2'}
      align="center"
      fontWeight="600"
      color="teal.500"
      _dark={{ color: 'teal.300' }}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </Flex>
  );
}

export { IconBox };

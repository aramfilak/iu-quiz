import { Heading, HeadingProps, useColorModeValue } from '@chakra-ui/react';

interface LabelHeaderProps extends HeadingProps {
  description: string;
}

function LabelHeading({ description, ...rest }: LabelHeaderProps) {
  return (
    <Heading
      {...rest}
      color={useColorModeValue('teal.500', 'teal.200')}
      letterSpacing="-1px"
      fontSize="2.8rem"
      fontWeight="900"
      mb="2"
    >
      {description}
    </Heading>
  );
}

export { LabelHeading };

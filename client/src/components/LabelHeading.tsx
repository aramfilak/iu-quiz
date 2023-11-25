import { Heading, HeadingProps } from '@chakra-ui/react';

interface LabelHeaderProps extends HeadingProps {
  description: string;
  variant: 'solid' | 'colorful';
}

function LabelHeading({ description, variant, ...rest }: LabelHeaderProps) {
  const isColorful = variant === 'colorful';
  const isSolid = variant === 'solid';

  return (
    <Heading
      bg={isColorful ? 'linear-gradient(90deg,#1896b0 ,#9671eb)' : undefined}
      backgroundClip={isColorful ? 'text' : undefined}
      color={isSolid ? 'teal.500' : undefined}
      _dark={{ color: isSolid ? 'teal.200' : undefined }}
      {...rest}
      letterSpacing="-1px"
      fontWeight="900"
    >
      {description}
    </Heading>
  );
}

export { LabelHeading };

import { Grid, GridProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface QuizCardsGridProps extends GridProps {
  children: ReactNode;
}

function QuizCardsGrid({ children, ...rest }: QuizCardsGridProps) {
  return (
    <Grid {...rest} gridTemplateColumns="repeat(auto-fill, minmax(15rem, 1fr))" gap="1rem">
      {children}
    </Grid>
  );
}

export { QuizCardsGrid };

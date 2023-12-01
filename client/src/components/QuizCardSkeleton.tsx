import { Grid, GridProps, SkeletonText } from '@chakra-ui/react';

function QuizCardSkeleton(rest: GridProps) {
  return (
    <Grid {...rest} gridTemplateColumns="repeat(auto-fill, minmax(15rem, 1fr))" gap="1rem">
      {Array.from({ length: 10 }, (_, index) => (
        <SkeletonText key={index} noOfLines={7} spacing="2" skeletonHeight="4" />
      ))}
    </Grid>
  );
}

export { QuizCardSkeleton };

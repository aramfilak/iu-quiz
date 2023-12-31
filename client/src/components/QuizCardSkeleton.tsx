import { GridProps, SkeletonText } from '@chakra-ui/react';
import { QuizCardsGrid } from '.';

function QuizCardSkeleton(rest: GridProps) {
  return (
    <QuizCardsGrid {...rest}>
      {Array.from({ length: 20 }, (_, index) => (
        <SkeletonText key={index} noOfLines={7} spacing="2" skeletonHeight="4" />
      ))}
    </QuizCardsGrid>
  );
}

export { QuizCardSkeleton };

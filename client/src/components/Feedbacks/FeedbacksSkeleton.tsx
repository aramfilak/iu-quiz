import { SkeletonText } from '@chakra-ui/react';

function FeedbacksSkeleton() {
  return (
    <>
      <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="24" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="10" />
      <SkeletonText mt="4" noOfLines={10} spacing="4" skeletonHeight="4" />
    </>
  );
}

export { FeedbacksSkeleton };

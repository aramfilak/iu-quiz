import { SkeletonText } from '@chakra-ui/react';

function QuestionEditorSkeleton() {
  return (
    <>
      <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="10" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="16" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="32" />
    </>
  );
}

export { QuestionEditorSkeleton };

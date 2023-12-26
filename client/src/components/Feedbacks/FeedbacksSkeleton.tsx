import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

function FeedbacksSkeleton() {
  return Array.from({ length: 4 }, (_, index) => (
    <Box
      key={index}
      w="full"
      borderRadius="md"
      bg="gray.100"
      _dark={{ bg: 'gray.600' }}
      p="2"
    >
      <SkeletonCircle size="10" />
      <SkeletonText mt="2" noOfLines={2} spacing="4" skeletonHeight="2" />
    </Box>
  ));
}

export { FeedbacksSkeleton };

import { Flex, FlexProps, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useQuizStore } from '../../stores';
import { QuizQueryParams } from '../../utils/types';

interface PaginationProps extends FlexProps {
  currentPage: number;
  isLoading: boolean;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  params: QuizQueryParams;
}

function Pagination({
  currentPage,
  isLoading,
  handlePreviousPage,
  handleNextPage,
  params,
  ...rest
}: PaginationProps) {
  const [hasNextPage, setHasNextPage] = useState(false);
  const { getAllQuizzes } = useQuizStore();

  const fetchData = async (page: number): Promise<unknown[]> => {
    const data = await getAllQuizzes({ ...params, page: page.toString() });
    return data;
  };

  useEffect(() => {
    if (isLoading) {
      fetchData(currentPage + 1).then((nextPageData) => {
        setHasNextPage(nextPageData.length > 0);
      });
    }
  }, [currentPage, fetchData]);

  return (
    <Flex {...rest} justify="center" alignItems={'center'}>
      <Tooltip label="Zurück" placement="left">
        <IconButton
          aria-label="Previous Page"
          h="0"
          mt={0.5}
          color="teal"
          _dark={{
            color: 'teal.300'
          }}
          icon={<FaChevronLeft />}
          onClick={handlePreviousPage}
          isDisabled={currentPage === 1 || isLoading}
        />
      </Tooltip>
      <Text>Seite {currentPage}</Text>
      <Tooltip label="Weiter" placement="right">
        <IconButton
          aria-label="Next Page"
          h="0"
          mt={0.5}
          color="teal"
          _dark={{
            color: 'teal.300'
          }}
          icon={<FaChevronRight />}
          onClick={handleNextPage}
          isDisabled={!hasNextPage || isLoading}
        />
      </Tooltip>
    </Flex>
  );
}

export default Pagination;

import { Button, Flex, FlexProps, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps extends FlexProps {
  currentPage: number;
  isLoading: boolean;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handlePageClick: (pageNumbers: number) => void;
  totalPages: number;
}

function Pagination({
  currentPage,
  isLoading,
  handlePreviousPage,
  handleNextPage,
  handlePageClick,
  totalPages,
  ...rest
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (currentPage >= totalPages - 1) {
      startPage = Math.max(1, totalPages - 4);
      endPage = totalPages;
    } else if (currentPage <= 2) {
      startPage = 1;
      endPage = Math.min(5, totalPages);
    }

    pageNumbers.push(
      <Button
        mx={1}
        fontSize="sm"
        fontWeight={1 === currentPage ? 'extrabold' : 'medium'}
        bg={1 === currentPage ? 'teal' : 'teal.400'}
        color={'white'}
        colorScheme={'teal'}
        cursor="pointer"
        onClick={() => handlePageClick(1)}
        isDisabled={isLoading}
      >
        1
      </Button>
    );

    if (startPage > 1) {
      pageNumbers.push(
        <Text key="ellipsisStart" mx={1} fontSize="sm" color="teal.300">
          ...
        </Text>
      );
    }

    for (let i = startPage + 1; i < endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          mx={1}
          fontSize="sm"
          fontWeight={i === currentPage ? 'extrabold' : 'medium'}
          bg={i === currentPage ? 'teal' : 'teal.400'}
          color={'white'}
          colorScheme={'teal'}
          cursor="pointer"
          onClick={() => handlePageClick(i)}
          isDisabled={isLoading}
        >
          {i}
        </Button>
      );
    }

    if (totalPages > endPage) {
      pageNumbers.push(
        <Text key="ellipsis" mx={1} fontSize="sm" color="teal.300">
          ...
        </Text>
      );
    }

    if (startPage != totalPages) {
      pageNumbers.push(
        <Button
          key={totalPages}
          mx={1}
          fontSize="sm"
          fontWeight={totalPages === currentPage ? 'extrabold' : 'medium'}
          bg={totalPages === currentPage ? 'teal' : 'teal.400'}
          color={'white'}
          colorScheme={'teal'}
          cursor="pointer"
          onClick={() => handlePageClick(totalPages)}
          isDisabled={isLoading}
        >
          {totalPages}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Flex {...rest} justify="center" alignItems="center">
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
      {renderPageNumbers()}
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
          isDisabled={currentPage === totalPages || isLoading}
        />
      </Tooltip>
    </Flex>
  );
}

export default Pagination;

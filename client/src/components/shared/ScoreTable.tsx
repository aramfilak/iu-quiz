import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  Button
} from '@chakra-ui/react';
import { BoxWrapper } from './BoxWrapper.tsx';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes.tsx';
import { Quiz } from '../../utils/types';

function ScoreTable({ scors, size }: Quiz) {
  const navigate = useNavigate();

  return (
    <BoxWrapper mt={4}>
      <Box w="full">
        <TableContainer mt="1rem" mb="1rem">
          <Heading as="h3" fontSize="md" mb={4}>
            Punktetabelle:
          </Heading>
          <Table width={'full'} variant="striped">
            <Thead>
              <Tr
                borderBottomWidth="2px"
                borderColor="gray.900"
                _dark={{
                  borderColor: 'white'
                }}
              >
                <Th textAlign="left">Student</Th>
                <Th textAlign="center">Punktezahl</Th>
                <Th textAlign="right" isNumeric>
                  Dauer
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {scors.length === 0 && (
                <Tr
                  borderTopWidth="2px"
                  borderColor="gray.300"
                  _dark={{
                    borderColor: 'gray.600'
                  }}
                  alignItems={'right'}
                >
                  <Td textAlign="left">-</Td>
                  <Td textAlign="center">-</Td>
                  <Td textAlign="right">-</Td>
                </Tr>
              )}
              {scors?.map((row, index) => (
                <Tr
                  key={index}
                  borderTopWidth="2px"
                  borderColor="gray.300"
                  _dark={{
                    borderColor: 'gray.600'
                  }}
                >
                  <Td textAlign="left">
                    <Button
                      variant="link"
                      fontWeight="bold"
                      onClick={() =>
                        navigate(
                          `../${routes.Dashboard.children.Profile.mainPath}/${row.playerId}`
                        )
                      }
                    >
                      {row.Student.studentProfile?.name}
                    </Button>
                  </Td>
                  <Td textAlign="center">
                    {row.answeredQuestion}/{size}
                  </Td>
                  <Td textAlign="right" isNumeric>
                    {row.timeTaken} s
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </BoxWrapper>
  );
}

export { ScoreTable };

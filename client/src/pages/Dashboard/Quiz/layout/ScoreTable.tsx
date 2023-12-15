import {
  Avatar,
  Box,
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BoxWrapper } from '../../../../components/shared/BoxWrapper.tsx';
import { routes } from '../../../../utils/routes.tsx';
import { QuizScore } from '../../../../utils/types';
import { scorePositionColor } from '../../../../utils/helpers.ts';
import { convertSecondsToMin } from '../../../../utils/formatters.ts';

function ScoreTable({ scores }: { scores: QuizScore[] }) {
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
                <Th textAlign="left">Pos.</Th>
                <Th textAlign="left">Spieler</Th>
                <Th textAlign="center">Richtige Antworten</Th>
                <Th textAlign="center">Dauer</Th>
                <Th textAlign="right" isNumeric>
                  Punkte
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {scores.length === 0 && (
                <Tr
                  borderTopWidth="2px"
                  borderColor="gray.300"
                  _dark={{
                    borderColor: 'gray.600'
                  }}
                  alignItems={'right'}
                >
                  <Td textAlign="left">-</Td>
                  <Td textAlign="left">-</Td>
                  <Td textAlign="center">-</Td>
                  <Td textAlign="center">-</Td>
                  <Td textAlign="right">-</Td>
                </Tr>
              )}
              {scores?.map((score, index) => {
                return (
                  <Tr
                    key={score.id}
                    borderTopWidth="2px"
                    borderColor="gray.300"
                    _dark={{
                      borderColor: 'gray.600'
                    }}
                  >
                    {/*____________________ Position  ________________*/}
                    <Td
                      textAlign="left"
                      color={scorePositionColor(index)}
                      _dark={{ color: scorePositionColor(index, true) }}
                      fontWeight="bold"
                    >
                      #{index + 1}
                    </Td>

                    {/*____________________ Player  ________________*/}
                    <Td textAlign="left">
                      <Button
                        variant="link"
                        gap="2"
                        fontWeight="bold"
                        onClick={() =>
                          navigate(
                            `../${routes.Dashboard.children.Profile.mainPath}/${score.playerId}`
                          )
                        }
                      >
                        <Avatar
                          size="sm"
                          borderRadius="md"
                          border="none"
                          src={score.student?.studentProfile?.profileImage?.url}
                        />
                        {score.student?.studentProfile?.name}
                      </Button>
                    </Td>
                    {/*____________________ Number of Correct Answers  ________________*/}
                    <Td textAlign="center">{score.numberOfCorrectAnswers}</Td>

                    {/*____________________ Taken Time   ________________*/}
                    <Td textAlign="center">{convertSecondsToMin(score.timeTaken)}</Td>
                    {/*____________________ Score  ________________*/}
                    <Td textAlign="right" isNumeric>
                      {score.score}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </BoxWrapper>
  );
}

export { ScoreTable };

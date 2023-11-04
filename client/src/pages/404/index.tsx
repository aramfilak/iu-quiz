import './style.scss';
import PageNotFound404illustration from '../../assets/illustrations/page-not-found-illustration.svg';
import Container from '../../components/container';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import PageView from '../../components/page-view';
import { useNavigate } from 'react-router-dom';

function NotFound404() {
  const navigate = useNavigate();

  return (
    <PageView>
      <Container additionalClasses={['not-found-404-container']}>
        <Image
          className="page-not-found-illustration"
          marginBlock={'20'}
          width={'lg'}
          src={PageNotFound404illustration}
          alt="page not found illustration"
        />
        <Flex direction={'column'} alignItems={'center'}>
          <Text as="b" fontSize={'4xl'} align={'center'} marginBlock={'2'}>
            Hoppla! Die von Ihnen gesuchte Website existiert nicht.
          </Text>
          <Button
            onClick={() => navigate('/', { replace: true })}
            colorScheme="teal"
            size="sm"
            marginBlock={'1.5'}
            padding={'5'}
          >
            Zurück zur Startseite
          </Button>
        </Flex>
      </Container>
    </PageView>
  );
}

export default NotFound404;

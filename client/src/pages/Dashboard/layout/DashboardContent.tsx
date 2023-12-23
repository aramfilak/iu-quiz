import { Container } from '@chakra-ui/react';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const DashboardContent = memo(() => {
  return (
    <Container maxWidth="container.xl" padding="0">
      <Outlet />
    </Container>
  );
});

export { DashboardContent };

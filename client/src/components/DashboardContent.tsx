import { Container } from '@chakra-ui/react';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const DashboardContent = () => {
  return (
    <Container maxWidth="container.xl" padding="0">
      <Outlet />
    </Container>
  );
};

const MemoizedDashboardContent = memo(DashboardContent);

export { MemoizedDashboardContent as DashboardContent };

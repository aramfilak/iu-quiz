import './style.scss';
import { Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { useAuthStore, useStudentStore } from '../../sotres';

function Dashboard() {
  const { signOut } = useAuthStore();
  const { student } = useStudentStore();
  const navigate = useNavigate();
  const { Authentication } = routes;
  const toast = useToast();

  return (
    <div>
      <div>{student?.nickName}</div>
      <div> {student?.email}</div>
      <Button
        onClick={async () => {
          const { success, message } = await signOut();
          toast({
            description: message,
            status: success ? 'success' : 'error'
          });
          navigate(Authentication.path);
        }}
      >
        Abmelden
      </Button>
    </div>
  );
}

export { Dashboard };

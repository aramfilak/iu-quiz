import { useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils';
interface Student {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    email: string;
    username: string;
  };
}

function Dashboard() {
  const [student, setStudent] = useState<null | Student>(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get<Student>('https://iu-quiz-seven.vercel.app/api/v1/student', { withCredentials: true })
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const abmelden = () => {
    axios
      .get('https://iu-quiz-seven.vercel.app/api/v1/auth/sign-out', { withCredentials: true })
      .then(() => {
        navigate(routes.Authentication.path);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <ul>
        <li>{student?.data.email}</li>
        <li>{student?.data.id}</li>
        <li>{student?.data.username}</li>
        <Button onClick={abmelden}>Abmelden</Button>
      </ul>
    </div>
  );
}

export { Dashboard };

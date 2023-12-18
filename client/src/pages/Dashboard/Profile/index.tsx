import { useParams } from 'react-router-dom';
import { PageSkeleton } from '../../../components';
import { useFetch } from '../../../hooks';
import { useStudentStore } from '../../../stores';
import { ProfileHeader } from './layout';

function Profile() {
  const { studentId } = useParams();
  const { getStudentsByIds } = useStudentStore();
  const { data, isLoading } = useFetch(() => getStudentsByIds(studentId as string));
  const studentData = data && data[0];

  return isLoading ? <PageSkeleton /> : studentData && <ProfileHeader {...studentData} />;
}

export { Profile };

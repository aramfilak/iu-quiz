import { ProfileView } from '../../../../components/shared';
import { useStudentStore } from '../../../../stores';
import { useFetch } from '../../../../hooks';

interface QuizHeaderProps {
  authorId: string;
  title: string;
  updatedAt: Date;
  courseOfStudy: string;
  course: string;
  popularity: number;
  size: number;
  isLoading: boolean;
}

function QuizHeader({ authorId }: QuizHeaderProps) {
  const { getStudentsByIds } = useStudentStore();
  const { data } = useFetch(() => getStudentsByIds(authorId));
  const authorData = data && data[0];

  return (
    <>
      {/*---------------- Profile Image -------------*/}
      {authorData && <ProfileView {...authorData} />}
    </>
  );
}

export { QuizHeader };

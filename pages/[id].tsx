import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { supabase } from '../utils/supabase';
import type { Lesson } from '../utils/types';

interface LessonDetailsProps {
  lesson: Lesson
}

const LessonDetails: NextPage<LessonDetailsProps> = ({lesson}) => {
  return (
    <div>
      Lesson details {lesson.id}
    </div>
  )  
}
// Todo: resolve getStaticPaths: GetStaticPaths
export const getStaticPaths = async () => {

  const { data: lessons } = await supabase.from<Lesson>('lesson').select('id');

  const paths = lessons?.map(({id}: {id: number}) => ({
    params: {
      id: id.toString()
    }
  }));

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  const { data: lesson } = await supabase.from<Lesson>('lesson').select('*').eq('id', id).single();

  return {
    props: {
      lesson
    }
  }
}

export default LessonDetails;
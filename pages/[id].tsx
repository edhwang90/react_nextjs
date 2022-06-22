import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { supabase } from '../utils/supabase';
import type { Lesson } from '../utils/types';

interface LessonDetailsProps {
  lesson: Lesson
}

interface Params extends ParsedUrlQuery {
  id: string
}

const LessonDetails: NextPage<LessonDetailsProps> = ({lesson}) => {
  return (
    <div>
      Lesson details {lesson.id}
    </div>
  )  
}

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

export const getStaticProps: GetStaticProps<LessonDetailsProps, Params> = async (context) => {
  const { id } = context.params!;

  const res = await supabase.from<Lesson>('lesson').select('*').eq('id', id).single();
  const lesson = (await res.data) as Lesson;

  return {
    props: {
      lesson
    }
  }
}

export default LessonDetails;
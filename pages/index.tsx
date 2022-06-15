import type { NextPage } from 'next';

import { supabase } from '../utils/supabase';
import { Lesson } from '../utils/types';

const Home: NextPage = (props: any) => {
  const { lessons } = props;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {lessons.map((lesson: Lesson) => (
        <p key={lesson.id}>{lesson.title}</p>
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
  const { data: lessons } = await supabase.from('lesson').select('*');

  return {
    props: {
      lessons
    }
  }
}

export default Home;

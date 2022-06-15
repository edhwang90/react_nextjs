import type { NextPage } from 'next';
import Link from 'next/link';

import { supabase } from '../utils/supabase';
import { Lesson } from '../utils/types';

const Home: NextPage = (props: any) => {
  const { lessons } = props;

  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      {lessons.map((lesson: Lesson) => (
        <Link key={lesson.id} href={`/${lesson.id}`}>
          <a className="p-8 h-40 mb-4 rounded shadow text-xl flex">
            {lesson.title}
          </a>
        </Link>
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

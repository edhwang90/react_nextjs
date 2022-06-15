import { supabase } from '../utils/supabase';
import type { Lesson } from '../utils/types';

const LessonDetails = ({lesson}: {lesson: Lesson}) => {
    return (
        <div>
            Lesson details {lesson.id}
        </div>
    )  
}

export const getStaticPaths = async () => {
    const { data: lessons } = await supabase.from('lesson').select('id');

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

export const getStaticProps = async ({ params: { id } }) => {
    const { data: lesson } = await supabase.from('lesson').select('*').eq('id', id).single();

    return {
        props: {
            lesson
        }
    }
}

export default LessonDetails;
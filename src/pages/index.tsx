import { useSession } from 'next-auth/client';
import { TodoList as Component } from '@/modules/todo/pages/TodoList';
import { Auth } from '../components/Auth';

const TodoList: React.FC = () => {
    const [session, loading] = useSession();

    return loading ? (
        <span>Spinner</span>
    ) : (
        <div>
            <Auth />
            {session && <Component />}
        </div>
    );
};

export default TodoList;

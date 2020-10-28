import { useSession } from 'next-auth/client';
import { TodoList as Component } from '@/modules/todo/pages/TodoList';
import { Auth } from '../components/Auth';

const TodoList: React.FC = () => {
    const [session] = useSession();

    return (
        <div>
            <Auth />
            {session ? <Component /> : 'Please sign in'}
        </div>
    );
};

export default TodoList;

import { TodoList as Component } from '@/modules/todo/pages/TodoList';
import { Auth } from '../components/Auth';

const TodoList: React.FC = () => {
    return (
        <div>
            <Auth />
            <Component />
        </div>
    );
};

export default TodoList;

import { TodoList } from '../modules/todo/pages/TodoList';
import { Layout } from '../components/Layout';

const Main: React.FC = () => {
    return (
        <Layout>
            <TodoList />
        </Layout>
    );
};

export default Main;

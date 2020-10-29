import { TodoList as Component } from '../components/TodoList';
import { Layout } from '@/components/Layout';

export const TodoList: React.FC = () => {
    return (
        <Layout>
            <Component />
        </Layout>
    );
};

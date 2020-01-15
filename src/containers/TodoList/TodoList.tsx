import React from 'react';
import classNames from 'classnames/bind';

import { Todo } from '~/components/Todo';
import { Input } from '~/components/Input';
import { ITodo } from '~/models';

import styles from './TodoList.module.css';

const cx = classNames.bind(styles);

interface TodoListProps {
    todos: ITodo[] | null;
    addTodo: (task: string) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    editTodo: (id: string, task: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
}) => {
    return (
        <div className={styles.container}>
            <header>
                <Input
                    placeholder="What needs to be done?"
                    onSubmit={addTodo}
                    classNames={cx('inputTodo')}
                />
            </header>
            <section>
                <ul className={styles.list}>
                    {todos &&
                        todos.map(todo => (
                            <Todo
                                key={todo.id}
                                todo={todo}
                                onEdit={editTodo}
                                onToggle={toggleTodo}
                                onDelete={deleteTodo}
                            />
                        ))}
                </ul>
            </section>
        </div>
    );
};

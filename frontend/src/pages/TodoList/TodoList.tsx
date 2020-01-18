import React, { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { CREATE_TODO, GET_TODOS /* UPDATE_TODOS */ } from '~/graphql';
import { Todo } from '~/components/Todo';
import { Input } from '~/components/Input';

import styles from './TodoList.module.css';
import { ITodo } from '~/models';
import { DraggableTodoList } from './DraggableTodoList';

const cx = classNames.bind(styles);

export const TodoList: React.FC = () => {
    const [isCompletedHidden, setIsCompletedHidden] = useState(false);

    const { data, loading, error } = useQuery(GET_TODOS);

    const [createTodo] = useMutation(CREATE_TODO);
    const handleCreateTodo = (task: string) =>
        createTodo({
            variables: { task },
            refetchQueries: [{ query: GET_TODOS }],
        });

    // const [updateTodos] = useMutation(UPDATE_TODOS);
    // const handleUpdateTodos = useCallback(
    //     (todos: ITodo[]) => updateTodos({ variables: { todos } }),
    //     [data.todos]
    // );

    const handleReorder = (reordered: ITodo[]) => reordered;
    // const handleReorder = (reorderedActiveTodos: ITodo[]) =>
    //     handleUpdateTodos(reorderedActiveTodos); //.concat(completedTodos));

    // const toggleCompleteHidden = () => setIsCompletedHidden(!isCompletedHidden);

    // const completeItemsText =
    //     completedTodos &&
    //     `${completedTodos.length} Completed ${
    //         completedTodos.length > 1 ? 'items' : 'item'
    //     }`;

    if (loading || !data) return <p>Loading...</p>;
    if (error) return <p>ERROR</p>;

    return (
        <div className={styles.container}>
            <header>
                <Input
                    placeholder="What needs to be done?"
                    onSubmit={handleCreateTodo}
                    classNames={cx('inputTodo')}
                />
            </header>
            <section className={cx('active')}>
                <DraggableTodoList
                    todos={data.todos}
                    onReorder={handleReorder}
                    classNames={cx('list')}
                />
            </section>
            {/* {completedTodos?.length ? (
                <section className={cx('completed', { isCompletedHidden })}>
                    {activeTodos?.length ? <hr /> : null}
                    <div
                        className={cx('numCompletedText')}
                        onClick={toggleCompleteHidden}
                    >
                        <div className={cx('toggleComplete')} />
                        {completeItemsText}
                    </div>
                    <ul className={cx('list')}>
                        {completedTodos?.map(todo => (
                            <Todo key={todo.id} todo={todo} />
                        ))}
                    </ul>
                </section>
            ) : null} */}
        </div>
    );
};

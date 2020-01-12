import React, { useState } from 'react';
import classNames from 'classnames/bind';

import { Todo } from '~/components/Todo';
import { Input } from '~/components/Input';
import { ITodoList } from '~/models';

import styles from './TodoList.module.css';

const cx = classNames.bind(styles);

interface TodoListProps {
    todos: ITodoList;
    addTodo: (task: string) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    setVisibilityFilter: (value: string) => void;
    editTodo: (id: string, task: string) => void;
    setAllDone: (value: boolean) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
    todos: { ids, byId, visibilityFilter },
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    setAllDone,
    setVisibilityFilter,
}) => {
    const [editingId, setEditingId] = useState();
    const [isAllDone, setIsAllDone] = useState(false);

    const handleToggleAll = () => {
        setIsAllDone(!isAllDone);
        setAllDone(!isAllDone);
    };

    const active = ids.filter(id => !byId[id].isDone);

    const showActive = () => setVisibilityFilter('SHOW_ACTIVE');
    const showCompleted = () => setVisibilityFilter('SHOW_COMPLETED');
    const showAll = () => setVisibilityFilter('SHOW_ALL');

    return (
        <>
            <header>
                <button onClick={handleToggleAll}>
                    {isAllDone ? 'Uncheck' : 'Check'} all
                </button>
                <Input
                    placeholder="What needs to be done?"
                    onSubmit={addTodo}
                />
            </header>
            <section>
                <ul>
                    {ids.map(id => (
                        <Todo
                            key={id}
                            todo={byId[id]}
                            isEditing={id === editingId}
                            toggleEdit={setEditingId}
                            onEdit={editTodo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    ))}
                </ul>
            </section>
            <footer className={styles.footer}>
                <p>
                    {active.length} {active.length === 1 ? 'item' : 'items'}{' '}
                    left
                </p>
                <div className={styles.filters}>
                    <p
                        className={cx('filterItem', {
                            selected: visibilityFilter === 'SHOW_ALL',
                        })}
                        onClick={showAll}
                    >
                        All
                    </p>
                    <p
                        className={cx('filterItem', {
                            selected: visibilityFilter === 'SHOW_ACTIVE',
                        })}
                        onClick={showActive}
                    >
                        To Do
                    </p>
                    <p
                        className={cx('filterItem', {
                            selected: visibilityFilter === 'SHOW_COMPLETED',
                        })}
                        onClick={showCompleted}
                    >
                        Done
                    </p>
                </div>
            </footer>
        </>
    );
};

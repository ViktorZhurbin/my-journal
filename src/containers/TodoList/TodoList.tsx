import React, { useState } from 'react';
import classNamesBind from 'classnames/bind';

import { Todo } from '~/components/Todo';
import { Input } from '~/components/Input';
import { Checkbox } from '~/components/Checkbox';
import { ITodoList } from '~/models';
import { Filters } from './Filters';

import styles from './TodoList.module.css';

const cx = classNamesBind.bind(styles);

interface TodoListProps {
    todos: ITodoList;
    addTodo: (task: string) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    editTodo: (id: string, task: string) => void;
    setAllDone: (value: boolean) => void;
    setVisibilityFilter: (value: string) => void;
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
    const [isAllDone, setIsAllDone] = useState(false);

    const handleToggleAll = () => {
        setIsAllDone(!isAllDone);
        setAllDone(!isAllDone);
    };

    return (
        <div className={styles.container}>
            <header>
                <Filters
                    filter={visibilityFilter}
                    setFilter={setVisibilityFilter}
                />
            </header>
            <Input
                placeholder="What needs to be done?"
                onSubmit={addTodo}
                classNames={cx('inputTodo')}
            />
            <section>
                <Checkbox
                    isChecked={isAllDone}
                    onToggle={handleToggleAll}
                    classNames={cx('toggleAll')}
                />
                <ul className={styles.list}>
                    {ids.map(id => (
                        <Todo
                            key={id}
                            todo={byId[id]}
                            onEdit={editTodo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    ))}
                    <Todo
                        key={1}
                        todo={{ id: 'c', task: 'test', isDone: false }}
                        onEdit={editTodo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                </ul>
            </section>
        </div>
    );
};

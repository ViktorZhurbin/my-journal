import React, { useState } from 'react';

import { Todo } from '~/components/Todo';
import { Input } from '~/components/Input';
import { ITodoList } from '~/models';

import styles from './TodoList.module.css';
import { Checkbox } from '~/components/Checkbox';
import { Filters } from './Filters';

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
    const [editingId, setEditingId] = useState();
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
            <Input placeholder="What needs to be done?" onSubmit={addTodo} />
            <section>
                <Checkbox checked={isAllDone} onToggle={handleToggleAll} />
                <ul className={styles.list}>
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
        </div>
    );
};

import React, { useState } from 'react';

import { Todo } from '~/components/Todo';
import { Input } from '~/components/Input';
import { ITodoList } from '~/models';

interface TodoListProps {
    todos: ITodoList;
    addTodo: (task: string) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    editTodo: (id: string, task: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
    todos: { ids, byId },
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
}) => {
    const [editingId, setEditingId] = useState();

    return (
        <>
            <Input onSubmit={addTodo} />
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
        </>
    );
};

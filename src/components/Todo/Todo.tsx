import React, { useState } from 'react';

import { Checkbox } from '~/components/Checkbox';
import { ITodo } from '~/models';

import styles from './Todo.module.css';

interface TodoProps {
    todo: ITodo;
    isEditing: boolean;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    toggleEdit: (id: string | null) => void;
    onEdit: (id: string, task: string) => void;
}

export const Todo: React.FC<TodoProps> = ({
    todo: { id, task, isDone },
    isEditing,
    toggleEdit,
    onDelete,
    onToggle,
    onEdit,
}) => {
    const [editTask, setEditTask] = useState(task);

    const handleSubmit = () => {
        toggleEdit(null);
        onEdit(id, editTask);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isEditing) {
            const title = event.target.value.trim();
            setEditTask(title);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit();
        } else if (event.key === 'Escape') {
            setEditTask(task);
            toggleEdit(null);
        }
    };

    const handleToggle = () => onToggle(id);
    const handleDelete = () => onDelete(id);
    const handleToggleEdit = () => toggleEdit(id);

    return (
        <>
            <li className={styles.listItem}>
                {isEditing ? (
                    <input
                        autoFocus
                        className={styles.edit}
                        type="text"
                        value={editTask}
                        onChange={handleChange}
                        onBlur={handleSubmit}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <Checkbox
                        checked={isDone}
                        label={task}
                        onToggle={handleToggle}
                        onLabelClick={handleToggleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </li>
        </>
    );
};

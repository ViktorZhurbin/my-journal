import React, { useState } from 'react';

import styles from './Todo.module.css';

import { ITodo } from '~/models';

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
                <div className={styles.view}>
                    <input
                        type="checkbox"
                        checked={isDone}
                        onChange={handleToggle}
                    />
                    <div className={styles.textWithButton}>
                        <label onClick={handleToggleEdit}>{task}</label>
                        <div className={styles.delete} onClick={handleDelete}>
                            x
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
};

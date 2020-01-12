import React, { useState } from 'react';

import { Checkbox } from '~/components/Checkbox';
import { ITodo } from '~/models';

import styles from './Todo.module.css';
import { TextInput } from '../TextInput';

interface TodoProps {
    todo: ITodo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, task: string) => void;
}

export const Todo: React.FC<TodoProps> = ({
    todo: { id, task, isDone },
    onDelete,
    onToggle,
    onEdit,
}) => {
    const handleInputSubmit = (inputValue: string) => onEdit(id, inputValue);
    const handleToggle = () => onToggle(id);
    const handleDelete = () => onDelete(id);

    return (
        <li className={styles.listItem}>
            <Checkbox isChecked={isDone} onToggle={handleToggle} />
            <TextInput
                text={task}
                onDelete={handleDelete}
                onEdit={handleInputSubmit}
            />
        </li>
    );
};

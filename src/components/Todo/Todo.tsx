import React, { useState } from 'react';
import classNames from 'classnames/bind';

import { Checkbox } from '~/components/Checkbox';
import { TextInput } from '~/components/TextInput';
import { ITodo } from '~/models';

import styles from './Todo.module.css';

const cx = classNames.bind(styles);

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
    const [isEditing, setIsEditing] = useState(false);

    const handleInputSubmit = (inputValue: string) => onEdit(id, inputValue);
    const handleCheckboxToggle = () => onToggle(id);
    const handleDelete = () => onDelete(id);

    return (
        <li className={cx('todo', { isEditing })}>
            <Checkbox isChecked={isDone} onToggle={handleCheckboxToggle} />
            <TextInput
                text={task}
                classNames={cx({ isDone })}
                onDelete={handleDelete}
                onSubmit={handleInputSubmit}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />
        </li>
    );
};

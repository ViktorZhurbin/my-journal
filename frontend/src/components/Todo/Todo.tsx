import React, { useState } from 'react';
import classNames from 'classnames/bind';

import { Checkbox } from '../Checkbox';
import { EditableText } from '../EditableText';

import styles from './Todo.module.css';

const cx = classNames.bind(styles);

interface TodoProps {
    task: string;
    isComplete: boolean;
    onToggle: () => void;
    onEdit: (task: string) => void;
    onDelete: () => void;
}

export const Todo: React.FC<TodoProps> = ({
    task,
    isComplete,
    onToggle,
    onEdit,
    onDelete,
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const onEditCancel = () => setIsEditing(false);
    const onEditStart = () => setIsEditing(true);

    return (
        <li className={cx('todo', { isEditing })}>
            <Checkbox
                classNames={cx('checkbox')}
                isChecked={isComplete}
                onToggle={onToggle}
            />
            <EditableText
                text={task}
                classNames={cx('todoText', { isComplete })}
                onSubmit={onEdit}
                onCancel={onEditCancel}
                onStart={onEditStart}
            />
            <span className={cx('deleteText')} onClick={onDelete}>
                X
            </span>
        </li>
    );
};

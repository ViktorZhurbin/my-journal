import React, { useState } from 'react';
import classNames from 'classnames/bind';

import { Checkbox } from '~/components/Checkbox';
import { EditableText } from '~/components/EditableText';

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

    return (
        <li className={cx('todo', { isEditing })}>
            <Checkbox
                classNames={cx('checkbox')}
                isChecked={isComplete}
                onToggle={onToggle}
            />
            <div className={cx('todoItem')}>
                <EditableText
                    text={task}
                    classNames={cx('todoText', { isComplete })}
                    onSubmit={onEdit}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                />
                <div
                    className={cx('deleteButton')}
                    onClick={onDelete}
                    role="button"
                    aria-label="Delete"
                />
            </div>
        </li>
    );
};

import React, { useState } from 'react';
import classNames from 'classnames/bind';

import { TodoInput } from '~/components/Todo/InputField/TodoInput';

import styles from '../Todo.module.css';

const cx = classNames.bind(styles);

interface InputFieldProps {
    onCreate: (task: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ onCreate }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <li className={cx('todo', { isEditing })}>
            <div className={cx('plus')} />
            <TodoInput
                placeholder="New task"
                classNames={cx('input', 'todoText', { isEditing })}
                onInputSubmit={onCreate}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />
        </li>
    );
};

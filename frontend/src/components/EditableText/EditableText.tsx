import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './EditableText.module.css';

const cx = classNames.bind(styles);

interface IEditableTextProps {
    text: string;
    onSubmit: (value: string) => void;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    classNames: string;
}
export const EditableText: React.FC<IEditableTextProps> = ({
    text,
    onSubmit,
    isEditing,
    setIsEditing,
    classNames,
}) => {
    const [inputValue, setInputValue] = useState(text || '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isEditing) {
            setInputValue(event.target.value);
        }
    };

    const handleSubmit = () => {
        if (inputValue.length) {
            onSubmit(inputValue);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setInputValue(text);
        setIsEditing(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit();
        } else if (event.key === 'Escape') {
            handleCancel();
        }
    };

    const onTextClick = () => setIsEditing(true);

    return isEditing ? (
        <input
            autoFocus
            className={cx('edit', classNames)}
            type="text"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
        />
    ) : (
        <div className={cx('text', classNames)} onClick={onTextClick}>
            {inputValue}
        </div>
    );
};

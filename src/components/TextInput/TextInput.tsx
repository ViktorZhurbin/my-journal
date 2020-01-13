import React, { useState } from 'react';

import styles from './TextInput.module.css';

interface ITextInputProps {
    text: string;
    onDelete: () => void;
    onSubmit: (value: string) => void;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
}
export const TextInput: React.FC<ITextInputProps> = ({
    text,
    onDelete,
    onSubmit,
    isEditing,
    setIsEditing,
}) => {
    const [inputValue, setInputValue] = useState(text || '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isEditing) {
            const title = event.target.value.trim();
            setInputValue(title);
        }
    };

    const handleSubmit = () => {
        onSubmit(inputValue);
        setIsEditing(false);
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

    return (
        <div className={styles.container}>
            {isEditing ? (
                <input
                    autoFocus
                    className={styles.edit}
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleSubmit}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <>
                    <div className={styles.text} onClick={onTextClick}>
                        {text}
                    </div>
                    <div
                        className={styles.deleteButton}
                        onClick={onDelete}
                        role="button"
                        aria-label="Delete"
                    />
                </>
            )}
        </div>
    );
};

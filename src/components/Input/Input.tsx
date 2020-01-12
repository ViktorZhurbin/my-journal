import React, { useState } from 'react';

import styles from './Input.module.css';

interface IInputProps {
    onSubmit: (value: string) => void;
    placeholder?: string;
}

export const Input: React.FC<IInputProps> = ({ onSubmit, placeholder }) => {
    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();
        setValue(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSubmit(value);
            setValue('');
        }
    };
    return (
        <input
            className={styles.input}
            type="text"
            placeholder={placeholder || ''}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};

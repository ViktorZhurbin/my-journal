import React, { useState } from 'react';

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
        }
    };
    return (
        <input
            type="text"
            placeholder={placeholder || ''}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};

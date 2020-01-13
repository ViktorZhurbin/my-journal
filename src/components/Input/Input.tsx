import React, { useState } from 'react';

interface IInputProps {
    onSubmit: (value: string) => void;
    placeholder?: string;
    classNames?: any;
}

export const Input: React.FC<IInputProps> = ({
    onSubmit,
    placeholder,
    classNames,
}) => {
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
            className={classNames}
            type="text"
            placeholder={placeholder || ''}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};

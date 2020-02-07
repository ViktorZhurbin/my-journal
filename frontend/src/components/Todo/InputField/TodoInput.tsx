import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from '../Todo.module.css';

const cx = classNames.bind(styles);

const normalizeHtml = (str: string): string => {
    return str && str.replace(/&nbsp;|\u202F|\u00A0/g, '');
};

interface TodoInputProps {
    placeholder: string;
    isEditing: boolean;
    classNames?: string;
    setIsEditing: (value: boolean) => void;
    onInputSubmit: (value: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({
    placeholder,
    isEditing,
    setIsEditing,
    onInputSubmit,
    classNames,
}) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (refDiv?.current) {
            if (isEditing) {
                refDiv.current.focus();
                refDiv.current.innerText = '';
            } else {
                refDiv.current.innerText = placeholder;
                setInputValue('');
            }
        }
    }, [isEditing]);

    const refDiv = useRef<HTMLDivElement>(null);

    const onInput = (event: React.SyntheticEvent<HTMLElement>) => {
        let target = event.target as HTMLDivElement;
        const input = normalizeHtml(target.innerText);

        setInputValue(input);
    };

    const handleSubmit = () => {
        if (inputValue.length) {
            onInputSubmit(inputValue);
            setInputValue('');
            if (refDiv?.current) {
                refDiv.current.innerText = '';
            }
        }
    };

    const onCancel = () => setIsEditing(false);

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            // prevent adding new line
            event.preventDefault();
            handleSubmit();
        } else if (event.key === 'Escape') {
            onCancel();
        }
    };

    const onClick = () => setIsEditing(true);

    return (
        <div
            className={cx('placeholder', classNames)}
            ref={refDiv}
            onClick={onClick}
            onInput={onInput}
            onBlur={onCancel}
            onKeyDown={onKeyDown}
            contentEditable={isEditing}
            suppressContentEditableWarning
        >
            {placeholder}
        </div>
    );
};

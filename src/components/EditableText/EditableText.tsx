import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './EditableText.module.css';

const cx = classNames.bind(styles);

interface EditableTextProps {
    text: string;
    className?: string;
    onBlur?: () => void;
    onFocus?: () => void;
    onEdit?: (value: string) => void;
}

export const EditableText: React.FC<EditableTextProps> = ({
    className,
    text,
    onEdit,
    onBlur,
    onFocus,
}) => {
    const [value, setValue] = useState(text);
    const textAreaRef = useRef<HTMLDivElement>(null);

    const handleInput = (event: React.ChangeEvent<HTMLDivElement>) => {
        setValue(event.target.innerText);
    };

    const handleBlur = () => {
        textAreaRef?.current.blur();
        onBlur();
    };

    const handleSubmit = () => {
        if (value !== text && value.length) {
            onEdit(value);
        }
        handleBlur();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
        if (event.key === 'Escape') {
            handleBlur();
        }
    };

    return (
        <div
            ref={textAreaRef}
            className={cx('text', className)}
            onClick={onFocus}
            onInput={handleInput}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            contentEditable={true}
            suppressContentEditableWarning
        >
            {text}
        </div>
    );
};

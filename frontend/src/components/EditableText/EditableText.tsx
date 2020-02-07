import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './EditableText.module.css';

const cx = classNames.bind(styles);

interface EditableTextProps {
    text: string;
    isEditing: boolean;
    classNames?: string;
    setIsEditing: (value: boolean) => void;
    onInputSubmit: (value: string) => void;
}

export const EditableText: React.FC<EditableTextProps> = ({
    text,
    isEditing,
    setIsEditing,
    onInputSubmit,
    classNames,
}) => {
    const [inputValue, setInputValue] = useState(text);

    useEffect(() => {
        if (isEditing) {
            refDiv?.current?.focus();
        }
    }, [isEditing]);

    const refDiv = useRef<HTMLDivElement>(null);

    const onInput = (event: React.SyntheticEvent<HTMLElement>) => {
        let target = event.target as HTMLDivElement;

        setInputValue(target.innerText);
    };

    const handleSubmit = () => {
        if (inputValue !== text && inputValue.length) {
            onInputSubmit(inputValue);
        }

        setIsEditing(false);
    };

    const onCancel = () => {
        if (refDiv?.current) {
            refDiv.current.innerText = text;
        }
        setInputValue(text);
        setIsEditing(false);
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit();
        } else if (event.key === 'Escape') {
            onCancel();
        }
    };

    const onClick = () => {
        setIsEditing(true);
        refDiv?.current?.focus();
    };

    return (
        <div
            className={cx('text', classNames)}
            ref={refDiv}
            onClick={onClick}
            onInput={onInput}
            onBlur={handleSubmit}
            onKeyDown={onKeyDown}
            contentEditable={isEditing}
            suppressContentEditableWarning
        >
            {text}
        </div>
    );
};

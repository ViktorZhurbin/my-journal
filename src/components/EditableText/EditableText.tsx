import React, { useState, useRef, useEffect, forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './EditableText.module.css';

const cx = classNames.bind(styles);

interface EditableTextProps {
    text: string;
    className?: string;
    placeholder?: string;
    name?: string;
    active?: boolean;
    onBlur?: () => void;
    onFocus?: () => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onTouchMove?: () => void;
    ref?: React.RefObject<HTMLDivElement>;

    isFocused: boolean;
    // setIsEditing: (value: boolean) => void;
    // onInputSubmit: (value: string) => void;
}

export const EditableText = forwardRef<HTMLDivElement, EditableTextProps>(
    (
        { className, text, onChange, onKeyDown, onBlur, onFocus, isFocused },
        ref
    ) => {
        const [value, setValue] = useState(text);

        // useEffect(() => {
        //     if (isEditing) {
        //         refDiv?.current?.focus();
        //     }
        // }, [isEditing]);

        // const refDiv = useRef<HTMLDivElement>(null);

        // const handleSubmit = () => {
        //     if (value !== text && value.length) {
        //         onInputSubmit(value);
        //     }

        //     setIsEditing(false);
        // };

        // const onCancel = () => {
        //     if (refDiv?.current) {
        //         refDiv.current.innerText = text;
        //     }
        //     setValue(text);
        //     setIsEditing(false);
        // };

        // const onKeyDown = (event: React.KeyboardEvent) => {
        //     if (event.key === 'Enter') {
        //         handleSubmit();
        //     } else if (event.key === 'Escape') {
        //         onCancel();
        //     }
        // };

        // const onClick = () => {
        //     setIsEditing(true);
        //     refDiv?.current?.focus();
        // };

        return (
            <div
                className={cx('text', className)}
                ref={ref}
                onClick={onFocus}
                onInput={onChange}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                contentEditable={true}
                suppressContentEditableWarning
            >
                {text}
            </div>
        );
    }
);

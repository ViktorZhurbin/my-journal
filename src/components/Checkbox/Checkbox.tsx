import React from 'react';
import classNames from 'classnames/bind';

import styles from './Checkbox.module.css';

const cx = classNames.bind(styles);

interface ICheckboxProps {
    isChecked: boolean;
    onToggle: () => void;
    classNames?: string;
}

export const Checkbox: React.FC<ICheckboxProps> = ({
    isChecked,
    onToggle,
    classNames,
}) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            onToggle();
        }
    };

    return (
        <div
            className={cx('checkbox', classNames, { isChecked })}
            onClick={onToggle}
            tabIndex={0}
            role="checkbox"
            aria-checked={isChecked}
            onKeyDown={handleKeyDown}
        >
            <svg viewBox="0,0,50,50">
                <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
        </div>
    );
};

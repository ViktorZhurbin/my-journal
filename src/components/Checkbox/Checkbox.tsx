import React from 'react';
import classNames from 'classnames/bind';

import styles from './Checkbox.module.css';

const cx = classNames.bind(styles);

interface ICheckboxProps {
    checked: boolean;
    label: string;
    onToggle: () => void;
    onLabelClick: () => void;
    onDelete: () => void;
}
export const Checkbox: React.FC<ICheckboxProps> = ({
    checked,
    label,
    onToggle,
    onLabelClick,
    onDelete,
}) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            onToggle();
        }
    };

    return (
            <div className={styles.row}>
                <div
                    className={cx('checkbox', { checked })}
                    onClick={onToggle}
                    tabIndex={0}
                    role="checkbox"
                    aria-checked={checked}
                    onKeyDown={handleKeyDown}
                >
                    <svg viewBox="0,0,50,50">
                        <path d="M5 30 L 20 45 L 45 5"></path>
                    </svg>
                </div>
                <div className={styles.labelWithButton}>
                    <div className={styles.label} onClick={onLabelClick}>
                        {label}
                    </div>
                    <div
                        className={styles.deleteButton}
                        onClick={onDelete}
                        role="button"
                        aria-label="Delete"
                    />
                </div>
            )}
        </div>
    );
};

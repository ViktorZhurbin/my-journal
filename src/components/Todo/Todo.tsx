import React from 'react';

import styles from './Todo.module.css';

interface TodoProps {
    text: string;
}

export const Todo: React.FC<TodoProps> = ({ text }) => {
    return (
        <li className={styles.listItem}>
            <div>
                <input type="checkbox" />
                <label>{text}</label>
            </div>
        </li>
    );
};

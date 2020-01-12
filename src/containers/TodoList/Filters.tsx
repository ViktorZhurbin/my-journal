import React from 'react';
import classNames from 'classnames/bind';

import {
    SHOW_ACTIVE,
    SHOW_COMPLETED,
    SHOW_ALL,
} from '~/const/visibiltyFilters';

import styles from './TodoList.module.css';

const cx = classNames.bind(styles);

interface IFilterProps {
    filter: string;
    setFilter: (filter: string) => void;
}

export const Filters: React.FC<IFilterProps> = ({ filter, setFilter }) => {
    const showActive = () => setFilter(SHOW_ACTIVE);
    const showCompleted = () => setFilter(SHOW_COMPLETED);
    const showAll = () => setFilter(SHOW_ALL);

    return (
        <div className={styles.filters}>
            <p
                className={cx('filterItem', {
                    selected: filter === SHOW_ALL,
                })}
                onClick={showAll}
            >
                All
            </p>
            <p
                className={cx('filterItem', {
                    selected: filter === SHOW_ACTIVE,
                })}
                onClick={showActive}
            >
                To Do
            </p>
            <p
                className={cx('filterItem', {
                    selected: filter === SHOW_COMPLETED,
                })}
                onClick={showCompleted}
            >
                Done
            </p>
        </div>
    );
};

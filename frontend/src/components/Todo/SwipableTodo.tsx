import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { motion, useAnimation, PanInfo } from 'framer-motion';

import DragHandleIcon from '~/assets/icons/dragIcon.svg';

import styles from './Todo.module.css';
import { Todo } from './Todo';

const cx = classNames.bind(styles);

interface SwipableTodoProps {
    task: string;
    isComplete: boolean;
    onToggle: () => void;
    onEdit: (task: string) => void;
    onDelete: () => void;
    dragHandleProps: any;
}

export const SwipableTodo: React.FC<SwipableTodoProps> = ({
    task,
    isComplete,
    onToggle,
    onEdit,
    onDelete,
    dragHandleProps,
}) => {
    const controls = useAnimation();

    const handleDelete = async (event: any, info: PanInfo) => {
        const { x: point } = info.point;
        const { x: velocity } = info.velocity;
        if (point < -50 || velocity < -500) {
            await controls.start({
                x: '-80%',
                transition: { duration: 0.3 },
            });
            onDelete();
        } else if (point > 50 || velocity > 500) {
            await controls.start({
                x: '80%',
                transition: { duration: 0.3 },
            });
            onDelete();
        } else {
            controls.start({
                x: 0,
                transition: { duration: 0.4 },
            });
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('deleteText', 'left')} onClick={onDelete}>
                Delete
            </div>
            <motion.div
                className={cx('motion')}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDelete}
                dragDirectionLock
                animate={controls}
            >
                <Todo
                    task={task}
                    isComplete={isComplete}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
                <span {...dragHandleProps} className={cx('dragHandle')}>
                    <DragHandleIcon className={cx('dragIcon')} />
                </span>
            </motion.div>
            <div className={cx('deleteText', 'right')} onClick={onDelete}>
                Delete
            </div>
        </div>
    );
};

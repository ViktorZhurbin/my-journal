import React from 'react';
import classNames from 'classnames/bind';
import { motion, useAnimation, PanInfo } from 'framer-motion';

import DragHandleIcon from './icon.svg';

import { BaseTodo } from './BaseTodo';
import styles from './Todo.module.css';
import { useTodo } from '../../hooks/useTodo';
import { ITodo } from '../../types';

const cx = classNames.bind(styles);

interface TodoProps {
    todo: ITodo;
    dragHandleProps: any;
}

export const Todo: React.FC<TodoProps> = ({ todo, dragHandleProps }) => {
    const controls = useAnimation();
    const { deleteTodo } = useTodo();

    const handleDelete = async (event: any, info: PanInfo) => {
        const { x: point } = info.point;
        const { x: velocity } = info.velocity;
        if (point < -50 || velocity < -500) {
            await controls.start({
                x: '-80%',
                transition: { duration: 0.3 },
            });
            deleteTodo(todo._id);
        } else if (point > 50 || velocity > 500) {
            await controls.start({
                x: '80%',
                transition: { duration: 0.3 },
            });
            deleteTodo(todo._id);
        } else {
            controls.start({
                x: 0,
                transition: { duration: 0.4 },
            });
        }
    };

    return (
        <div className={cx('container')}>
            <motion.div
                className={cx('motion')}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDelete}
                dragDirectionLock
                animate={controls}
            >
                <BaseTodo todo={todo} />
                <span {...dragHandleProps} className={cx('dragHandle')}>
                    <DragHandleIcon />
                </span>
            </motion.div>
        </div>
    );
};

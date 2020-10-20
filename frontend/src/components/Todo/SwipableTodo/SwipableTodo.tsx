import React from 'react';
import classNames from 'classnames/bind';
import { motion, useAnimation, PanInfo } from 'framer-motion';

import DragHandleIcon from '../../../assets/icons/dragIcon.svg';

import { BaseTodo } from './BaseTodo';
import styles from './SwipableTodo.module.css';

const cx = classNames.bind(styles);

interface SwipableTodoProps {
    text: string;
    isComplete: boolean;
    onToggle: () => void;
    onEdit: (text: string) => void;
    onDelete: () => void;
    dragHandleProps: any;
}

export const SwipableTodo: React.FC<SwipableTodoProps> = ({
    text,
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
            <motion.div
                className={cx('motion')}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDelete}
                dragDirectionLock
                animate={controls}
            >
                <BaseTodo
                    text={text}
                    isComplete={isComplete}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
                <span {...dragHandleProps} className={cx('dragHandle')}>
                    <DragHandleIcon className={cx('dragIcon')} />
                </span>
            </motion.div>
        </div>
    );
};

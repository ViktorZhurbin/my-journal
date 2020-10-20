import React from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import classNames from 'classnames/bind';

import { reorder } from '../../../helpers';
import { SwipableTodo } from '../../../components/Todo';

import { ITodo } from '../../../models';

import styles from './DraggableTodoList.module.css';

const cx = classNames.bind(styles);

interface DraggableTodoListProps {
    todos: ITodo[];
    onReorder: (reordered: ITodo[]) => void;
}

const DraggableTodoList: React.FC<DraggableTodoListProps> = ({
    todos,
    onReorder,
}) => {
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const reorderedActiveTodos = reorder(
            todos,
            result.source.index,
            result.destination.index
        );

        onReorder(reorderedActiveTodos);
    };

    return (
        <ul className={cx('list')}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="active">
                    {(provided, { isDraggingOver }) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {todos?.map((todo, index) => (
                                <Draggable
                                    draggableId={todo.id}
                                    key={todo.id}
                                    index={index}
                                >
                                    {(provided, { isDragging }) => (
                                        <div
                                            className={cx('todoWrapper', {
                                                isDraggingOver,
                                            })}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                        >
                                            <SwipableTodo
                                                todo={todo}
                                                dragHandleProps={
                                                    provided.dragHandleProps
                                                }
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </ul>
    );
};

export { DraggableTodoList };

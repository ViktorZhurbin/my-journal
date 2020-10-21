import React from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import classNames from 'classnames/bind';

import { reorderArray } from '~/utils';
import { Todo } from '../Todo';

import { ITodo } from '../../models';

import styles from './DraggableTodoList.module.css';
import { useTodoMutations } from '../../hooks/useTodoMutations';

const cx = classNames.bind(styles);

interface DraggableTodoListProps {
    todos: ITodo[];
}

const DraggableTodoList: React.FC<DraggableTodoListProps> = ({ todos }) => {
    const { updateAllTodos } = useTodoMutations({
        id: '1',
        task: 'a',
        isComplete: false,
    });
    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination || destination.index === source.index) {
            return;
        }

        const updatedTodos = reorderArray(
            todos,
            source.index,
            destination.index
        );

        updateAllTodos(updatedTodos);
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
                                            <Todo
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

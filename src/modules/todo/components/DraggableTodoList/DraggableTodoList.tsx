import React from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import classNames from 'classnames/bind';
import { mutate } from 'swr';
import { reorderArray } from '~/utils';
import { Todo } from '../Todo';

import { ITodo } from '../../types';

import styles from './DraggableTodoList.module.css';
import { useTodo } from '../../hooks/useTodo';

const cx = classNames.bind(styles);

interface DraggableTodoListProps {
    todos: ITodo[];
}

const DraggableTodoList: React.FC<DraggableTodoListProps> = ({ todos }) => {
    const { updateAllTodos } = useTodo();
    const handleUpdateAllTodos = async (updatedTodos: ITodo[]) => {
        mutate('/api/getTodos', { success: true, data: updatedTodos }, false);
        await updateAllTodos(updatedTodos);
        mutate('/api/getTodos');
    };
    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination || destination.index === source.index) {
            return;
        }

        const updatedTodos = reorderArray(
            todos,
            source.index,
            destination.index
        );

        handleUpdateAllTodos(updatedTodos);
    };

    return (
        Boolean(todos) && (
            <ul className={cx('list')}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="active">
                        {(provided, { isDraggingOver }) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {todos.map((todo, index) => (
                                    <Draggable
                                        draggableId={todo._id}
                                        key={todo._id}
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
        )
    );
};

export { DraggableTodoList };

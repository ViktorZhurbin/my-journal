import React from 'react';
import { Todo } from '../Todo';

interface TodoListProps {
    todos: string[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
    return (
        <ul>
            {todos.map(text => (
                <Todo text={text} />
            ))}
        </ul>
    );
};

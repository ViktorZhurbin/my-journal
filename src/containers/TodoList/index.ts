import { connect } from 'react-redux';

import { TodoList } from './TodoList';
import { IStore } from '~/models/InterfaceStore';
import {
    todoAddAction,
    todoToggleAction,
    todoDeleteAction,
    todoEditAction,
    setVisibilityFilter,
} from '~/store/todos/actions';
import { getVisibleTodos } from '~/store/todos/selectors';

const mapStateToProps = (store: IStore) => ({
    todos: getVisibleTodos(store),
});

const mapDispatchToProps = {
    toggleTodo: todoToggleAction,
    addTodo: todoAddAction,
    editTodo: todoEditAction,
    deleteTodo: todoDeleteAction,
    setVisibilityFilter,
};

const ConnectedTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export { ConnectedTodoList as TodoList };

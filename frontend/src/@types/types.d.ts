export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};






export type Mutation = {
  __typename?: 'Mutation';
  createTodo: TodoUpdateResponse;
  deleteTodo: ResponseMessage;
  deleteAllTodos: ResponseMessage;
  editTodo: TodoUpdateResponse;
  toggleTodo: TodoUpdateResponse;
  updateAllTodos: TodoUpdateAllResponse;
};


export type MutationCreateTodoArgs = {
  task: Scalars['String'];
};


export type MutationDeleteTodoArgs = {
  id: Scalars['String'];
};


export type MutationEditTodoArgs = {
  id: Scalars['String'];
  task: Scalars['String'];
};


export type MutationToggleTodoArgs = {
  id: Scalars['String'];
  isComplete: Scalars['Boolean'];
};


export type MutationUpdateAllTodosArgs = {
  todos: Array<Maybe<TodoInput>>;
};

export type Query = {
  __typename?: 'Query';
  todos: Array<Maybe<Todo>>;
};

export type ResponseMessage = {
  __typename?: 'ResponseMessage';
  success: Scalars['Boolean'];
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['String'];
  task: Scalars['String'];
  isComplete: Scalars['Boolean'];
};

export type TodoInput = {
  id: Scalars['String'];
  task: Scalars['String'];
  isComplete: Scalars['Boolean'];
};

export type TodoUpdateAllResponse = {
  __typename?: 'TodoUpdateAllResponse';
  success: Scalars['Boolean'];
  data?: Maybe<Query>;
};

export type TodoUpdateResponse = {
  __typename?: 'TodoUpdateResponse';
  success: Scalars['Boolean'];
  data: Todo;
};

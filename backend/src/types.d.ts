import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  _FieldSet: any,
};






export type AllTodos = {
   __typename?: 'AllTodos',
  all?: Maybe<Array<Maybe<Todo>>>,
  active?: Maybe<Array<Maybe<Todo>>>,
  completed?: Maybe<Array<Maybe<Todo>>>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createTodo: TodoUpdateResponse,
  deleteTodo: ResponseMessage,
  editTodo: TodoUpdateResponse,
  toggleTodo?: Maybe<TodoUpdateResponse>,
  updateAllTodos: TodoUpdateAllResponse,
};


export type MutationCreateTodoArgs = {
  task: Scalars['String']
};


export type MutationDeleteTodoArgs = {
  id: Scalars['String']
};


export type MutationEditTodoArgs = {
  id: Scalars['String'],
  task: Scalars['String']
};


export type MutationToggleTodoArgs = {
  id: Scalars['String']
};


export type MutationUpdateAllTodosArgs = {
  todos: Array<Maybe<TodoInput>>
};

export type Query = {
   __typename?: 'Query',
  todos?: Maybe<AllTodos>,
};

export type ResponseMessage = {
   __typename?: 'ResponseMessage',
  success: Scalars['Boolean'],
};

export type Todo = {
   __typename?: 'Todo',
  id: Scalars['String'],
  task: Scalars['String'],
  isComplete: Scalars['Boolean'],
};

export type TodoInput = {
  id: Scalars['String'],
  task: Scalars['String'],
  isComplete: Scalars['Boolean'],
};

export type Todos = {
   __typename?: 'Todos',
  todos?: Maybe<AllTodos>,
};

export type TodoUpdateAllResponse = {
   __typename?: 'TodoUpdateAllResponse',
  success: Scalars['Boolean'],
  data: Todos,
};

export type TodoUpdateResponse = {
   __typename?: 'TodoUpdateResponse',
  success: Scalars['Boolean'],
  data: Todo,
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn = (obj: any, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  AllTodos: ResolverTypeWrapper<AllTodos>,
  Todo: ResolverTypeWrapper<Todo>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Mutation: ResolverTypeWrapper<{}>,
  TodoUpdateResponse: ResolverTypeWrapper<TodoUpdateResponse>,
  ResponseMessage: ResolverTypeWrapper<ResponseMessage>,
  TodoInput: TodoInput,
  TodoUpdateAllResponse: ResolverTypeWrapper<TodoUpdateAllResponse>,
  Todos: ResolverTypeWrapper<Todos>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  AllTodos: AllTodos,
  Todo: Todo,
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Mutation: {},
  TodoUpdateResponse: TodoUpdateResponse,
  ResponseMessage: ResponseMessage,
  TodoInput: TodoInput,
  TodoUpdateAllResponse: TodoUpdateAllResponse,
  Todos: Todos,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  todos?: Resolver<Maybe<ResolversTypes['AllTodos']>, ParentType, ContextType>,
}>;

export type AllTodosResolvers<ContextType = any, ParentType extends ResolversParentTypes['AllTodos'] = ResolversParentTypes['AllTodos']> = ResolversObject<{
  all?: Resolver<Maybe<Array<Maybe<ResolversTypes['Todo']>>>, ParentType, ContextType>,
  active?: Resolver<Maybe<Array<Maybe<ResolversTypes['Todo']>>>, ParentType, ContextType>,
  completed?: Resolver<Maybe<Array<Maybe<ResolversTypes['Todo']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  task?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  isComplete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createTodo?: Resolver<ResolversTypes['TodoUpdateResponse'], ParentType, ContextType, RequireFields<MutationCreateTodoArgs, 'task'>>,
  deleteTodo?: Resolver<ResolversTypes['ResponseMessage'], ParentType, ContextType, RequireFields<MutationDeleteTodoArgs, 'id'>>,
  editTodo?: Resolver<ResolversTypes['TodoUpdateResponse'], ParentType, ContextType, RequireFields<MutationEditTodoArgs, 'id' | 'task'>>,
  toggleTodo?: Resolver<Maybe<ResolversTypes['TodoUpdateResponse']>, ParentType, ContextType, RequireFields<MutationToggleTodoArgs, 'id'>>,
  updateAllTodos?: Resolver<ResolversTypes['TodoUpdateAllResponse'], ParentType, ContextType, RequireFields<MutationUpdateAllTodosArgs, 'todos'>>,
}>;

export type TodoUpdateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TodoUpdateResponse'] = ResolversParentTypes['TodoUpdateResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  data?: Resolver<ResolversTypes['Todo'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type ResponseMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResponseMessage'] = ResolversParentTypes['ResponseMessage']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type TodoUpdateAllResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TodoUpdateAllResponse'] = ResolversParentTypes['TodoUpdateAllResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  data?: Resolver<ResolversTypes['Todos'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type TodosResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todos'] = ResolversParentTypes['Todos']> = ResolversObject<{
  todos?: Resolver<Maybe<ResolversTypes['AllTodos']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>,
  AllTodos?: AllTodosResolvers<ContextType>,
  Todo?: TodoResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  TodoUpdateResponse?: TodoUpdateResponseResolvers<ContextType>,
  ResponseMessage?: ResponseMessageResolvers<ContextType>,
  TodoUpdateAllResponse?: TodoUpdateAllResponseResolvers<ContextType>,
  Todos?: TodosResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

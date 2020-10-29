import { Todo } from './Todo';

export type Account = {
    compoundId: string;
    userId: string;
    providerType: string;
    providerId: string;
    accessToken: string;
    createdAt: Date;
    updatedAt: Date;
    todos: Todo[];
};

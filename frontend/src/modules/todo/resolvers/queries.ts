import { gql } from 'apollo-boost';

export const GET_TODOS = gql`
    query Todos {
        todos {
            id
            task
            isComplete
        }
    }
`;

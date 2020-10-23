import { gql } from '@apollo/client';

export const GET_TODOS = gql`
    query Todos {
        todos {
            id
            task
            isComplete
        }
    }
`;

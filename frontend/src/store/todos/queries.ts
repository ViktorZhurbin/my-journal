import { gql } from 'apollo-boost';

export const GET_TODOS = gql`
    query Todos {
        todos {
            all {
                id
                task
                isComplete
            }
            active {
                id
                task
                isComplete
            }
            completed {
                id
                task
                isComplete
            }
        }
    }
`;

import gql from 'graphql-tag';

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

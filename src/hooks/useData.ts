import useSWR from 'swr';

const fetcher = (input: RequestInfo, init?: RequestInit) =>
    fetch(input, init).then((res) => res.json());

export const useData = (apiEndpoint: string): any => {
    const { data, error } = useSWR(apiEndpoint, fetcher);

    return {
        data: data?.data,
        isLoading: !error && !data,
        isError: error,
    };
};

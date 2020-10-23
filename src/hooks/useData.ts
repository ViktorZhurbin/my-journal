import useSWR from 'swr';

const fetcher = (input: RequestInfo, init?: RequestInit) =>
    fetch(input, init).then((res) => res.json());

export const useData = (apiEndpoint: string) => {
    const { data, error } = useSWR(apiEndpoint, fetcher);
    console.log('data', data);

    return {
        data: data?.data,
        isLoading: !error && !data,
        isError: error,
    };
};

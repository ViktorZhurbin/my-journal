import { GenericObject } from '@/@types';

const contentType = 'application/json';
const headers = {
    Accept: contentType,
    'Content-Type': contentType,
};

export const fetcher = async (
    endpoint: string,
    method: string,
    payload: GenericObject
): Promise<any> => {
    try {
        const res = await fetch(endpoint, {
            method,
            headers,
            body: JSON.stringify({ ...payload }),
        });

        if (!res.ok) {
            throw new Error(`${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error(`Request failed with status code ${error.message}`);
    }
};

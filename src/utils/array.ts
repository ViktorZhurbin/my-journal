export const reorderArray = (
    array: any[],
    startIndex: number,
    endIndex: number
) => {
    const result = [...array];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

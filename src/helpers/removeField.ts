const removeKey = <T extends object, K extends keyof T>(value: T, key: K): Omit<T, K> => {
    const copy = { ...value };
    delete copy[key];
    return copy;
};

export default removeKey;

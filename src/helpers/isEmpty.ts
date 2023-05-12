function isEmpty(value: string | object): boolean {
    if (typeof value === 'string') {
        return value === '';
    }
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    return Object.keys(value).length === 0;
}

export default isEmpty;

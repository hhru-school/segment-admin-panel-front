function hasFields<T>(obj: object, fields: (keyof T)[]): boolean {
    return fields.every((field) => field in obj);
}

export default hasFields;

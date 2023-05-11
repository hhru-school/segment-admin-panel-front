function hasFields<T>(obj: object, fields: (keyof T)[]): boolean {
    return fields.every((field) => obj.hasOwnProperty(field));
}

export default hasFields;

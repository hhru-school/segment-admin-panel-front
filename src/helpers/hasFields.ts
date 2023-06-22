function hasFields<T>(obj: object, fields: (keyof T)[]): obj is Record<keyof T, unknown> {
    return fields.every((field) => obj.hasOwnProperty(field));
}

export default hasFields;

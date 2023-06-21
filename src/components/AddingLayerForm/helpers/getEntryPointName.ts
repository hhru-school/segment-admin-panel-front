const getEntryPointName = (name: string): string => {
    return name.split('.').slice(0, 4).join('.');
};

export default getEntryPointName;

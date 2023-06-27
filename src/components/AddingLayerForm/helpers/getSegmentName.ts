/**
 * Возвращает из наименования поля вида segments.id-1.[другие поля]
 * часть - segments.id-1
 */
const getSegmentName = (name: string): string => {
    return name.split('.').slice(0, 2).join('.');
};

export default getSegmentName;

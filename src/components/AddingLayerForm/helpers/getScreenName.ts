/**
 * Возвращает из наименования поля вида segments.id-1.entryPoints.id-1.screens.id-1.[другие поля]
 * часть - segments.id-1.entryPoints.id-1.screens.id-1
 */
const getScreenName = (name: string): string => {
    return name.split('.').slice(0, 6).join('.');
};

export default getScreenName;

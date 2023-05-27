import { useCallback, useEffect, useMemo } from 'react';

export interface Normalizer<T> {
    (option: T, fixedOptions: Map<string | number, boolean>): boolean;
}
export interface Mapper<T> {
    (option: T): [number | string, boolean];
}
interface ChangeHandler<T> {
    (event: React.SyntheticEvent, newValue: T[]): void;
}

const useFixedOptions = <T>(
    options: T[] | null,
    mapper: Mapper<T>,
    normalizer: Normalizer<T>,
    onChange: (value: T[]) => void
): [Map<string | number, boolean> | null, ChangeHandler<T>] => {
    const fixedOptionsMap = useMemo(() => (options ? new Map(options.map(mapper)) : null), [options, mapper]);

    const handleChange: ChangeHandler<T> = useCallback(
        (event, newValue) => {
            if (options && fixedOptionsMap) {
                const normalizeValue = options.concat(newValue.filter((option) => normalizer(option, fixedOptionsMap)));
                onChange(normalizeValue);
            } else {
                onChange(newValue);
            }
        },
        [options, fixedOptionsMap, normalizer, onChange]
    );

    useEffect(() => {
        onChange(options || []);
    }, [options, onChange]);

    return [fixedOptionsMap, handleChange];
};

export default useFixedOptions;

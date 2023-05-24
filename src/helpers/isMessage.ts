import isEmpty from 'helpers/isEmpty';

const isMessage = (value: unknown): value is string => {
    return typeof value === 'string' && !isEmpty(value);
};

export default isMessage;

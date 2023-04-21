// eslint-disable-next-line @typescript-eslint/no-unused-vars
function exhaustiveCheck(param: never): never {
    throw new Error('Эта ошибка не должна возникнуть');
}

export default exhaustiveCheck;

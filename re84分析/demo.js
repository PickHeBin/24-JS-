const str = 'E08247708934F42E';

// 将字符串中的每个字符映射为数字
const arr = Array.from(str, char => Buffer.from(char).toString('base64'));

console.log(arr);
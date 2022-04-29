// 保存TOKEN
export const setTOKEN = (token) => {
    return localStorage.setItem('TOKEN', token);
}

// 读取TOKEN
export const getTOKEN = () => {
    return localStorage.getItem('TOKEN');
}

// 移除本地存储的TOKEN
export const removeTOKEN = () => {
    localStorage.removeItem('TOKEN');
}
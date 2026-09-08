export function auth(username, password) {
    let flag;
    if (username && password) {
        if (password !== password) {
            flag =false;
        }
        flag = true;
    }
    return flag;
}
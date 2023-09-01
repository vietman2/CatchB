

export const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
        return true;
    }
    return false;
}

export const logout = () => {
    return true;
}

export const register = (username: string, email: string, password: string) => {
    
    return true;
}

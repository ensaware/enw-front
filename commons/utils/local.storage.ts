export enum LocalStorageKeys {
    AUTH = "oauth"
}

export const clearLocalStorage = () => {
    localStorage.clear();
};

export const localStorageKeyExists = (key: string) => {
    const result = localStorage.getItem(key);
    return !!result;
}

export const getLocalStorage = (key: string) => {
    const result = localStorage.getItem(key);
    return !!result && JSON.parse(result);
};

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};

export const setLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
};

import { REACT_APP_BUILD_MODE } from "@/configs";

const prefix = `${REACT_APP_BUILD_MODE}_Gift_Card_Storage`;
const userStorageKey = `${prefix}_User_Data`;

export const getStorage = (key: string): string | null => {
    return localStorage.getItem(key);
}

export const setStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value);
}

export const removeStorage = (key: string): void => {
    localStorage.removeItem(key);
}

export const clearStorage = (): void => {
    localStorage.clear();
}

export const getUserDataStorage = (): any => {
    const tokenString: string | null = localStorage.getItem(userStorageKey);
    let userData: any;
    try {
        userData = tokenString ? JSON.parse(tokenString) : null;
    } catch (e) {
        userData = null;
    }
    return userData;
}

export const setUserDataStorage = (userData: any): void => {
    const prevUserData = getUserDataStorage() || {}
    localStorage.setItem(userStorageKey, JSON.stringify({ ...prevUserData, ...userData }));
}

export const removeUserDataStorage = (): void => {
    removeStorage(userStorageKey);
}

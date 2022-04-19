import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (x: T) => void] {

    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    // window.addEventListener('storage', () => {
    //     console.log("window.addEventListener('storage' called")
    //     const item = window.localStorage.getItem(key);
    //     setStoredValue(item ? JSON.parse(item) as T : initialValue);
    // });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };
    return [storedValue, setValue];
}
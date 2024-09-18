import { browser } from '$app/environment';

// A hook to store and retrieve data in local storage
export function useStorage<T>(key: string, defaultValue: T) {
    function get() {
        if (!browser) return
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : defaultValue;
    }

    function set(newValue: T) {
        if (!browser) return
        const initialValueString = JSON.stringify(defaultValue);
        const previousValueString = localStorage.getItem(key);
        const valueString = JSON.stringify(newValue);
        if (![initialValueString, previousValueString].includes(valueString)) {
            localStorage.setItem(key, valueString);
        }
    }

    return {
        get,
        set
    };
}
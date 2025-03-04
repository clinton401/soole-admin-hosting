import { useDebouncedCallback } from "use-debounce";

const useDebounce = (callback: () => void, delay: number = 500) => {
    return useDebouncedCallback(callback, delay);
    }


    export default useDebounce
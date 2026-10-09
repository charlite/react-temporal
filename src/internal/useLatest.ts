import { useEffect, useRef } from 'react';

/** Keeps a ref to the latest value (for callbacks inside intervals/timeouts). */
export function useLatest<T>(value: T) {
    const ref = useRef(value);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref;
}

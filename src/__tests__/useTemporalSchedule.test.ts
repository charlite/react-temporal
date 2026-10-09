import { renderHook } from '@testing-library/react';
import { useTemporalSchedule } from '../hooks/useTemporalSchedule';
import { Temporal } from '../temporal';

describe('useTemporalSchedule', () => {
    it('schedules a callback at a specific instant', () => {
        vi.useFakeTimers();
        const callback = vi.fn();
        const instant = Temporal.Now.instant().add({ seconds: 1 });
        renderHook(() => useTemporalSchedule(callback, instant));
        vi.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalled();
        vi.useRealTimers();
    });
});

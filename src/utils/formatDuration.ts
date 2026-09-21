/**
 * A stopwatch reading as `m:ss`, or `0:07.4` under ten seconds, where the
 * tenths are what makes a fast round feel fast.
 */
export function formatDuration(ms: number): string {
    const totalSeconds = Math.max(0, ms) / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds - minutes * 60;

    if (minutes === 0 && seconds < 10) {
        return `0:0${seconds.toFixed(1)}`;
    }

    return `${minutes}:${String(Math.floor(seconds)).padStart(2, '0')}`;
}

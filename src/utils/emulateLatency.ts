import { sleep } from './sleep';

export const emulateLatency = async (maxLatency = 2000) => {
    await sleep(Math.floor(Math.random() * maxLatency));
};

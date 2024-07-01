/**
 * Delays execution for a random duration between 0 to 1 second.
 * @returns A Promise that resolves after the random delay.
 */
export const delayRandom = async (): Promise<void> => {
	return new Promise<void>(resolve => {
		const randomDelay = Math.random() * 1000;
		setTimeout(() => {
			resolve();
		}, randomDelay);
	});
};

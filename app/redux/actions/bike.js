export const SET_CURRENT_ELAPSED = 'SET_CURRENT_ELAPSED';

export const setCurrentElapsed = (elapsedTime, elapsedDistance) => {
	return {
		type: SET_CURRENT_ELAPSED,
		current: {
			elapsedTime: elapsedTime,
			elapsedDistance: elapsedDistance
		}
	};
};

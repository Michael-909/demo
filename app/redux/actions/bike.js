export const SET_CURRENT_ELAPSED = 'SET_CURRENT_ELAPSED';
export const ADD_ELAPSED = 'ADD_ELAPSED';

export const setCurrentElapsed = (elapsedTime, elapsedDistance) => {
	return {
		type: SET_CURRENT_ELAPSED,
		current: {
			elapsedTime: elapsedTime,
			elapsedDistance: elapsedDistance
		}
	};
};

export const addElapsed = (elapsedTime, elapsedDistance) => {
	const record = {
		id: Date.now(),
		elapsedTime: elapsedTime,
		distance: elapsedDistance,
		createdAt: new Date().toISOString()
	};
	return {
		type: ADD_ELAPSED,
		record: record
	};
};

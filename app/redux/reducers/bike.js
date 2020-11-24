import { SET_CURRENT_ELAPSED } from "../actions/bike";

const initialState = {
	currentElapsedTime: 0,
	currentElapsedDistance: 0,
};

export default bikeReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_ELAPSED:
			return {
				...state,
				currentElapsedTime: action.current.elapsedTime,
				currentElapsedDistance: action.current.elapsedDistance
			};
	
		default:
			return state;
	};
};

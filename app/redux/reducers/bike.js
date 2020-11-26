import { SET_CURRENT_ELAPSED, ADD_ELAPSED } from "../actions/bike";

const initialState = {
	currentElapsedTime: 0,
	currentElapsedDistance: 0,
	history: []
};

export default bikeReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_ELAPSED:
			return {
				...state,
				currentElapsedTime: action.current.elapsedTime,
				currentElapsedDistance: action.current.elapsedDistance
			};

		case ADD_ELAPSED:
			return {
				...state,
				history: [...state.history, action.record]
			};

		default:
			return state;
	};
};

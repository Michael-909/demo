import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import bikeReducer from './reducers/bike';

const rootReducer = combineReducers({
	bike: bikeReducer
});

export default store = createStore(rootReducer, applyMiddleware(ReduxThunk));

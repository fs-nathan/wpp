import {
	DELETE_GROUP_TASK,
	DELETE_GROUP_TASK_SUCCESS,
	DELETE_GROUP_TASK_FAIL,
} from '../../constants/actions/groupTask/deleteGroupTask';

export const initialState = {
	data: null,
	error: null,
	loading: false,
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case DELETE_GROUP_TASK:
			return {
				...state,
				error: null,
				loading: true,
			};
		case DELETE_GROUP_TASK_SUCCESS: 
			return {
				...state, 
				error: null,
				loading: false,
			};
		case DELETE_GROUP_TASK_FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
			};
		default:
			return state;
	}
}

export default reducer;
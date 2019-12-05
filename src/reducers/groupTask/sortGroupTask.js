import {
	SORT_GROUP_TASK,
	SORT_GROUP_TASK_SUCCESS,
	SORT_GROUP_TASK_FAIL,
} from '../../constants/actions/groupTask/sortGroupTask';

export const initialState = {
	data: null,
	error: null,
	loading: false,
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case SORT_GROUP_TASK:
			return {
				...state,
				error: null,
				loading: true,
			};
		case SORT_GROUP_TASK_SUCCESS: 
			return {
				...state, 
				error: null,
				loading: false,
			};
		case SORT_GROUP_TASK_FAIL:
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
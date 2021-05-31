import { IS_SORT_GROUP_TASK, SORT_GROUP_TASK, SORT_GROUP_TASK_FAIL, SORT_GROUP_TASK_SUCCESS } from '../../constants/actions/groupTask/sortGroupTask';

export const initialState = {
	data: null,
	error: null,
	loading: false,
	sortgroup: false
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
				...initialState,
				error: null,
				loading: false,
			};
		case SORT_GROUP_TASK_FAIL:
			return {
				...state,
				...initialState,
				error: action.error,
				loading: false,
			};
		case IS_SORT_GROUP_TASK:
			return {
				...state,
				...initialState,
				sortgroup: action.options
			}	
		default:
			return state;
	}
}

export default reducer;
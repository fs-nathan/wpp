import { CREATE_GROUP_TASK, CREATE_GROUP_TASK_FAIL, CREATE_GROUP_TASK_SUCCESS } from '../../constants/actions/groupTask/createGroupTask';

export const initialState = {
	data: {
		groupTask: null,
	},
	error: null,
	loading: false,
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_GROUP_TASK:
			return {
				...state,
				error: null,
				loading: true,
			};
		case CREATE_GROUP_TASK_SUCCESS:
			return {
				...state,
				...initialState,
				data: action.data,
				error: null,
				loading: false,
			};
		case CREATE_GROUP_TASK_FAIL:
			return {
				...state,
				...initialState,
				error: action.error,
				loading: false,
			};
		default:
			return state;
	}
}

export default reducer;
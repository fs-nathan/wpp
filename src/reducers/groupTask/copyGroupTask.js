import { COPY_GROUP_TASK, COPY_GROUP_TASK_FAIL, COPY_GROUP_TASK_SUCCESS } from '../../constants/actions/groupTask/copyGroupTask';

export const initialState = {
	data: {
		groupTasks: [],
	},
	error: null,
	loading: false,
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case COPY_GROUP_TASK:
			return {
				...state,
				error: null,
				loading: true,
			};
		case COPY_GROUP_TASK_SUCCESS:
			return {
				...state,
				...initialState,
				data: action.data,
				error: null,
				loading: false,
			};
		case COPY_GROUP_TASK_FAIL:
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
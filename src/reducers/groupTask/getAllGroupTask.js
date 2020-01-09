import {
	GET_ALL_GROUP_TASK,
	GET_ALL_GROUP_TASK_SUCCESS,
	GET_ALL_GROUP_TASK_FAIL,
} from '../../constants/actions/groupTask/getAllGroupTask';

export const initialState = {
	data: {
		groupTasks: [],  
	},
	error: null,
	loading: false,
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_GROUP_TASK:
			return {
				...state,
				error: null,
				loading: action.quite ? false : true,
			};
		case GET_ALL_GROUP_TASK_SUCCESS: 
			return {
				...state, 
				data: action.data,
				error: null,
				loading: false,
			};
		case GET_ALL_GROUP_TASK_FAIL:
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
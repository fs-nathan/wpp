import { GET_ALL_GROUP_TASK, GET_ALL_GROUP_TASK_FAIL, GET_ALL_GROUP_TASK_RESET, GET_ALL_GROUP_TASK_SUCCESS } from '../../constants/actions/groupTask/getAllGroupTask';

export const initialState = {
	data: {
		groupTasks: [],
	},
	error: null,
	loading: false,
	firstTime: true,
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
				firstTime: false,
			};
		case GET_ALL_GROUP_TASK_FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
				firstTime: false,
			};
		case GET_ALL_GROUP_TASK_RESET:
			return initialState;
		/*
		case COPY_GROUP_TASK_SUCCESS: {
			if (get(action.data, 'groupTasks', []).length === 0) {
				return {
					...state,
				}
			} else {
				const newGroupTasks = [
					...get(state.data, 'groupTasks', []),
					...map(
						get(action.data, 'groupTasks', []),
						groupTask => ({
							id: get(groupTask, 'id'),
							name: get(groupTask, 'name'),
						}),
					),
				];
				return {
					...state,
					data: {
						...state.data,
						groupTasks: newGroupTasks,
					},
				}
			}
		}
		case CREATE_GROUP_TASK_SUCCESS: {
			const newGroupTasks = [
				...get(state.data, 'groupTasks', []),
				{
					...get(action.data, 'groupTask'),
				},
			];
			return {
				...state,
				data: {
					...state.data,
					groupTasks: newGroupTasks,
				},
			}
		}
		case UPDATE_GROUP_TASK_SUCCESS: {
			let newGroupTasks = [...get(state.data, 'groupTasks', [])];
			let updateIndex = findIndex(newGroupTasks, { id: get(action.options, 'groupTaskId') });
			if (updateIndex > -1) {
				newGroupTasks[updateIndex] = {
					...newGroupTasks[updateIndex],
					...get(action.data, 'groupTask'),
				}
			}
			return {
				...state,
				data: {
					...state.data,
					groupTasks: newGroupTasks,
				},
			}
		}
		case DELETE_GROUP_TASK_SUCCESS: {
			let newGroupTasks = [...get(state.data, 'groupTasks', [])];
			remove(newGroupTasks, { id: get(action.options, 'groupTaskId') });
			return {
				...state,
				data: {
					...state.data,
					groupTasks: newGroupTasks,
				},
			}
		}
		*/
		default: return state;
	}
}

export default reducer;
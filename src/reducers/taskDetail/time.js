import * as types from '../../constants/actions/taskDetail/taskDetailConst';

const initialState = {
    listTime: null,
    trackTimeCompleted: null,
    isFetching: false,
    dataFetched: false,
    error: false,
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_TIME_DURATION_SUCCESS:
            const { payload } = action;
            // console.log('payload', payload)
            if (payload.data_chat) {
                const { user_create_name, user_create_avatar, time_create, time_changes } = payload.data_chat
                const { start, end } = time_changes
                const newTrack = {
                    user_create_name, user_create_avatar,
                    time_create,
                    old_start: start ? start.old : undefined,
                    new_start: start ? start.new : undefined,
                    old_end: end ? end.old : undefined,
                    new_end: end ? end.new : undefined,
                }
                if (state.listTime) {
                    state.listTime.trackings.unshift(newTrack)
                }
                // console.log('newTrack', newTrack)
            }
            // console.log(' state.listTime.trackings', state.listTime.trackings)
            return {
                ...state,
                isFetching: false,
                error: false,
                listTime: state.listTime
            }
        case types.UPDATE_TIME_DURATION_REQUEST:
        case types.GET_TRACKING_TIME_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_TRACKING_TIME_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                listTime: action.payload
            }
        case types.UPDATE_TIME_DURATION_FAIL:
        case types.GET_TRACKING_TIME_FAIL:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true
            }
        case types.GET_TRACKING_TIME_COMPLETE_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.GET_TRACKING_TIME_COMPLETE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                trackTimeCompleted: action.payload
            }
        case types.GET_TRACKING_TIME_COMPLETE_FAIl:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true
            }

        default:
            return state;
    }
}
import * as types from '../../constants/actions/taskDetail/taskDetailConst'

const initialState={
    listTime:null,
    isFetching:false,
    dataFetched:false,
    error:false,
}
export default function reducer(state=initialState,action){
    
    
    switch (action.type) {
        case types.GET_TRACKING_TIME_REQUEST:
            return{
                ...state,
                isFetching:true
            }
        case types.GET_TRACKING_TIME_SUCCESS:
        return{
              ...state,
              isFetching:false,
              dataFetched:true,
              listTime:action.payload
        }
        case types.GET_TRACKING_TIME_FAIl:
            return{
                ...state,
                isFetching:false,
                dataFetched:false,
                error:true
            }
    
        default:
              return state;
    }
}
const initialState = {
    activeTaskId: "5da1821ad219830d90402fd8",
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "CHOOSE_TASK":
            return { ...state, activeTaskId: action.payload }
        default:
            return state
    }
}
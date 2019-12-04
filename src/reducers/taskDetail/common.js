const initialState = {
    activeTaskId: "5da1821ad219830d90402fd8",
    activeProjectId: "5de5c4b9f9e332da9ebd6b3c",
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "CHOOSE_TASK":
            return { ...state, activeTaskId: action.payload }
        case "CHOOSE_PROJECT":
            return { ...state, activeProjectId: action.payload}
        default:
            return state
    }
}
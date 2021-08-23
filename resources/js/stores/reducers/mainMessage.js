import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    open: false,
    severity: "error",
    message: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.mainMessage.OPEN:
            return {
                ...state,
                open: action.open,
            }
        case actionTypes.mainMessage.SEVERITY:
            return {
                ...state,
                severity: action.severity,
            }
        case actionTypes.mainMessage.MESSAGE:
            return {
                ...state,
                message: action.message,
            }
        default:
            return state;
    }
};

export default reducer;

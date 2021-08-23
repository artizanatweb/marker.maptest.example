import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    show: false,
    height: null,
    width: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.application.SHOW:
            return {
                ...state,
                show: action.show,
            }
        case actionTypes.application.HEIGHT:
            return {
                ...state,
                height: action.height,
            }
        case actionTypes.application.WIDTH:
            return {
                ...state,
                width: action.width,
            }
        default:
            return state;
    }
}

export default reducer;

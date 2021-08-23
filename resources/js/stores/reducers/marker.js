import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    object: null,
    step: 1,
    loading: false,
    formErrors: null,
    checkErrors: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.marker.SET_OBJECT:
            return {
                ...state,
                object: action.object,
            }
        case actionTypes.marker.LOADING:
            return {
                ...state,
                loading: action.loading,
            }
        case actionTypes.marker.SET_STEP:
            return {
                ...state,
                step: action.step,
                checkErrors: false,
            }
        case actionTypes.marker.CHECK_ERRORS:
            return {
                ...state,
                checkErrors: action.check,
            }
        case actionTypes.marker.SET_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.errorsObject,
            }
        default:
            return state;
    }
};

export default reducer;

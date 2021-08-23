import * as actionTypes from "./../actions/actionTypes";
import MapObject from "../../utils/MapObject";

const initialState = {
    object: null,
    form: new MapObject(),
    loading: false,
    formErrors: null,
    checkErrors: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.map.SET_FIELD:
            let form = state.form;
            form[action.field] = action.value;

            return {
                ...state,
                form: {
                    ...form,
                },
                checkErrors: false,
            }
        case actionTypes.map.LOADING:
            return {
                ...state,
                loading: action.loading,
            }
        case actionTypes.map.CHECK_ERRORS:
            return {
                ...state,
                checkErrors: action.check,
            }
        case actionTypes.map.SET_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.errorsObject,
            }
        case actionTypes.map.SET_OBJECT:
            return {
                ...state,
                object: action.object,
                form: action.object,
            }
        default:
            return state;
    }
};

export default reducer;

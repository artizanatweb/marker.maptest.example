import * as actionTypes from "./actionTypes";

export const changeMapFieldValue = (field, value) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.map.CHANGE_FIELD,
            field: field,
            value: value,
            formErrors: state.map.formErrors,
        });
    }
};

export const setMapFieldValue = (field, value) => {
    return {
        type: actionTypes.map.SET_FIELD,
        field: field,
        value: value,
    }
};

export const setMapFormErrors = (errorsObject = null) => {
    return {
        type: actionTypes.map.SET_FORM_ERRORS,
        errorsObject: errorsObject,
    }
};

export const setMapLoading = (loading = false) => {
    return {
        type: actionTypes.map.LOADING,
        loading: loading,
    }
}

export const saveMapSettings = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.map.SAVE,
            form: state.map.form,
        });
    }
};

export const checkMapErrors = (check = false) => {
    return {
        type: actionTypes.map.CHECK_ERRORS,
        check: check,
    }
};

export const setMapObject = (mapObject) => {
    return {
        type: actionTypes.map.SET_OBJECT,
        object: mapObject,
    }
};

export const requestMapObject = () => {
    return {
        type: actionTypes.map.REQUEST,
    }
};

import * as actionTypes from "./actionTypes";

export const setMarkerObject = (markerObject) => {
    return {
        type: actionTypes.marker.SET_OBJECT,
        object: markerObject,
    }
};

export const setMarkerLoading = (loading = false) => {
    return {
        type: actionTypes.marker.LOADING,
        loading: loading,
    }
};

export const changeMarkerStep = (step = 1) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.marker.CHANGE_STEP,
            step: step,
            formErrors: state.marker.formErrors,
        });
    }
};

export const setMarkerStep = (step = 1) => {
    return {
        type: actionTypes.marker.SET_STEP,
        step: step,
    }
};

export const requestMarkerUpdate = (direction) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.marker.REQUEST_UPDATE,
            mapId: state.map.object.id,
            markerId: state.marker.object.id,
            step: state.marker.step,
            direction: direction,
        });
    }
};

export const checkMarkerErrors = (check = false) => {
    return {
        type: actionTypes.marker.CHECK_ERRORS,
        check: check,
    }
};

export const setMarkerFormErrors = (errorsObject = null) => {
    return {
        type: actionTypes.marker.SET_FORM_ERRORS,
        errorsObject: errorsObject,
    }
};

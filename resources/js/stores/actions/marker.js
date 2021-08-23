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
    return {
        type: actionTypes.marker.CHANGE_STEP,
        step: step,
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

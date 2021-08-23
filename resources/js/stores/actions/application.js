import * as actionTypes from "./actionTypes";

export const showApplication = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.application.SHOW,
            show: true,
        });
    }
};

export const hideApplication = () => {
    return {
        type: actionTypes.application.SHOW,
        show: false,
    }
};

export const setApplicationHeight = (height = 100) => {
    return {
        type: actionTypes.application.HEIGHT,
        height: height,
    }
};

export const setApplicationWidth = (width = 100) => {
    return {
        type: actionTypes.application.WIDTH,
        width: width,
    }
};

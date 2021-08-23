import { put, delay, call } from "redux-saga/effects";
import * as storeActions from "./../actions";

export function* hideDummyLoader(action) {
    if (!document.getElementById('loader')) {
        return;
    }

    let loaderElement = document.getElementById('loader');

    if (!action.show) {
        loaderElement.classList.remove('hide');
        loaderElement.style.display = 'flex';
        return loaderElement.classList.add('show');
    }

    loaderElement.classList.remove('show');
    // inject hide into class attribute
    loaderElement.classList.add('hide');
    setTimeout(() => {
        loaderElement.style.display = 'none';
    }, 500);

    yield call(setApplicationDimensions);
}

export function* setApplicationDimensions() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    yield put(storeActions.setApplicationWidth(width));
    yield put(storeActions.setApplicationHeight(height));
}

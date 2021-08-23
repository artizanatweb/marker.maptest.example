import { takeEvery, all, call } from "redux-saga/effects";
import * as actionTypes from "./../actions/actionTypes";
import { hideDummyLoader } from "./application";
import {
    changeMapFieldValueSaga, saveMapSettingsSaga, requestMapSaga
} from "./map";
import {
    changeMarkerStepSaga, updateMarkerPosition
} from "./marker";

export function* watchApplication() {
    yield takeEvery(actionTypes.application.SHOW, hideDummyLoader);
}

export function* watchMap() {
    yield takeEvery(actionTypes.map.REQUEST, requestMapSaga);
    yield takeEvery(actionTypes.map.CHANGE_FIELD, changeMapFieldValueSaga);
    yield takeEvery(actionTypes.map.SAVE, saveMapSettingsSaga);
}

export function* watchMarker() {
    yield takeEvery(actionTypes.marker.CHANGE_STEP, changeMarkerStepSaga);
    yield takeEvery(actionTypes.marker.REQUEST_UPDATE, updateMarkerPosition);
}

export function* rootSaga() {
    yield all([
        call(watchApplication),
        call(watchMap),
        call(watchMarker),
    ]);
}

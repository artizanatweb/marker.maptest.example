import { put, call, delay } from "redux-saga/effects";
import axios from "axios";
import * as storeActions from "./../actions";
import * as paths from "./../../utils/paths";
import MarkerObject from "../../utils/MarkerObject";

export function* changeMarkerStepSaga(action) {
    let step = action.step;

    if (!(step > 0)) {
        step = 0;
    }

    if (step >= 1) {
        let stepStr = step.toString();
        if (stepStr.length > 1 && '0' === stepStr[0]) {
            step = step.replace(/^0+/, '');
        }
    }

    if (200 < step) {
        step = 200;
    }

    yield put(storeActions.setMarkerStep(step));
}

function createFormData(action) {
    const itemForm = new FormData();
    itemForm.append('step', action.step);
    itemForm.append('direction', action.direction);
    itemForm.append('_method', "put");

    return itemForm;
}

export function* updateMarkerPosition(action) {
    yield put(storeActions.setMarkerLoading(true));

    let apiPath = paths.marker.update(action.mapId, action.markerId);

    const formData = createFormData(action);

    let responseObject = null;
    let isError = false;

    yield axios.post(apiPath, formData)
        .then((response) => {
            responseObject = response;
        })
        .catch((error) => {
            responseObject = error.response;
            isError = true;
        });

    const responseMarker = responseObject?.data?.data;
    if (isError || !responseObject?.data?.success || !responseMarker) {
        yield put(storeActions.setMarkerLoading(false));
        return yield put(storeActions.setMainMessage('error', "Error encountered!"))
    }


    const marker = new MarkerObject();
    marker.fill(responseMarker);

    yield delay(100);
    yield put(storeActions.setMarkerObject(marker));
    yield put(storeActions.setMarkerLoading(false));
}

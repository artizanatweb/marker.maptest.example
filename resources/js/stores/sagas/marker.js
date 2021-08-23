import { put, call, delay } from "redux-saga/effects";
import axios from "axios";
import * as storeActions from "./../actions";
import * as paths from "./../../utils/paths";
import MarkerObject from "../../utils/MarkerObject";
import {createFormErrorsObject} from "../../utils/utils";

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

    if (action.formErrors) {
        let errors = { ...action.formErrors };

        if (errors.hasOwnProperty("step")) {
            delete errors["step"];
        }
        yield put(storeActions.setMarkerFormErrors(errors));
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
        let serverMessage = responseObject?.data?.message ?? "Error encountered!";
        yield put(storeActions.setMarkerLoading(false));

        if (responseObject.status !== 406) {
            const errorsObject = createFormErrorsObject(responseObject.data);
            yield put(storeActions.setMarkerFormErrors(errorsObject));
            yield put(storeActions.checkMarkerErrors(true));
        }

        yield put(storeActions.setMainMessage('error', serverMessage))
        return;
    }


    const marker = new MarkerObject();
    marker.fill(responseMarker);

    yield put(storeActions.setMarkerObject(marker));
    yield delay(500);
    yield put(storeActions.setMarkerLoading(false));
}

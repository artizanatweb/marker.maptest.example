import { put, call, delay } from "redux-saga/effects";
import axios from "axios";
import * as storeActions from "./../actions";
import * as paths from "./../../utils/paths";
import { createFormErrorsObject } from "./../../utils/utils";
import MapObject from "../../utils/MapObject";
import MarkerObject from "../../utils/MarkerObject";

export function* changeMapFieldValueSaga(action) {
    let field = action.field;
    let value = action.value;

    if (['width','height'].includes(field)) {
        if (!(value > 0)) {
            value = 0;
        }

        if (value >= 1) {
            let valueStr = value.toString();
            if (valueStr.length > 1 && '0' === valueStr[0]) {
                value = value.replace(/^0+/, '');
            }
        }

        if (value > 999) {
            value = 999;
        }
    }

    if (action.formErrors) {
        let errors = { ...action.formErrors };

        if (errors.hasOwnProperty(field)) {
            delete errors[field];
        }
        yield put(storeActions.setMapFormErrors(errors));
    }

    yield put(storeActions.setMapFieldValue(field, value));
}

function createFormData(action, actionType = "create") {
    const itemForm = new FormData();
    itemForm.append('id', action.form.id);
    itemForm.append('width', action.form.width);
    itemForm.append('height', action.form.height);

    if ("update" === actionType) {
        itemForm.append('_method', "put");
    }

    return itemForm;
}

export function* saveMapSettingsSaga(action) {
    yield put(storeActions.setMapLoading(true));
    yield put(storeActions.setMarkerObject(null));
    yield put(storeActions.setMarkerLoading(true));

    let actionType = "create";
    let apiPath = paths.map.create;
    if (action.form?.id > 0) {
        actionType = "update";
        apiPath = paths.map.update(action.form.id);
    }

    const formData = createFormData(action, actionType);

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

    yield call(responseActionReceived, isError, responseObject, actionType);
}

function* responseActionReceived(isError, responseObject, actionType = "create") {
    let serverMessage = responseObject?.data?.message ?? "Server response error!";

    if (isError) {
        yield put(storeActions.setMainMessage('error', serverMessage));

        if (responseObject.status !== 406) {
            const errorsObject = createFormErrorsObject(responseObject.data);
            yield put(storeActions.setMapFormErrors(errorsObject));
            yield put(storeActions.checkMapErrors(true));
        }

        yield put(storeActions.setMarkerLoading(false));
        yield put(storeActions.setMapLoading(false));
        return;
    }

    if (!responseObject?.data?.success) {
        yield put(storeActions.setMapLoading(false));
        yield put(storeActions.setMarkerLoading(false));
        return yield put(storeActions.setMainMessage('error', serverMessage));
    }

    yield put(storeActions.setMainMessage('success', serverMessage));

    const responseMap = responseObject?.data?.data;
    if (!responseMap) {
        yield put(storeActions.setMarkerLoading(false));
        yield put(storeActions.setMapLoading(false));
        return yield put(storeActions.setMainMessage('error', "Map response is missing!"));
    }

    yield call(setMapWithMarker, responseMap);

    if ("create" === actionType) {
        // store id in web storage
        localStorage.setItem("map_id", responseMap.id);
    }

    yield delay(1000);
    yield put(storeActions.setMapLoading(false));
    yield put(storeActions.setMarkerLoading(false));
}

function* setMapWithMarker(map) {
    const mapObject = new MapObject();
    mapObject.fill(map);
    yield put(storeActions.setMapObject(mapObject));

    // set marker
    const markerObject = new MarkerObject();
    markerObject.fill(map?.marker);
    yield put(storeActions.setMarkerObject(markerObject));
}

export function* requestMapSaga(action) {
    let mapId = localStorage.getItem("map_id") ?? 0;
    if (!(mapId > 0)) {
        return yield put(storeActions.showApplication());
    }

    let responseObject = null;
    let isError = false;

    yield axios.get(paths.map.show(mapId))
        .then((response) => {
            responseObject = response;
        })
        .catch((error) => {
            responseObject = error.response;
            isError = true;
        });

    const responseMap = responseObject?.data?.data;
    if (isError || !responseObject?.data?.success || !responseMap) {
        localStorage.removeItem("map_id");
        return yield put(storeActions.showApplication());
    }

    yield call(setMapWithMarker, responseMap);

    yield put(storeActions.showApplication());
}

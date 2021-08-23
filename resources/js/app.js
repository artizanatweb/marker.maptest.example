require('./bootstrap');

import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import "./../sass/app.scss";
import App from "./containers/App";
import applicationReducer from "./stores/reducers/application";
import mainMessageReducer from "./stores/reducers/mainMessage";
import mapReducer from "./stores/reducers/map";
import markerReducer from "./stores/reducers/marker";
import { rootSaga } from "./stores/sagas";

const rootReducer = combineReducers({
    application: applicationReducer,
    mainMessage: mainMessageReducer,
    map: mapReducer,
    marker: markerReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(rootSaga);

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

if (document.getElementById("mainApp")) {
    ReactDOM.render(app, document.getElementById("mainApp"));
}

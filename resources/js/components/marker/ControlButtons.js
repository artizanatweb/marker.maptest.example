import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    IconButton,
} from "@material-ui/core";
import * as storeActions from "./../../stores/actions";
import clsx from "clsx";
// icons
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import GamesIcon from '@material-ui/icons/Games';

const ControlButtons = (props) => {
    const dispatch = useDispatch();
    const marker = useSelector( state => state.marker );

    const directionHandler = (direction) => {
        if (marker.loading) {
            return;
        }

        dispatch(storeActions.requestMarkerUpdate(direction));
    };

    return (
        <div className={"markerControlButtonsSupport"}>
            <div className={"controlRow"}>
                <Button
                    className={"directionButton"}
                    variant={"contained"}
                    color={"secondary"}
                    size={"large"}
                    onClick={() => { directionHandler(1) }}
                    startIcon={<KeyboardArrowUpIcon />}
                />
            </div>
            <div className={"controlRow middle"}>
                <Button
                    className={"directionButton"}
                    variant={"contained"}
                    color={"secondary"}
                    size={"large"}
                    onClick={() => { directionHandler(4) }}
                    startIcon={<KeyboardArrowLeftIcon />}
                />
                <div className={"empty"}>
                    <GamesIcon />
                </div>
                <Button
                    className={"directionButton"}
                    variant={"contained"}
                    color={"secondary"}
                    size={"large"}
                    onClick={() => { directionHandler(2) }}
                    startIcon={<KeyboardArrowRightIcon />}
                />
            </div>
            <div className={"controlRow"}>
                <Button
                    className={"directionButton"}
                    variant={"contained"}
                    color={"secondary"}
                    size={"large"}
                    onClick={() => { directionHandler(3) }}
                    startIcon={<KeyboardArrowDownIcon />}
                />
            </div>
        </div>
    );
};

export default ControlButtons;

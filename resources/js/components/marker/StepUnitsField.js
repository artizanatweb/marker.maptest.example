import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    FormControl,
    FormHelperText,
} from "@material-ui/core";
import * as storeActions from "./../../stores/actions";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    field: {
        width: '100%',
    },
}));

const StepUnitsField = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const marker = useSelector( state => state.marker );
    const fieldRef = useRef(null);

    const stepValueHandler = (event) => {
        let fieldValue = event.target.value;

        dispatch(storeActions.changeMarkerStep(fieldValue));
    };

    const stepProps = {
        step: 10,
        min: 0,
        max: 200,
    };

    const fieldState = {
        error: false,
        message: "step units for movement; min: 1, max: 200",
    }

    return (
        <div className={clsx("markerStepUnitsSupport", "mapForm")}>
            <FormControl className="formRow" error={fieldState.error}>
                    <TextField
                        inputRef={fieldRef}
                        className={classes.field}
                        label={"step units"}
                        value={marker.step}
                        onChange={stepValueHandler}
                        color={"primary"}
                        inputProps={stepProps}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        type="number"
                    />
                    <FormHelperText>{ fieldState.message }</FormHelperText>
                </FormControl>
        </div>
    );
};

export default StepUnitsField;

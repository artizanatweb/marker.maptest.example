import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import clsx from "clsx";
import StepUnitsField from "./StepUnitsField";
import ControlButtons from "./ControlButtons";


const useStyles = makeStyles((theme) => ({
    support: {
        width: '100%',
        padding: theme.spacing(2),
    }
}));

const MarkerSettings = (props) => {
    const classes = useStyles();
    const marker = useSelector( state => state.marker );

    if (!marker.object) {
        return null;
    }

    return (
        <div className={"mapFormSupport"}>
            <Paper elevation={3} className={clsx("mapFormPlace", classes.support, "markerFormPlace")}>
                <div className={"title"}>
                    <Typography component={"h1"}>marker controls:</Typography>
                </div>
                <div className={"body"}>
                    <StepUnitsField />
                    <ControlButtons />
                </div>
            </Paper>
        </div>
    );
};

export default MarkerSettings;

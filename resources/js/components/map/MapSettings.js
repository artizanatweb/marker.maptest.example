import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import clsx from "clsx";
import MapForm from "./MapForm";

const useStyles = makeStyles((theme) => ({
    support: {
        width: '100%',
        padding: theme.spacing(2),
    }
}));

const MapSettings = (props) => {
    const classes = useStyles();

    return (
        <div className={"mapFormSupport"}>
            <Paper elevation={3} className={clsx("mapFormPlace", classes.support)}>
                <div className={"title"}>
                    <Typography component={"h1"}>map settings:</Typography>
                </div>
                <div className={"body"}>
                    <MapForm />
                </div>
            </Paper>
        </div>
    );
};

export default MapSettings;

import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import phaserEntryPoint from "./../../containers/phaserEntryPoint";
import Phaser from 'phaser';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    text: {
        textAlign: "center",
    }
}));

const MapScreen = (props) => {
    const classes = useStyles();
    const map = useSelector( state => state.map );
    const marker = useSelector( state => state.marker );
    const mapGameRef = useRef(null);
    const [ mapGameApp, setMapGameApp ] = useState(null);
    const [ emitter, setEmitter ] = useState(null);

    useEffect(() => {
        setEmitter(new Phaser.Events.EventEmitter());
    }, []);

    useEffect(() => {
        if (!map.object) {
            return;
        }

        if (!marker.object) {
            return;
        }

        if (!mapGameRef) {
            return;
        }

        if (mapGameApp) {
            return;
        }

        setMapGameApp(phaserEntryPoint(mapGameRef.current, map.object, marker.object, emitter));
    }, [map.object, marker.object, mapGameRef, mapGameApp]);

    useEffect(() => {
        if (!map.object) {
            return;
        }

        emitter.emit("map", map.object);
    }, [map.object]);

    useEffect(() => {
        if (!marker.object) {
            return;
        }

        emitter.emit("marker", marker.object);
    }, [marker.object]);

    useEffect(() => {
        if (!emitter) {
            return;
        }

        emitter.emit("loading", marker.loading);
    }, [marker.loading]);

    if (!map.object) {
        return null;
    }

    return (
        <div className={clsx(classes.root,"mapSupport")}>
            <div className={"mapGame"} ref={mapGameRef} />
        </div>
    );
};

export default MapScreen;

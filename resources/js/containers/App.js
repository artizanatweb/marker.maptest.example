import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CssBaseline, Container } from "@material-ui/core";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import BlueGrayColor from "@material-ui/core/colors/blueGrey";
import DeepOrangeColor from "@material-ui/core/colors/deepOrange";
import * as storeActions from "./../stores/actions";
import MapSettings from "./../components/map/MapSettings";
import MainMessage from "./../components/MainMessage";
import MapScreen from "./../components/map/MapScreen";
import MarkerSettings from "./../components/marker/MarkerSettings";

function App(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(storeActions.requestMapObject());
        }, 200);
    }, []);

    const theme = createTheme({
        palette: {
            type: "light",
            primary: {
                light: '#898989',
                main: '#000000',
                dark: '#343434',
            },
            secondary: DeepOrangeColor,
            background: {
                default: "#f5f5f5",
            }
        },
    });

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <div className={"mainApplication"}>
                <Container>
                    <MapSettings />
                    <MapScreen />
                    <MarkerSettings />
                </Container>
            </div>
            <MainMessage />
        </MuiThemeProvider>
    );
}

export default App;

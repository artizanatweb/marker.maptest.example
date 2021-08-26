import React from "react";
import { useSelector } from "react-redux";

const MarkerPosition = (props) => {
    const marker = useSelector(state => state.marker);

    if (!marker.object) {
        return null;
    }

    return (
        <div className={"markerPositionSupport"}>
            <div className={"markerPosition"}>
                <h4>Marker current position</h4>
                <div className={"position"}>
                    <p>x: <b>{marker.object?.x}</b></p>
                    <p>y: <b>{marker.object?.y}</b></p>
                </div>
            </div>
        </div>
    );
};

export default MarkerPosition;

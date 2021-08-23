import MapGame from "./../game/MapGame";

export default (container, mapObject, markerObject, emitter) => {
    const mapGameApp = new MapGame(container, mapObject, markerObject, emitter);
    return mapGameApp;
}

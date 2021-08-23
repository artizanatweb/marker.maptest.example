class MapObject {
    id = 0;
    width = 0;
    height = 0;

    fill(data) {
        if (data?.id > 0) {
            this.id = data.id;
        }

        if (data?.width > 0) {
            this.width = data.width;
        }

        if (data?.height > 0) {
            this.height = data.height;
        }
    }
}

export default MapObject;

class MarkerObject {
    id = 0;
    map_id = 0;
    x = 0;
    y = 0;

    fill(data) {
        if (data?.id > 0) {
            this.id = data.id;
        }

        if (data?.map_id > 0) {
            this.map_id = data.map_id;
        }

        if (data?.x > 0) {
            this.x = data.x;
        }

        if (data?.y > 0) {
            this.y = data.y;
        }
    }
}

export default MarkerObject;

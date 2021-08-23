export const map = {
    create: '/api/map',
    update: (id) => {
        return `/api/map/${id}`;
    },
    show: (id) => {
        return `/api/map/${id}`;
    }
};

export const marker = {
    update: (mapId, markerId) => {
        return `/api/map/${mapId}/marker/${markerId}`;
    },
};

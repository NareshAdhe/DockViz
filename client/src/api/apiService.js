import api from '../api/apiClient.js'

export const apiService = {
    getContainers: async () => {
        const response = await api.get("/containers");
        return response.data;
    },
    getImages: async () => {
        const response = await api.get("/images");
        return response.data;
    },
    getNetworks: async () => {
        const response = await api.get("/networks");
        return response.data;
    },
    getVolumes: async () => {
        const response = await api.get("/volumes");
        return response.data;
    },

    // container management
    stopContainer: async (id) => {
        const response = await api.post(`/containers/stop/${id}`);
        return response.data;
    },
    startContainer: async (id) => {
        const response = await api.post(`/containers/start/${id}`);
        return response.data;
    }
}
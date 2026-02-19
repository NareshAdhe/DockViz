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
    }
}
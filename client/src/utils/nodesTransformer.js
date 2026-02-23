import api from "../api/apiClient";
import { apiService } from "../api/apiService";

const nodesTransformer = (containers, images, networks) => {
  const containerNodes = containers.map((container, index) => {
    return {
      id: container.fullId,
      type: "container",
      position: { x: index * 250, y: 100 },
      deletable: false,
      connectable: false,
      data: {
        ...container,
        onStopContainer: async (id) => {
          return await apiService.stopContainer(id);
        },
        onStartContainer: async (id) => {
          return await apiService.startContainer(id);
        }
      },
    };
  });

  const imageNodes = images.map((image, index) => {
    return {
      id: image.fullId,
      type: "image",
      position: { x: index * 250, y: 100 },
      data: image,
      deletable: false,
      connectable: false,
    };
  });

  const networkNodes = networks.map((network, index) => {
    return {
      id: network.name,
      type: "network",
      position: { x: index * 250, y: 100 },
      data: network,
      deletable: false,
      connectable: false,
    };
  });

  return [...containerNodes, ...imageNodes, ...networkNodes];
};

export default nodesTransformer;

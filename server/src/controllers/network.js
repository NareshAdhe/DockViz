import docker from "../config/docker.js";

const formatNetworks = (networks, containers) => {
  return networks.map((net) => {
    const connectedContainers = containers.filter((container) => {
      const containerNetworks = container.NetworkSettings?.Networks || {};
      return Object.keys(containerNetworks).includes(net.Name);
    });

    const totalCount = connectedContainers.length;

    const activeCount = connectedContainers.filter(
      (c) => c.State === "running",
    ).length;

    return {
      id: net.Id.substring(0, 12),
      fullNetworkId: net.Id,
      name: net.Name,
      driver: net.Driver,
      activeContainersCount: activeCount,
      totalContainersCount: totalCount,
    };
  });
};

export const getNetworks = async (req, res) => {
  try {
    const networks = await docker.listNetworks();
    const containers = await docker.listContainers({ all: true });

    const formattedNetworks = formatNetworks(networks, containers);

    return res.status(200).json(formattedNetworks);
  } catch (error) {
    console.error(`[Network Error]: ${error}`);
    return res
      .status(500)
      .json("Failed to fetch containers from Docker daemon");
  }
};

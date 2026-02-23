import docker from "../config/docker.js";

const formatNetworks = (networks) => {
  const formattedNetworks = networks.map(([name, details]) => name);
  return formattedNetworks;
};

const formatVolumes = (volumes) => {
  const formattedVolumes = (volumes || []).map((mount) => ({
    type: mount.Type,
    source: mount.Source,
    destination: mount.Destination,
  }));
  return formattedVolumes;
};

const formatPorts = (ports) => {
  const formattedPorts = (ports || []).map((p) => ({
    private: p.PrivatePort,
    public: p.PublicPort,
    type: p.Type,
  }));
  return formattedPorts;
};

const formatContainers = (containers) => {
  const formattedContainers = containers.map((container) => {
    return {
      id: container.Id.substring(0, 12),
      fullId: container.Id,
      name: container.Names[0].replace(/^\//, ""),

      imageName: container.Image,
      imageId: container.ImageID.split(":")[1]?.substring(0, 12),
      fullImageId: container.ImageID,

      state: container.State,
      status: container.Status,
      created: new Date(container.Created * 1000).toISOString(),

      ports: formatPorts(container.Ports),

      networks: formatNetworks(
        Object.entries(container.NetworkSettings?.Networks || []),
      ),

      volumes: formatVolumes(container.Mounts),

      command: container.Command,
    };
  });
  return formattedContainers;
};

export const getContainers = async (req, res) => {
  try {
    const containers = await docker.listContainers({ all: true });
    const formattedContainers = formatContainers(containers);

    return res.status(200).json(formattedContainers);
  } catch (error) {
    console.error(`[Container Error]: ${error}`);
    return res
      .status(500)
      .json("Failed to fetch containers from Docker daemon");
  }
};

export const stopContainer = async (req, res) => {
  try {
    const { id } = req.params;
    const container = docker.getContainer(id);
    await container.kill();
    return res.status(200).json("Container Stopped Successfully");
  } catch (error) {
    console.error(`[Container Error]: ${error}`);
    return res.status(500).json("Error Stopping Container");
  }
};

export const startContainer = async (req, res) => {
  try {
    const { id } = req.params;
    const container = docker.getContainer(id);
    await container.start();
    return res.status(200).json("Container Started Successfully");
  } catch (error) {
    console.error(`[Container Error]: ${error}`);
    return res.status(500).json("Error Starting Container");
  }
};

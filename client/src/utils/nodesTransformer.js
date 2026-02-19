const nodesTransformer = (containers, images, networks) => {
  const containerNodes = containers.map((container, index) => {
    return {
      id: `cont-${container.id}`,
      type: "container",
      position: { x: index * 250, y: 100 },
      data: container,
    };
  });

  const imageNodes = images.map((image, index) => {
    return {
      id: `img-${image.id}`,
      type: "image",
      position: { x: index * 250, y: 100 },
      data: image,
    };
  });

  const networkNodes = networks.map((network, index) => {
    return {
      id: `net-${network.id}`,
      type: "network",
      position: { x: index * 250, y: 100 },
      data: network,
    };
  });

  return [...containerNodes, ...imageNodes, ...networkNodes];
};

export default nodesTransformer;
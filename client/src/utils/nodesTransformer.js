const nodesTransformer = (containers, images, networks) => {
  const containerNodes = containers.map((container, index) => {
    return {
      id: `cont-${container.id}`,
      type: "container",
      position: { x: index * 250, y: 100 },
      data: container,
      deletable: false,
      connectable: false
    };
  });

  const imageNodes = images.map((image, index) => {
    return {
      id: `img-${image.id}`,
      type: "image",
      position: { x: index * 250, y: 100 },
      data: image,
      deletable: false,
      connectable: false
    };
  });

  const networkNodes = networks.map((network, index) => {
    return {
      id: `net-${network.name}`,
      type: "network",
      position: { x: index * 250, y: 100 },
      data: network,
      deletable: false,
      connectable: false
    };
  });

  return [...containerNodes, ...imageNodes, ...networkNodes];
};

export default nodesTransformer;
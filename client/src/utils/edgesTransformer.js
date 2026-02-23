const edgesTransformer = (containers) => {
  const edges = [];

  containers.forEach((container) =>
    edges.push({
      id: `${container.fullImageId}--${container.fullId}`,
      source: container.fullImageId,
      target: container.fullId,
      deletable: false,
      animated: container.state === "running",
    }),
  );

  containers.forEach((container) => {
    (container.networks || []).forEach((networkName) => {
      edges.push({
        id: `${container.fullId}--${networkName}`,
        source: container.fullId,
        target: networkName,
        animated: container.state === "running",
        deletable: false
      });
    });
  });
  return edges;
};

export default edgesTransformer;

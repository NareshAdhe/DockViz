const edgesTransformer = (containers) => {
  const edges = [];

  containers.forEach((container) =>
    edges.push({
      id: `img-${container.imageId}--cont-${container.id}`,
      source: `img-${container.imageId}`,
      target: `cont-${container.id}`,
      deletable: false,
      animated: container.state === "running" ? true : false,
    }),
  );

  containers.forEach((container) => {
    (container.networks || []).forEach((networkName) => {
      edges.push({
        id: `cont-${container.id}--net-${networkName}`,
        source: `cont-${container.id}`,
        target: `net-${networkName}`,
        animated: container.state === "running" ? true : false,
        deletable: false
      });
    });
  });
  return edges;
};

export default edgesTransformer;

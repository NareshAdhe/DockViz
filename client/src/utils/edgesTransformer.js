const edgesTransformer = (containers) => {
  const edges = [];

  containers.forEach((container) =>
    edges.push({
      id: `img-${container.imageId}--cont-${container.id}`,
      source: `img-${container.imageId}`,
      target: `cont-${container.id}`,
    }),
  );

  containers.forEach((container) => {
    (container.networks || []).forEach((networkName) => {
      edges.push({
        id: `cont-${container.id}--net-${networkName}`,
        type:"straight",
        source: `cont-${container.id}`,
        target: `net-${networkName}`,
        animated: true
      });
    });
  });
  return edges;
};

export default edgesTransformer;

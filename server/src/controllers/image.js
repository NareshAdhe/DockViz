import docker from "../config/docker.js";

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const formatImages = (images) => {
  const formattedImages = images.map((image) => {
    const hasTags = image.RepoTags && image.RepoTags.length > 0;
    let name = '<none>';
    if (hasTags) {
       const firstTag = image.RepoTags[0];
       const lastColon = firstTag.lastIndexOf(':');
       name = lastColon === -1 ? firstTag : firstTag.substring(0, lastColon);
    }
    const tags = hasTags ? image.RepoTags.map((tag) =>{
      const lastColonIndex = tag.lastIndexOf(':');
      return tag.substring(lastColonIndex + 1);
    }) : [];

    return {
      name,
      tags,
      id: image.Id.split(":")[1]?.substring(0, 12) || "N/A",
      fullId: image.Id,
      containersCount: image.Containers,
      size: formatBytes(image.Size),
      created: new Date(image.Created * 1000).toISOString(),
    };
  });
  return formattedImages;
};

export const getImages = async (req, res) => {
  try {
    const images = await docker.listImages();
    console.log(images);
    const formattedImages = formatImages(images);

    return res.status(200).json(formattedImages);
  } catch (error) {
    console.error(`[Image Error]: ${error}`);
    return res.status(500).json("Failed to fetch containers from Docker daemon");
  }
};

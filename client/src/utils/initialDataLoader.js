import { apiService } from "../api/apiService";
import toast from "react-hot-toast";
import nodesTransformer from "./nodesTransformer";
import edgesTransformer from "./edgesTransformer";

export const loadInitialData = async () => {
  try {
    const [containers, images, networks] = await Promise.all([
      apiService.getContainers(),
      apiService.getImages(),
      apiService.getNetworks(),
    ]);
    console.log(containers, images, networks);
    const nodes = nodesTransformer(containers, images, networks);
    console.log(nodes);
    const edges = edgesTransformer(containers);

    return { nodes, edges };
  } catch (err) {
    if (err.response) {
      const backendMessage = err.response.data;
      toast.error(backendMessage || "Server error occurred");
    } else {
      toast.error(err.message || "Network Error");
    }
  }
};

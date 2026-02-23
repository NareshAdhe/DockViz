import { useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  useNodesInitialized,
  useReactFlow,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ContainerNode from "../components/nodes/ContainerNode";
import ImageNode from "../components/nodes/ImageNode";
import NetworkNode from "../components/nodes/NetworkNode";
import loadInitialData from "../utils/initialDataLoader";
import getLayoutedElements from "../utils/autoLayout";
import toast from "react-hot-toast";
import socket from "../utils/socket";

const nodeTypes = {
  container: ContainerNode,
  image: ImageNode,
  network: NetworkNode,
};

const defaultEdgeOptions = {
  style: {
    strokeWidth: 2,
    stroke: "#9ca3af",
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 10,
    height: 10,
    color: "#9ca3af",
  },
};

const ReactFlowPage = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onNodesChange = (changes) => {
    setNodes((prevNodes) => applyNodeChanges(changes, prevNodes));
  };

  const onEdgesChange = (changes) => {
    setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges));
  };

  const isNodeInitialized = useNodesInitialized();
  const { fitView, updateNodeData, getNode } = useReactFlow();

  useEffect(() => {
    const loadData = async () => {
      try {
        const { nodes, edges } = await loadInitialData();
        setNodes(nodes);
        setEdges(edges);
      } catch (error) {
        toast.error("Error loading initial data");
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    socket.on("container_state_change", ({ id, state }) => {
      const containerNode = getNode(id);
      const containerNetworks = containerNode.data.networks;

      containerNetworks.forEach((networkName) => {
        updateNodeData(networkName, (prevData) => {
          const newObj = {
            activeContainersCount:
              state === "running"
                ? prevData.data.activeContainersCount + 1
                : prevData.data.activeContainersCount - 1,
          };
          return newObj;
        });
      });

      updateNodeData(id, { state });

      setEdges((prevEdges) =>
        prevEdges.map((edge) => {
          if (edge.source === id || edge.target === id) {
            return {
              ...edge,
              animated: state === "running",
            };
          }
          return edge;
        }),
      );
    });
    return () => {
      socket.off("container_state_change");
    };
  }, [updateNodeData]);

  useEffect(() => {
    if (isNodeInitialized) {
      const { layoutedNodes, layoutedEdges } = getLayoutedElements({
        nodes,
        edges,
      });
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);

      fitView();
      setIsLoading(false);
    }
  }, [isNodeInitialized]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultEdgeOptions={defaultEdgeOptions}
        style={{ backgroundColor: "#000" }}
      >
        <Background color="black" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowPage;

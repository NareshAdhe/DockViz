import { useEffect, useState } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  useNodesInitialized,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import ContainerNode from "../components/nodes/ContainerNode";
import ImageNode from "../components/nodes/ImageNode";
import NetworkNode from "../components/nodes/NetworkNode";
import loadInitialData from "../utils/initialDataLoader";
import getLayoutedElements from "../utils/autoLayout";
import toast from "react-hot-toast";

const nodeTypes = {
  container: ContainerNode,
  image: ImageNode,
  network: NetworkNode,
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
  const { fitView } = useReactFlow();

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
    if (isNodeInitialized) {
      console.log(isNodeInitialized);
      const { layoutedNodes, layoutedEdges } = getLayoutedElements({
        nodes,
        edges,
      });
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);

      window.requestAnimationFrame(() => {
        fitView({ padding: 0.05, duration: 500 });
      });

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
        nodesDeletabl={false}
        style={{ backgroundColor: "#000" }}
      >
        <Background color="blue" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowPage;

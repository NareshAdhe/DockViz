import { useEffect, useState } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import ContainerNode from "../components/nodes/ContainerNode";
import ImageNode from "../components/nodes/ImageNode";
import NetworkNode from "../components/nodes/NetworkNode";
import { loadInitialData } from "../utils/initialDataLoader";
import toast from "react-hot-toast";

const nodeTypes = {
  container: ContainerNode,
  image: ImageNode,
  network: NetworkNode
};

const ReactFlowPage = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((prevNodes) => applyNodeChanges(changes, prevNodes)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges)),
    [],
  );

  const handleConnect = useCallback(
    (edge) => setEdges((prevEdges) => addEdge(edge, prevEdges)),
    [],
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const { nodes, edges } = await loadInitialData();
        console.log(edges);
        setNodes(nodes);
        setEdges(edges);
      } catch (error) {
        toast.error("Error loading initial data");
      }
    };
    loadData();
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        fitView
        style={{ backgroundColor: "#000" }}
      >
        <Background color="white" />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowPage;

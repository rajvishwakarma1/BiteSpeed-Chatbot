import React, { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type NodeChange,
  type EdgeChange,
  type Connection,
  addEdge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  useReactFlow,
  type IsValidConnection,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import type { ChatbotNode, ChatbotEdge, FlowBuilderProps } from '../types';
import TextNode from './nodes/TextNode';
import { createTextNode, createNodeFromType } from '../utils/nodeUtils';
import { isValidConnection, getOutgoingEdges, removeEdgesBySource } from '../utils/edgeUtils';
import './FlowBuilder.css';

// Initial canvas state uses a generic placeholder message for clarity
const initialNodes: ChatbotNode[] = [createTextNode('text message', { x: 250, y: 150 })];
const initialEdges: ChatbotEdge[] = [];

const nodeTypes = {
  textNode: TextNode,
};

const FlowBuilder: React.FC<FlowBuilderProps> = ({
  nodes,
  setNodes,
  edges,
  setEdges,
  selectedNodeId,
  onNodeSelect,
  onNodeUpdate,
  isLocked,
}) => {
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connectionAttempt, setConnectionAttempt] = useState<Connection | null>(null);
  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    if (nodes.length === 0) {
      setNodes(initialNodes);
    }
    if (edges && edges.length === 0 && setEdges) {
      setEdges(initialEdges);
    }
  }, [nodes, setNodes, edges, setEdges]);

  const onNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => {
      const updated = applyNodeChanges(changes, nds as any) as unknown as ChatbotNode[];
      const selectedId = updated.find((n) => n.selected)?.id ?? null;
      onNodeSelect(selectedId);
      return updated;
    });
  }, [onNodeSelect, setNodes]);

  const onEdgesChange: OnEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, [setEdges]);

  const onConnect: OnConnect = useCallback((connection: Connection) => {
    setEdges((eds) => {
      const filtered = removeEdgesBySource(eds, connection.source || '');
      return addEdge(connection, filtered);
    });
    setConnecting(false);
    setConnectionAttempt(null);
  }, [setEdges]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) return;
    const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
    const newNode = createNodeFromType(type, position);
    setNodes((nds) => [...nds, newNode]);
  }, [screenToFlowPosition, setNodes]);

  const handleNodeUpdate = (nodeId: string, newData: any) => {
    setNodes((nds) => nds.map((node) =>
      node.id === nodeId ? { ...node, data: newData } : node
    ));
    if (onNodeUpdate) {
      onNodeUpdate(nodeId, newData);
    }
  };

  const isValidConnectionFn: IsValidConnection = useCallback(
    (connectionOrEdge) => {
      const conn: Connection = {
        source: (connectionOrEdge as any).source,
        target: (connectionOrEdge as any).target,
        sourceHandle: (connectionOrEdge as any).sourceHandle ?? null,
        targetHandle: (connectionOrEdge as any).targetHandle ?? null,
      };
      return isValidConnection(conn, edges);
    },
    [edges]
  );

  // Allow cancelling a connection with ESC or pane interactions
  useEffect(() => {
    if (!connecting) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // trigger pointer/mouse up to signal end of connection without target
        window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
        window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        setConnecting(false);
        setConnectionAttempt(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [connecting]);

  return (
    <div className="flow-area">
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          selected: node.id === selectedNodeId,
          data: {
            ...(node.data as any),
            hasOutgoingEdge: getOutgoingEdges(edges, node.id).length > 0,
          },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={() => setConnecting(true)}
        onConnectEnd={() => {
          setConnecting(false);
          setConnectionAttempt(null);
        }}
        onPaneClick={() => {
          if (connecting) {
            window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
            setConnecting(false);
            setConnectionAttempt(null);
          }
        }}
        onPaneContextMenu={(e) => {
          e.preventDefault();
          if (connecting) {
            window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
            setConnecting(false);
            setConnectionAttempt(null);
          }
        }}
        fitView
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        isValidConnection={isValidConnectionFn}
  // When locked, prevent node dragging but keep selection and connections
  nodesDraggable={!isLocked}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilder;

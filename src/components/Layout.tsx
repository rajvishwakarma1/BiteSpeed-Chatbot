import React, { useState } from 'react';
import FlowBuilder from './FlowBuilder';
import Sidebar from './Sidebar';
import SaveButton from './SaveButton';
import type { ChatbotNode, ChatbotEdge, SidebarState } from '../types';
import './Layout.css';

const Layout: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodes, setNodes] = useState<ChatbotNode[]>([]);
  const [edges, setEdges] = useState<ChatbotEdge[]>([]);
  const [isLocked] = useState<boolean>(false);
  const [sidebarState, setSidebarState] = useState<SidebarState>({
    isOpen: true,
    activePanel: 'nodes',
  });

  const handleNodeSelect = (nodeId: string | null) => {
    setSelectedNodeId(nodeId);
    setSidebarState((prev) => ({
      ...prev,
      activePanel: nodeId ? 'settings' : 'nodes',
    }));
  };

  const handleNodeUpdate = (nodeId: string, newData: any) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, data: newData } : node
      )
    );
  };

  const handleBackToNodes = () => {
    setSelectedNodeId(null);
    setSidebarState((prev) => ({ ...prev, activePanel: 'nodes' }));
  };

  const handleSave = () => {
    // Save logic handled in SaveButton
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setEdges((prev) => prev.filter((e) => e.source !== nodeId && e.target !== nodeId));
    setSelectedNodeId(null);
    setSidebarState((prev) => ({ ...prev, activePanel: 'nodes' }));
  };

  const handleReset = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);
    setSidebarState((prev) => ({ ...prev, activePanel: 'nodes' }));
  };

  const handleExport = () => {
    const payload = {
      nodes,
      edges,
      exportedAt: new Date().toISOString(),
      version: 1,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flow.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="layout-container">
      <div className="canvas-area">
        <FlowBuilder
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
          selectedNodeId={selectedNodeId}
          onNodeSelect={handleNodeSelect}
          onNodeUpdate={handleNodeUpdate}
          isLocked={isLocked}
        />
      </div>
      <Sidebar
        sidebarState={sidebarState}
        selectedNode={nodes.find((n) => n.id === selectedNodeId) || null}
        onNodeUpdate={handleNodeUpdate}
        onBack={handleBackToNodes}
  onDeleteNode={handleDeleteNode}
  nodes={nodes}
  edges={edges}
  onReset={handleReset}
  onExport={handleExport}
  onSave={handleSave}
      />
    </div>
  );
};

export default Layout;

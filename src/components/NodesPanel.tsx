import React, { useState } from 'react';
import type { NodeTypeConfig, ChatbotNode, ChatbotEdge } from '../types';
import SaveButton from './SaveButton';
import './NodesPanel.css';

const nodeTypesConfig: NodeTypeConfig[] = [
  {
    type: 'textNode',
    label: 'Message',
    icon: '💬',
    description: 'Send a message to the user.'
  }
];

const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

interface NodesPanelProps {
  nodes: ChatbotNode[];
  edges: ChatbotEdge[];
  onReset: () => void;
  onExport: () => void;
  onSave?: () => void;
}

const NodesPanel: React.FC<NodesPanelProps> = ({ nodes, edges, onReset, onExport, onSave }) => {
  const [showInstructions, setShowInstructions] = useState(true);
  return (
    <div className="nodes-panel-container">
      <div className="nodes-panel-header">
        <div className="nodes-actions">
          <button className="nodes-action-btn secondary" onClick={onReset} title="Reset canvas">Reset</button>
          <button className="nodes-action-btn secondary" onClick={onExport} title="Export JSON">Export</button>
          <SaveButton nodes={nodes} edges={edges} onSave={onSave} />
        </div>
      </div>
      <div className="instructions-card">
        <button
          type="button"
          className="instructions-header"
          onClick={() => setShowInstructions((v) => !v)}
          aria-expanded={showInstructions}
        >
          <span className="instructions-title">Instructions</span>
          <span className={`instructions-caret${showInstructions ? ' open' : ''}`}>▾</span>
        </button>
        {showInstructions && (
          <div className="instructions-content">
            <ul className="instructions-list">
              <li>Drag nodes from the right panel to the canvas</li>
              <li>Connect nodes by dragging from source to target</li>
              <li>Click a node to edit properties in the right panel</li>
              <li>Use the minimap to navigate large flows</li>
            </ul>
            <div className="instructions-footnote">React Flow v12.8.4 · React 18</div>
          </div>
        )}
      </div>
  <h3 className="nodes-panel-title">Nodes</h3>
      <div className="nodes-panel-list">
        {nodeTypesConfig.map((node) => (
          <div
            key={node.type}
            className="nodes-panel-item"
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
          >
            <span className="nodes-panel-icon">{node.icon}</span>
            <div className="nodes-panel-info">
              <span className="nodes-panel-label">{node.label}</span>
              <span className="nodes-panel-desc">{node.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodesPanel;

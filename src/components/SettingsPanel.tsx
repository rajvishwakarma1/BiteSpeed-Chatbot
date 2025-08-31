import React, { useState } from 'react';
import type { SettingsPanelProps } from '../types';
import './SettingsPanel.css';

const SettingsPanel: React.FC<SettingsPanelProps> = ({ selectedNode, onNodeUpdate, onBack, onDeleteNode }) => {
  const [label, setLabel] = useState(selectedNode?.data.label || '');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLabel(e.target.value);
    if (selectedNode) {
      onNodeUpdate(selectedNode.id, { ...selectedNode.data, label: e.target.value });
    }
  };

  return (
    <div className="settings-panel-container">
      <div className="settings-panel-header">
        <button className="settings-panel-back" onClick={onBack}>&larr; Back</button>
        <span className="settings-panel-title">Edit Message Node</span>
      </div>
      <div className="settings-panel-body">
        <label htmlFor="node-label" className="settings-panel-label">Message Text</label>
        <textarea
          id="node-label"
          className="settings-panel-textarea"
          value={label}
          onChange={handleChange}
          rows={4}
        />
        {selectedNode && (
          <div className="settings-panel-actions">
            <button
              className="settings-panel-delete"
              onClick={() => onDeleteNode && onDeleteNode(selectedNode.id)}
            >
              Delete Node
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;

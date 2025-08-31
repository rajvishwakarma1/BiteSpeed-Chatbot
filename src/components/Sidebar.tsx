import React from 'react';
import './Sidebar.css';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import type { SidebarProps } from '../types';

const Sidebar: React.FC<SidebarProps> = ({ sidebarState, selectedNode, onNodeUpdate, onBack, onDeleteNode, nodes, edges, onReset, onExport, onSave }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {sidebarState.activePanel === 'settings' && selectedNode ? (
          <SettingsPanel
            selectedNode={selectedNode}
            onNodeUpdate={onNodeUpdate}
            onBack={onBack}
            onDeleteNode={onDeleteNode}
          />
        ) : (
          <NodesPanel nodes={nodes || []} edges={edges || []} onReset={onReset!} onExport={onExport!} onSave={onSave}
          />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

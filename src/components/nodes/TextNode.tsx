import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { TextNodeData } from '../../types';
import './TextNode.css';

type TextNodeProps = NodeProps;

const TextNode: React.FC<TextNodeProps> = ({ data, id, selected }) => {
  const d = data as TextNodeData;
  return (
    <div className={`text-node-container${selected ? ' selected' : ''}`}>
      <Handle type="target" position={Position.Left} id={`${id}-target`} />
      <div className="text-node-header">
  <span className="text-node-icon">✉️</span>
  <span className="text-node-title">Send Message</span>
      </div>
      <div className="text-node-body">
        <span className="text-node-label">{d.label}</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-source`}
        isConnectable={!d.hasOutgoingEdge}
        className={d.hasOutgoingEdge ? 'has-connection' : ''}
      />
    </div>
  );
};

export default TextNode;


import type { ChatbotNode, TextNodeData, NodePosition } from '../types';

let nodeIdCounter = 1;

export function generateNodeId(type: string): string {
  return `${type}-${nodeIdCounter++}`;
}

export function getDefaultNodeData(type: string): any {
  if (type === 'textNode') {
    return {
  label: 'text message',
      type: 'textNode',
    };
  }
  return {};
}

export function createTextNode(label: string, position: NodePosition): ChatbotNode {
  return {
    id: generateNodeId('textNode'),
    type: 'textNode',
    position,
    data: {
      label,
      type: 'textNode',
    },
  };
}

export function createNodeFromType(type: string, position: NodePosition): ChatbotNode {
  if (type === 'textNode') {
  return createTextNode('text message', position);
  }
  return {
    id: generateNodeId(type),
    type,
    position,
    data: getDefaultNodeData(type),
  };
}

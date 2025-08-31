import type { ChatbotNode, ChatbotEdge, ValidationResult } from '../types';
import { getIncomingEdges } from './edgeUtils';

// Returns all nodes that do not have any incoming edges (i.e., empty target handles)
export function getNodesWithoutIncomingEdges(nodes: ChatbotNode[], edges: ChatbotEdge[]): ChatbotNode[] {
  return nodes.filter((node) => getIncomingEdges(edges, node.id).length === 0);
}

// Business rule:
// - Show a single error only when there are more than 1 nodes AND more than 1 node has an empty target handle.
// - A single unconnected node is valid and should not trigger an error.
export function getValidationErrors(nodes: ChatbotNode[], edges: ChatbotEdge[]): string[] {
  const unconnectedCount = getNodesWithoutIncomingEdges(nodes, edges).length;
  if (nodes.length > 1 && unconnectedCount > 1) {
    return ['Cannot save Flow'];
  }
  return [];
}

export function isFlowValid(nodes: ChatbotNode[], edges: ChatbotEdge[]): boolean {
  return getValidationErrors(nodes, edges).length === 0;
}

export function validateFlow(nodes: ChatbotNode[], edges: ChatbotEdge[]): ValidationResult {
  const errors = getValidationErrors(nodes, edges);
  return {
    valid: errors.length === 0,
    errors,
  };
}

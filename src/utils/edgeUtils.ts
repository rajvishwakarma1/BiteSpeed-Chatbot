import type { ChatbotEdge } from '../types';
import type { Connection } from '@xyflow/react';

export function getOutgoingEdges(edges: ChatbotEdge[], source: string): ChatbotEdge[] {
  return edges.filter((edge) => edge.source === source);
}

export function getIncomingEdges(edges: ChatbotEdge[], target: string): ChatbotEdge[] {
  return edges.filter((edge) => edge.target === target);
}

export function isValidConnection(connection: Connection, edges: ChatbotEdge[]): boolean {
  // Only one outgoing edge per source handle
  const outgoing = getOutgoingEdges(edges, connection.source || '');
  return outgoing.length === 0;
}

export function canConnectToTarget(connection: Connection, edges: ChatbotEdge[]): boolean {
  // Multiple incoming edges allowed
  return true;
}

export function removeEdgesBySource(edges: ChatbotEdge[], source: string): ChatbotEdge[] {
  return edges.filter((edge) => edge.source !== source);
}

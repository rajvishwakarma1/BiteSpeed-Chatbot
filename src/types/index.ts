import type { Dispatch, SetStateAction } from 'react';
import type { Node, Edge, XYPosition } from '@xyflow/react';

export interface ValidationResult {
  valid: boolean;
  errors?: string[];
}

export interface SaveButtonProps {
  nodes: ChatbotNode[];
  edges: ChatbotEdge[];
  onSave?: () => void;
}

export type SaveStatus = 'idle' | 'loading' | 'success' | 'error';

export interface FlowValidationError {
  nodeId: string;
  message: string;
}

export interface SaveState {
  status: SaveStatus;
  message: string;
}

export interface TextNodeData extends Record<string, unknown> {
  label: string;
  type: 'textNode';
  hasOutgoingEdge?: boolean;
}

export type ChatbotNode = Node<TextNodeData>;
export type ChatbotEdge = Edge;

export interface FlowState {
  nodes: ChatbotNode[];
  edges: ChatbotEdge[];
}

export interface NodeTypeConfig {
  type: string;
  label: string;
  icon: string;
  description: string;
}

export interface DragNodeData {
  type: string;
  label: string;
}

export interface SidebarState {
  isOpen: boolean;
  activePanel: 'nodes' | 'settings' | null;
  showNodesPanel?: boolean;
}

export interface SelectedNodeState {
  selectedNodeId: string | null;
  selectedNode: ChatbotNode | null;
}

export interface SettingsPanelProps {
  selectedNode: ChatbotNode | null;
  onNodeUpdate: (nodeId: string, newData: any) => void;
  onBack: () => void;
  onDeleteNode?: (nodeId: string) => void;
}

export interface FlowBuilderProps {
  nodes: ChatbotNode[];
  setNodes: Dispatch<SetStateAction<ChatbotNode[]>>;
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string | null) => void;
  onNodeUpdate: (nodeId: string, newData: any) => void;
  edges: ChatbotEdge[];
  setEdges: Dispatch<SetStateAction<ChatbotEdge[]>>;
  isLocked: boolean;
}

export interface EdgeValidationResult {
  valid: boolean;
  reason?: string;
}

export interface ConnectionState {
  connecting: boolean;
  connectionAttempt: any;
}

export interface HandleState {
  isConnectable: boolean;
  hasOutgoingEdge: boolean;
  canConnect: boolean;
}

export interface SidebarProps {
  sidebarState: SidebarState;
  selectedNode: ChatbotNode | null;
  onNodeUpdate: (nodeId: string, newData: any) => void;
  onBack: () => void;
  onDeleteNode?: (nodeId: string) => void;
  nodes?: ChatbotNode[];
  edges?: ChatbotEdge[];
  onReset?: () => void;
  onExport?: () => void;
  onSave?: () => void;
}

export interface LockButtonProps {
  isLocked: boolean;
  onToggleLock: () => void;
}

export interface LayoutConfig {
  sidebarWidth: number;
  isMobile: boolean;
}

export type NodePosition = XYPosition;

export type FlowOperation = 'add' | 'remove' | 'update';

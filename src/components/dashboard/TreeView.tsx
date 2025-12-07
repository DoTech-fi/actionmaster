import { useState } from 'react';
import TreeNode, { TreeNodeData } from './TreeNode';
import WorkflowPanel from './WorkflowPanel';
import WorkflowTerminal from './WorkflowTerminal';
import { RefreshCw } from 'lucide-react';

// Mock YAML-based folder hierarchy data
const mockTreeData: TreeNodeData[] = [
  {
    id: '1',
    name: 'production',
    type: 'folder',
    children: [
      {
        id: '1-1',
        name: 'frontend-services',
        type: 'folder',
        children: [
          { id: '1-1-1', name: 'web-app', type: 'repository' },
          { id: '1-1-2', name: 'mobile-app', type: 'repository' },
          { id: '1-1-3', name: 'admin-portal', type: 'repository' },
        ],
      },
      {
        id: '1-2',
        name: 'backend-services',
        type: 'folder',
        children: [
          { id: '1-2-1', name: 'api-gateway', type: 'repository' },
          { id: '1-2-2', name: 'auth-service', type: 'repository' },
          { id: '1-2-3', name: 'payment-service', type: 'repository' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'staging',
    type: 'folder',
    children: [
      {
        id: '2-1',
        name: 'test-environments',
        type: 'folder',
        children: [
          { id: '2-1-1', name: 'integration-tests', type: 'repository' },
          { id: '2-1-2', name: 'e2e-tests', type: 'repository' },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'development',
    type: 'folder',
    children: [
      { id: '3-1', name: 'feature-branches', type: 'repository' },
      { id: '3-2', name: 'experimental', type: 'repository' },
    ],
  },
];

interface TreeViewProps {
  isTerminalOpen?: boolean;
  onRunWorkflow?: (repo: string) => void;
  onBackFromTerminal?: () => void;
}

export default function TreeView({ onRunWorkflow }: TreeViewProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedRepository, setSelectedRepository] = useState<string>('');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleRepositoryClick = (name: string) => {
    setSelectedRepository(name);
    setIsPanelOpen(true);
  };

  const handleRunWorkflow = (repositoryName: string) => {
    setIsPanelOpen(false);
    if (onRunWorkflow) {
      onRunWorkflow(repositoryName);
    }
  };

  return (
    <>
      <WorkflowPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        repositoryName={selectedRepository}
        onRunWorkflow={handleRunWorkflow}
      />
      <div className="panel-bg rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700/50">
        <div>
          <h3 className="font-['Space_Grotesk'] font-bold text-lg warm-text">
            Repository Structure
          </h3>
          <p className="text-sm warm-text-secondary mt-1">
            YAML-based folder hierarchies
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`w-5 h-5 warm-text-secondary ${isRefreshing ? 'animate-spin' : ''}`}
          />
        </button>
      </div>

      {/* Tree Content */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {mockTreeData.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onRepositoryClick={handleRepositoryClick}
          />
        ))}
      </div>

      {/* Footer Stats */}
      <div className="px-6 py-3 border-t border-gray-700/50 bg-[#1b1b1d]/50">
        <div className="flex items-center justify-between text-xs font-['JetBrains_Mono']">
          <span className="warm-text-secondary">
            Total Repositories: <span className="amber-accent font-medium">12</span>
          </span>
          <span className="warm-text-secondary">
            Active Builds: <span className="text-green-400 font-medium">8</span>
          </span>
          <span className="warm-text-secondary">
            Last Updated: <span className="blue-accent font-medium">2m ago</span>
          </span>
        </div>
      </div>
    </div>
    </>
  );
}

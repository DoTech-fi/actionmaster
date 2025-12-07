import { useState } from 'react';
import { ChevronRight, Folder, FolderOpen, GitBranch, File } from 'lucide-react';

export interface TreeNodeData {
  id: string;
  name: string;
  type: 'folder' | 'repository' | 'file';
  children?: TreeNodeData[];
}

interface TreeNodeProps {
  node: TreeNodeData;
  level?: number;
  selectedId?: string;
  onSelect?: (id: string) => void;
  onRepositoryClick?: (name: string) => void;
}

export default function TreeNode({ node, level = 0, selectedId, onSelect, onRepositoryClick }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(node.id);
    }
    if (node.type === 'repository' && onRepositoryClick) {
      onRepositoryClick(node.name);
    }
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const getIcon = () => {
    if (node.type === 'folder') {
      return isExpanded ? (
        <FolderOpen className="w-4 h-4 amber-accent" />
      ) : (
        <Folder className="w-4 h-4 blue-accent" />
      );
    }
    if (node.type === 'repository') {
      return <GitBranch className="w-4 h-4 text-green-400" />;
    }
    return <File className="w-4 h-4 warm-text-secondary" />;
  };

  return (
    <div>
      {/* Node */}
      <div
        className={`
          flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer
          tree-node-hover
          ${isSelected ? 'bg-amber-500/10 border-l-2 border-amber-500' : ''}
        `}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={handleClick}
      >
        {/* Expand/Collapse Icon */}
        {hasChildren ? (
          <ChevronRight
            className={`
              w-4 h-4 warm-text-secondary flex-shrink-0
              tree-expand-animation
              ${isExpanded ? 'expanded' : ''}
            `}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          />
        ) : (
          <div className="w-4" />
        )}

        {/* Icon */}
        <div className="flex-shrink-0">{getIcon()}</div>

        {/* Label */}
        <span
          className={`
            font-['JetBrains_Mono'] text-sm flex-1
            ${isSelected ? 'amber-accent font-medium' : 'warm-text'}
          `}
        >
          {node.name}
        </span>

        {/* Badge for repositories */}
        {node.type === 'repository' && (
          <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400 font-['JetBrains_Mono']">
            active
          </span>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-0 top-0 bottom-0 border-l border-gray-700/50"
            style={{ left: `${level * 16 + 20}px` }}
          />
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              onRepositoryClick={onRepositoryClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { FileText, History, Network, Fingerprint, Menu, X } from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: 'new-item', label: 'New Item', icon: FileText },
  { id: 'build-history', label: 'Build History', icon: History },
  { id: 'project-relationship', label: 'Project Relationship', icon: Network },
  { id: 'check-fingerprint', label: 'Check Fingerprint', icon: Fingerprint },
];

export default function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed left-0 top-0 h-screen sidebar-bg z-50 
          transition-all duration-300 ease-in-out
          ${isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'w-64 lg:w-60'}
          shadow-2xl
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700/50">
          {!isCollapsed && (
            <h1 className="font-['Space_Grotesk'] font-bold text-lg warm-text">
              DevOps Hub
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors lg:hidden"
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5 warm-text" />
            ) : (
              <X className="w-5 h-5 warm-text" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${isActive ? 'active-nav-item' : 'hover:bg-white/5'}
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <Icon 
                  className={`w-5 h-5 ${isActive ? 'amber-accent' : 'warm-text-secondary'}`} 
                />
                {!isCollapsed && (
                  <span 
                    className={`
                      font-['Space_Grotesk'] font-medium text-sm
                      ${isActive ? 'amber-accent' : 'warm-text-secondary'}
                    `}
                  >
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50">
            <div className="text-xs warm-text-secondary font-['JetBrains_Mono']">
              v2.401.3
            </div>
          </div>
        )}
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed top-4 left-4 z-30 p-2 rounded-lg sidebar-bg shadow-lg lg:hidden"
      >
        <Menu className="w-5 h-5 warm-text" />
      </button>
    </>
  );
}

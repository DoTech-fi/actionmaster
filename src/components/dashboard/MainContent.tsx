import { useState } from 'react';
import TreeView from './TreeView';
import { Activity, TrendingUp, AlertCircle, CheckCircle, Server } from 'lucide-react';
import WorkflowTerminal from './WorkflowTerminal';
import Workers from './Workers';

const stats = [
  {
    id: 'builds',
    label: 'Total Builds',
    value: '1,247',
    change: '+12%',
    icon: Activity,
    color: 'blue',
  },
  {
    id: 'success',
    label: 'Success Rate',
    value: '94.2%',
    change: '+2.1%',
    icon: CheckCircle,
    color: 'green',
  },
  {
    id: 'workers',
    label: 'Workers',
    value: '2/2',
    change: 'Active',
    icon: Server,
    color: 'purple',
    action: true,
  },
  {
    id: 'failed',
    label: 'Failed Builds',
    value: '8',
    change: '-3',
    icon: AlertCircle,
    color: 'red',
  },
];

interface MainContentProps {
  activeItem?: string;
  onNavigate?: (item: string) => void;
}

export default function MainContent({ activeItem = 'dashboard', onNavigate }: MainContentProps) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [runningRepository, setRunningRepository] = useState<string>('');

  const handleRunWorkflow = (repositoryName: string) => {
    setRunningRepository(repositoryName);
    setIsTerminalOpen(true);
  };

  const handleBackFromTerminal = () => {
    setIsTerminalOpen(false);
    setRunningRepository('');
  };

  if (activeItem === 'workers') {
    return <Workers />;
  }

  // Dashboard View (default)
  if (activeItem === 'dashboard') {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  onClick={() => stat.action && onNavigate?.(stat.id)}
                  className={`
                    panel-bg rounded-lg p-6 shadow-lg transition-all
                    ${stat.action ? 'cursor-pointer hover:scale-[1.02] hover:shadow-amber-500/10 active:scale-[0.98]' : 'hover:shadow-xl'}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm warm-text-secondary font-['Space_Grotesk']">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold warm-text mt-2 font-['Space_Grotesk']">
                        {stat.value}
                      </p>
                      <p
                        className={`
                          text-sm mt-2 font-['JetBrains_Mono']
                          ${stat.change === 'Active' ? 'text-green-400' : stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}
                        `}
                      >
                        {stat.change === 'Active' ? 'Online' : `${stat.change} from last week`}
                      </p>
                    </div>
                    <div
                      className={`
                        p-3 rounded-lg
                        ${stat.color === 'blue' ? 'bg-blue-500/10' : ''}
                        ${stat.color === 'green' ? 'bg-green-500/10' : ''}
                        ${stat.color === 'amber' ? 'bg-amber-500/10' : ''}
                        ${stat.color === 'red' ? 'bg-red-500/10' : ''}
                        ${stat.color === 'purple' ? 'bg-purple-500/10' : ''}
                      `}
                    >
                      <Icon
                        className={`
                          w-6 h-6
                          ${stat.color === 'blue' ? 'text-blue-400' : ''}
                          ${stat.color === 'green' ? 'text-green-400' : ''}
                          ${stat.color === 'amber' ? 'text-amber-400' : ''}
                          ${stat.color === 'red' ? 'text-red-400' : ''}
                          ${stat.color === 'purple' ? 'text-purple-400' : ''}
                        `}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="panel-bg rounded-lg shadow-lg p-6">
            <h3 className="font-['Space_Grotesk'] font-bold text-lg warm-text mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {[
                {
                  repo: 'web-app',
                  action: 'Build #1247 completed',
                  status: 'success',
                  time: '2 minutes ago',
                },
                {
                  repo: 'api-gateway',
                  action: 'Deployment to production',
                  status: 'success',
                  time: '15 minutes ago',
                },
                {
                  repo: 'auth-service',
                  action: 'Build #892 failed',
                  status: 'failed',
                  time: '1 hour ago',
                },
                {
                  repo: 'mobile-app',
                  action: 'Tests passed',
                  status: 'success',
                  time: '2 hours ago',
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-[#1b1b1d]/50 hover:bg-[#1b1b1d] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        w-2 h-2 rounded-full
                        ${activity.status === 'success' ? 'bg-green-400' : 'bg-red-400'}
                      `}
                    />
                    <div>
                      <p className="font-['JetBrains_Mono'] text-sm warm-text">
                        {activity.repo}
                      </p>
                      <p className="text-sm warm-text-secondary mt-1">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs warm-text-secondary font-['JetBrains_Mono']">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Workflows View
  if (activeItem === 'workflows') {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {isTerminalOpen ? (
             <div className="panel-bg rounded-lg shadow-lg overflow-hidden h-[700px]">
               <WorkflowTerminal
                 repositoryName={runningRepository}
                 onBack={handleBackFromTerminal}
               />
             </div>
          ) : (
            <TreeView 
              isTerminalOpen={isTerminalOpen}
              onRunWorkflow={handleRunWorkflow}
              onBackFromTerminal={handleBackFromTerminal}
            />
          )}
        </div>
      </div>
    );
  }

  return null;
}

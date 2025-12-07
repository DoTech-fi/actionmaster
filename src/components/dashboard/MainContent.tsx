import TreeView from './TreeView';
import { Activity, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const stats = [
  {
    label: 'Total Builds',
    value: '1,247',
    change: '+12%',
    icon: Activity,
    color: 'blue',
  },
  {
    label: 'Success Rate',
    value: '94.2%',
    change: '+2.1%',
    icon: CheckCircle,
    color: 'green',
  },
  {
    label: 'Active Pipelines',
    value: '23',
    change: '+5',
    icon: TrendingUp,
    color: 'amber',
  },
  {
    label: 'Failed Builds',
    value: '8',
    change: '-3',
    icon: AlertCircle,
    color: 'red',
  },
];

export default function MainContent() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="panel-bg rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
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
                        ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}
                      `}
                    >
                      {stat.change} from last week
                    </p>
                  </div>
                  <div
                    className={`
                      p-3 rounded-lg
                      ${stat.color === 'blue' ? 'bg-blue-500/10' : ''}
                      ${stat.color === 'green' ? 'bg-green-500/10' : ''}
                      ${stat.color === 'amber' ? 'bg-amber-500/10' : ''}
                      ${stat.color === 'red' ? 'bg-red-500/10' : ''}
                    `}
                  >
                    <Icon
                      className={`
                        w-6 h-6
                        ${stat.color === 'blue' ? 'text-blue-400' : ''}
                        ${stat.color === 'green' ? 'text-green-400' : ''}
                        ${stat.color === 'amber' ? 'text-amber-400' : ''}
                        ${stat.color === 'red' ? 'text-red-400' : ''}
                      `}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tree View Section */}
        <TreeView />

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

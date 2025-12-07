import { X, Play, Clock, GitBranch, Settings, CheckCircle } from 'lucide-react';

interface WorkflowParameter {
  name: string;
  type: 'string' | 'boolean' | 'number' | 'select';
  value: string | boolean | number;
  description: string;
  options?: string[];
}

interface WorkflowPanelProps {
  isOpen: boolean;
  onClose: () => void;
  repositoryName: string;
  onRunWorkflow: (repositoryName: string) => void;
}

// Mock workflow parameters data
const mockWorkflowData: Record<string, WorkflowParameter[]> = {
  'web-app': [
    {
      name: 'ENVIRONMENT',
      type: 'select',
      value: 'production',
      description: 'Target deployment environment',
      options: ['development', 'staging', 'production'],
    },
    {
      name: 'BUILD_VERSION',
      type: 'string',
      value: '1.2.3',
      description: 'Version number for the build',
    },
    {
      name: 'RUN_TESTS',
      type: 'boolean',
      value: true,
      description: 'Execute test suite before deployment',
    },
    {
      name: 'PARALLEL_JOBS',
      type: 'number',
      value: 4,
      description: 'Number of parallel build jobs',
    },
  ],
  'mobile-app': [
    {
      name: 'PLATFORM',
      type: 'select',
      value: 'ios',
      description: 'Target mobile platform',
      options: ['ios', 'android', 'both'],
    },
    {
      name: 'APP_VERSION',
      type: 'string',
      value: '2.1.0',
      description: 'Application version number',
    },
    {
      name: 'ENABLE_ANALYTICS',
      type: 'boolean',
      value: true,
      description: 'Include analytics tracking',
    },
    {
      name: 'MIN_SDK_VERSION',
      type: 'number',
      value: 21,
      description: 'Minimum SDK version',
    },
  ],
  'admin-portal': [
    {
      name: 'DEPLOYMENT_TYPE',
      type: 'select',
      value: 'rolling',
      description: 'Deployment strategy',
      options: ['rolling', 'blue-green', 'canary'],
    },
    {
      name: 'RELEASE_TAG',
      type: 'string',
      value: 'v3.0.1',
      description: 'Git release tag',
    },
    {
      name: 'ENABLE_MONITORING',
      type: 'boolean',
      value: true,
      description: 'Enable monitoring and alerts',
    },
  ],
  'api-gateway': [
    {
      name: 'REGION',
      type: 'select',
      value: 'us-east-1',
      description: 'AWS deployment region',
      options: ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'],
    },
    {
      name: 'INSTANCE_TYPE',
      type: 'select',
      value: 't3.medium',
      description: 'EC2 instance type',
      options: ['t3.small', 't3.medium', 't3.large', 't3.xlarge'],
    },
    {
      name: 'AUTO_SCALING',
      type: 'boolean',
      value: true,
      description: 'Enable auto-scaling',
    },
    {
      name: 'MAX_INSTANCES',
      type: 'number',
      value: 10,
      description: 'Maximum number of instances',
    },
  ],
  'auth-service': [
    {
      name: 'JWT_EXPIRY',
      type: 'number',
      value: 3600,
      description: 'JWT token expiry in seconds',
    },
    {
      name: 'ENABLE_2FA',
      type: 'boolean',
      value: true,
      description: 'Enable two-factor authentication',
    },
    {
      name: 'SESSION_TIMEOUT',
      type: 'number',
      value: 1800,
      description: 'Session timeout in seconds',
    },
  ],
  'payment-service': [
    {
      name: 'PAYMENT_GATEWAY',
      type: 'select',
      value: 'stripe',
      description: 'Payment gateway provider',
      options: ['stripe', 'paypal', 'square'],
    },
    {
      name: 'ENABLE_WEBHOOKS',
      type: 'boolean',
      value: true,
      description: 'Enable payment webhooks',
    },
    {
      name: 'RETRY_ATTEMPTS',
      type: 'number',
      value: 3,
      description: 'Number of retry attempts for failed payments',
    },
  ],
};

export default function WorkflowPanel({ isOpen, onClose, repositoryName, onRunWorkflow }: WorkflowPanelProps) {
  const parameters = mockWorkflowData[repositoryName] || [];

  const handleRunWorkflow = () => {
    onRunWorkflow(repositoryName);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-screen w-full md:w-[500px] panel-bg shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 panel-bg border-b border-gray-700/50 p-6 flex items-center justify-between">
          <div>
            <h2 className="font-['Space_Grotesk'] font-bold text-xl warm-text">
              Workflow Parameters
            </h2>
            <p className="text-sm warm-text-secondary mt-1 font-['JetBrains_Mono']">
              {repositoryName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5 warm-text-secondary" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="p-6 border-b border-gray-700/50 bg-[#1b1b1d]/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm warm-text-secondary">Status:</span>
              <span className="text-sm text-green-400 font-['JetBrains_Mono']">Active</span>
            </div>
            <div className="w-px h-4 bg-gray-700/50" />
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 blue-accent" />
              <span className="text-sm warm-text-secondary">Branch:</span>
              <span className="text-sm blue-accent font-['JetBrains_Mono']">main</span>
            </div>
          </div>
        </div>

        {/* Parameters Form */}
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 amber-accent" />
            <h3 className="font-['Space_Grotesk'] font-semibold warm-text">
              Build Parameters
            </h3>
          </div>

          {parameters.length === 0 ? (
            <div className="text-center py-8">
              <p className="warm-text-secondary">No parameters configured for this workflow</p>
            </div>
          ) : (
            parameters.map((param) => (
              <div key={param.name} className="space-y-2">
                <label className="block">
                  <span className="font-['JetBrains_Mono'] text-sm warm-text font-medium">
                    {param.name}
                  </span>
                  <p className="text-xs warm-text-secondary mt-1">
                    {param.description}
                  </p>
                </label>

                {param.type === 'string' && (
                  <input
                    type="text"
                    defaultValue={param.value as string}
                    className="w-full px-4 py-2 rounded-lg bg-[#1b1b1d] border border-gray-700/50 warm-text placeholder:warm-text-secondary focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all font-['JetBrains_Mono'] text-sm"
                  />
                )}

                {param.type === 'number' && (
                  <input
                    type="number"
                    defaultValue={param.value as number}
                    className="w-full px-4 py-2 rounded-lg bg-[#1b1b1d] border border-gray-700/50 warm-text placeholder:warm-text-secondary focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all font-['JetBrains_Mono'] text-sm"
                  />
                )}

                {param.type === 'boolean' && (
                  <label className="flex items-center gap-3 p-3 rounded-lg bg-[#1b1b1d] cursor-pointer hover:bg-[#1b1b1d]/80 transition-colors">
                    <input
                      type="checkbox"
                      defaultChecked={param.value as boolean}
                      className="w-4 h-4 rounded border-gray-700 bg-[#111113] text-amber-500 focus:ring-amber-500/30 focus:ring-offset-0"
                    />
                    <span className="text-sm warm-text">
                      {param.value ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                )}

                {param.type === 'select' && (
                  <select
                    defaultValue={param.value as string}
                    className="w-full px-4 py-2 rounded-lg bg-[#1b1b1d] border border-gray-700/50 warm-text focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all font-['JetBrains_Mono'] text-sm"
                  >
                    {param.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 p-6 border-t border-gray-700/50 panel-bg space-y-3">
          <button 
            onClick={handleRunWorkflow}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-[#111113] font-['Space_Grotesk'] font-semibold transition-colors"
          >
            <Play className="w-4 h-4" />
            Run Workflow
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 warm-text font-['Space_Grotesk'] font-medium transition-colors">
            <Clock className="w-4 h-4" />
            Schedule Build
          </button>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Terminal, Circle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface WorkflowTerminalProps {
  repositoryName: string;
  onBack: () => void;
}

type WorkflowStatus = 'running' | 'success' | 'failed';

// Mock stdout lines for different repositories
const mockWorkflowOutput: Record<string, string[]> = {
  'web-app': [
    '$ jenkins-cli run web-app --env=production',
    '',
    '[INFO] Starting workflow for web-app...',
    '[INFO] Checking out repository...',
    'Cloning into \'web-app\'...',
    'remote: Enumerating objects: 1247, done.',
    'remote: Counting objects: 100% (1247/1247), done.',
    'remote: Compressing objects: 100% (892/892), done.',
    'Receiving objects: 100% (1247/1247), 4.23 MiB | 12.5 MiB/s, done.',
    'Resolving deltas: 100% (634/634), done.',
    '',
    '[INFO] Installing dependencies...',
    'npm WARN deprecated @types/node@14.0.0: This is a stub types definition.',
    'added 1247 packages in 32s',
    '',
    '[INFO] Running tests...',
    '  PASS  src/components/Button.test.tsx',
    '  PASS  src/components/Header.test.tsx',
    '  PASS  src/utils/helpers.test.ts',
    '  PASS  src/hooks/useAuth.test.ts',
    '',
    'Test Suites: 4 passed, 4 total',
    'Tests:       23 passed, 23 total',
    'Time:        8.234s',
    '',
    '[INFO] Building application...',
    'Creating an optimized production build...',
    'Compiled successfully.',
    '',
    'File sizes after gzip:',
    '  142.32 kB  build/static/js/main.a1b2c3d4.js',
    '  23.45 kB   build/static/css/main.e5f6g7h8.css',
    '',
    '[INFO] Deploying to production...',
    'Uploading build artifacts...',
    'Invalidating CDN cache...',
    'Deployment complete!',
    '',
    '[SUCCESS] Workflow completed successfully!',
    'Build ID: #1248',
    'Duration: 2m 34s',
  ],
  'mobile-app': [
    '$ jenkins-cli run mobile-app --platform=ios',
    '',
    '[INFO] Starting workflow for mobile-app...',
    '[INFO] Checking out repository...',
    'Cloning into \'mobile-app\'...',
    'remote: Enumerating objects: 2341, done.',
    'remote: Counting objects: 100% (2341/2341), done.',
    'Receiving objects: 100% (2341/2341), 8.12 MiB | 15.2 MiB/s, done.',
    '',
    '[INFO] Installing CocoaPods...',
    'Analyzing dependencies',
    'Downloading dependencies',
    'Installing React-Core (0.72.4)',
    'Installing React-Native (0.72.4)',
    'Generating Pods project',
    'Pod installation complete!',
    '',
    '[INFO] Building iOS app...',
    'Build settings from command line:',
    '    ARCHS = arm64',
    '    CONFIGURATION = Release',
    'Compiling Swift sources...',
    'Linking binary...',
    'Signing code...',
    '',
    '[INFO] Running unit tests...',
    'Test Suite \'All tests\' started',
    'Test Suite \'MobileAppTests\' passed',
    '  Executed 45 tests, with 0 failures',
    '',
    '[INFO] Archiving application...',
    'Creating IPA file...',
    'Archive successful: MobileApp.ipa (24.5 MB)',
    '',
    '[INFO] Uploading to TestFlight...',
    'Authenticating with App Store Connect...',
    'Uploading build...',
    'Processing build...',
    'Build available for testing!',
    '',
    '[SUCCESS] Workflow completed successfully!',
    'Build ID: #892',
    'Duration: 5m 12s',
  ],
  'api-gateway': [
    '$ jenkins-cli run api-gateway --region=us-east-1',
    '',
    '[INFO] Starting workflow for api-gateway...',
    '[INFO] Checking out repository...',
    'Cloning into \'api-gateway\'...',
    'Receiving objects: 100% (892/892), 2.34 MiB | 10.2 MiB/s, done.',
    '',
    '[INFO] Running linter...',
    'ESLint: No errors found',
    '',
    '[INFO] Running tests...',
    '  ✓ GET /api/health returns 200',
    '  ✓ POST /api/auth validates token',
    '  ✓ Rate limiting works correctly',
    '  ✓ CORS headers are set properly',
    '',
    'All 24 tests passed!',
    '',
    '[INFO] Building Docker image...',
    'Step 1/8 : FROM node:18-alpine',
    'Step 2/8 : WORKDIR /app',
    'Step 3/8 : COPY package*.json ./',
    'Step 4/8 : RUN npm ci --only=production',
    'Step 5/8 : COPY . .',
    'Step 6/8 : EXPOSE 3000',
    'Step 7/8 : CMD ["node", "dist/index.js"]',
    'Successfully built a1b2c3d4e5f6',
    '',
    '[INFO] Pushing to ECR...',
    'Login Succeeded',
    'Pushing image: api-gateway:v2.1.0',
    'Push complete!',
    '',
    '[INFO] Deploying to ECS...',
    'Updating service...',
    'Waiting for deployment to stabilize...',
    'Service stable!',
    '',
    '[SUCCESS] Workflow completed successfully!',
    'Build ID: #456',
    'Duration: 3m 45s',
  ],
};

// Default output for repos without specific mock data
const defaultOutput = [
  '$ jenkins-cli run workflow',
  '',
  '[INFO] Starting workflow...',
  '[INFO] Checking out repository...',
  'Cloning repository...',
  'Receiving objects: 100%, done.',
  '',
  '[INFO] Installing dependencies...',
  'Dependencies installed successfully.',
  '',
  '[INFO] Running build...',
  'Build completed.',
  '',
  '[INFO] Running tests...',
  'All tests passed!',
  '',
  '[INFO] Deploying...',
  'Deployment successful!',
  '',
  '[SUCCESS] Workflow completed successfully!',
];

export default function WorkflowTerminal({ repositoryName, onBack }: WorkflowTerminalProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [status, setStatus] = useState<WorkflowStatus>('running');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const outputLines = mockWorkflowOutput[repositoryName] || defaultOutput;

  useEffect(() => {
    if (currentLineIndex < outputLines.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, outputLines[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, Math.random() * 150 + 50); // Random delay between 50-200ms for realistic feel

      return () => clearTimeout(timeout);
    } else {
      // Workflow complete
      const lastLine = outputLines[outputLines.length - 1];
      if (lastLine.includes('[SUCCESS]')) {
        setStatus('success');
      } else if (lastLine.includes('[FAILED]') || lastLine.includes('[ERROR]')) {
        setStatus('failed');
      } else {
        setStatus('success');
      }
    }
  }, [currentLineIndex, outputLines]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const getStatusIcon = () => {
    switch (status) {
      case 'running':
        return <Loader2 className="w-4 h-4 animate-spin text-amber-400" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'running':
        return 'Running';
      case 'success':
        return 'Completed';
      case 'failed':
        return 'Failed';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'running':
        return 'text-amber-400';
      case 'success':
        return 'text-green-400';
      case 'failed':
        return 'text-red-400';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700/50 panel-bg">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 warm-text-secondary" />
          </button>
          <div>
            <h2 className="font-['Space_Grotesk'] font-bold text-lg warm-text flex items-center gap-2">
              <Terminal className="w-5 h-5 amber-accent" />
              Workflow Output
            </h2>
            <p className="text-sm warm-text-secondary font-['JetBrains_Mono']">
              {repositoryName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className={`text-sm font-['JetBrains_Mono'] ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="px-6 py-3 border-b border-gray-700/50 bg-[#1b1b1d]/50 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Circle className={`w-2 h-2 ${status === 'running' ? 'text-amber-400 animate-pulse' : status === 'success' ? 'text-green-400' : 'text-red-400'}`} fill="currentColor" />
          <span className="text-xs warm-text-secondary font-['JetBrains_Mono']">
            Build #{Math.floor(Math.random() * 1000) + 1000}
          </span>
        </div>
        <div className="w-px h-4 bg-gray-700/50" />
        <span className="text-xs warm-text-secondary font-['JetBrains_Mono']">
          Started: {new Date().toLocaleTimeString()}
        </span>
        <div className="w-px h-4 bg-gray-700/50" />
        <span className="text-xs warm-text-secondary font-['JetBrains_Mono']">
          Lines: {lines.length}/{outputLines.length}
        </span>
      </div>

      {/* Terminal Output */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto bg-[#0d0d0f] p-4 font-['JetBrains_Mono'] text-sm"
      >
        {lines.map((line, index) => (
          <div
            key={index}
            className={`py-0.5 ${
              line.startsWith('[INFO]')
                ? 'text-blue-400'
                : line.startsWith('[SUCCESS]')
                ? 'text-green-400'
                : line.startsWith('[ERROR]') || line.startsWith('[FAILED]')
                ? 'text-red-400'
                : line.startsWith('[WARN]')
                ? 'text-amber-400'
                : line.startsWith('$')
                ? 'text-amber-300'
                : line.includes('PASS') || line.includes('✓')
                ? 'text-green-400'
                : line.includes('FAIL') || line.includes('✗')
                ? 'text-red-400'
                : 'warm-text-secondary'
            }`}
          >
            {line || '\u00A0'}
          </div>
        ))}
        {status === 'running' && (
          <div className="flex items-center gap-2 py-0.5 warm-text-secondary">
            <span className="animate-pulse">▋</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-700/50 panel-bg flex items-center justify-between">
        <div className="flex items-center gap-4">
          {status === 'success' && (
            <span className="text-sm text-green-400 font-['JetBrains_Mono']">
              ✓ Workflow completed successfully
            </span>
          )}
          {status === 'failed' && (
            <span className="text-sm text-red-400 font-['JetBrains_Mono']">
              ✗ Workflow failed
            </span>
          )}
          {status === 'running' && (
            <span className="text-sm warm-text-secondary font-['JetBrains_Mono']">
              Processing...
            </span>
          )}
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 warm-text font-['Space_Grotesk'] font-medium text-sm transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

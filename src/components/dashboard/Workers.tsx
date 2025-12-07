import { useState } from 'react';
import { Plus, Server, Trash2, Cpu } from 'lucide-react';

interface Worker {
  id: string;
  name: string;
  status: 'active' | 'offline' | 'busy';
  cpu: string;
  memory: string;
  jobs: number;
}

const initialWorkers: Worker[] = [
  {
    id: '1',
    name: 'worker-linux-01',
    status: 'active',
    cpu: '12%',
    memory: '2.4GB',
    jobs: 45,
  },
  {
    id: '2',
    name: 'worker-linux-02',
    status: 'busy',
    cpu: '89%',
    memory: '14.2GB',
    jobs: 12,
  },
];

export default function Workers() {
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [isAdding, setIsAdding] = useState(false);
  const [newWorkerName, setNewWorkerName] = useState('');

  const handleAddWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkerName.trim()) return;

    const newWorker: Worker = {
      id: Date.now().toString(),
      name: newWorkerName,
      status: 'active',
      cpu: '0%',
      memory: '0.1GB',
      jobs: 0,
    };

    setWorkers([...workers, newWorker]);
    setNewWorkerName('');
    setIsAdding(false);
  };

  const handleDeleteWorker = (id: string) => {
    setWorkers(workers.filter(w => w.id !== id));
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-['Space_Grotesk'] font-bold text-2xl warm-text flex items-center gap-3">
              <Server className="w-8 h-8 amber-accent" />
              GitHub Actions Workers
            </h1>
            <p className="text-sm warm-text-secondary mt-1 font-['JetBrains_Mono']">
              Manage your self-hosted runners
            </p>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-colors font-['Space_Grotesk']"
          >
            <Plus className="w-5 h-5" />
            Add Worker
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleAddWorker} className="panel-bg p-6 rounded-lg shadow-lg border border-gray-700/50 animate-in fade-in slide-in-from-top-4">
            <h3 className="text-lg font-bold warm-text mb-4 font-['Space_Grotesk']">Register New Worker</h3>
            <div className="flex gap-4">
              <input
                type="text"
                value={newWorkerName}
                onChange={(e) => setNewWorkerName(e.target.value)}
                placeholder="Enter worker name (e.g., worker-linux-03)"
                className="flex-1 bg-[#1b1b1d] border border-gray-700 rounded-lg px-4 py-2 warm-text focus:outline-none focus:border-amber-500 font-['JetBrains_Mono']"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-medium rounded-lg transition-colors"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-6 py-2 hover:bg-white/5 warm-text-secondary rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workers.map((worker) => (
            <div key={worker.id} className="panel-bg rounded-lg p-6 shadow-lg border border-gray-700/50 hover:border-gray-600 transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    worker.status === 'active' ? 'bg-green-500' :
                    worker.status === 'busy' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  <h3 className="font-['JetBrains_Mono'] font-bold warm-text">{worker.name}</h3>
                </div>
                <button
                  onClick={() => handleDeleteWorker(worker.id)}
                  className="p-2 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1b1b1d]/50 p-3 rounded-lg">
                  <p className="text-xs warm-text-secondary mb-1">CPU Usage</p>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 amber-accent" />
                    <span className="font-['JetBrains_Mono'] warm-text">{worker.cpu}</span>
                  </div>
                </div>
                <div className="bg-[#1b1b1d]/50 p-3 rounded-lg">
                  <p className="text-xs warm-text-secondary mb-1">Memory</p>
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 amber-accent" />
                    <span className="font-['JetBrains_Mono'] warm-text">{worker.memory}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs warm-text-secondary border-t border-gray-700/50 pt-4">
                <span className="capitalize px-2 py-1 rounded-full bg-white/5">
                  {worker.status}
                </span>
                <span>{worker.jobs} jobs processed</span>
              </div>
            </div>
          ))}

          {workers.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <Server className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">No workers registered</p>
              <p className="text-gray-600 text-sm mt-1">Add a worker to start processing jobs</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

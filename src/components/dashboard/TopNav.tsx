import { Search, Bell, User, Settings } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="h-16 panel-bg border-b border-gray-700/50 shadow-lg flex items-center justify-between px-6 z-30">
      {/* Left section - Branding */}
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <span className="font-['Space_Grotesk'] font-bold text-white text-sm">J</span>
        </div>
        <div>
          <h2 className="font-['Space_Grotesk'] font-bold text-sm warm-text">
            Jenkins Dashboard
          </h2>
          <p className="text-xs warm-text-secondary font-['JetBrains_Mono']">
            CI/CD Pipeline Manager
          </p>
        </div>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 warm-text-secondary" />
          <input
            type="text"
            placeholder="Search repositories, builds..."
            className="
              w-full pl-10 pr-4 py-2 rounded-lg
              bg-[#1b1b1d] border border-gray-700/50
              warm-text placeholder:warm-text-secondary
              focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30
              transition-all duration-200
              font-['JetBrains_Mono'] text-sm
            "
          />
        </div>
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-white/5 transition-colors relative">
          <Bell className="w-5 h-5 warm-text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
        </button>
        <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
          <Settings className="w-5 h-5 warm-text-secondary" />
        </button>
        <div className="w-px h-6 bg-gray-700/50 mx-2"></div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="font-['Space_Grotesk'] text-sm warm-text hidden md:block">
            Admin
          </span>
        </button>
      </div>
    </header>
  );
}

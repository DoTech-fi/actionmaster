import { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import MainContent from './MainContent';

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <div className="jenkins-bg min-h-screen flex">
      {/* Sidebar */}
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col lg:ml-60">
        {/* Top Navigation */}
        <TopNav />

        {/* Main Content */}
        <MainContent activeItem={activeItem} onNavigate={setActiveItem} />
      </div>
    </div>
  );
}

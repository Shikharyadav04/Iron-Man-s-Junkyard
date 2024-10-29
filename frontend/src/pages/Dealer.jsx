import React, { useState } from 'react';

const DealerPage = () => {
  const [activeTab, setActiveTab] = useState('profile'); // State to manage active tab

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 text-center border-b border-gray-700">Dealer Dashboard</h2>
        
        <nav className="flex flex-col mt-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`p-4 text-lg hover:bg-gray-700 ${
              activeTab === 'profile' ? 'bg-gray-700' : ''
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('scrap')}
            className={`p-4 text-lg hover:bg-gray-700 ${
              activeTab === 'scrap' ? 'bg-gray-700' : ''
            }`}
          >
            Scrap
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-3xl font-semibold mb-4">Profile</h2>
            <p>Dealer profile information and settings go here.</p>
          </div>
        )}
        
        {activeTab === 'scrap' && (
          <div>
            <h2 className="text-3xl font-semibold mb-4">Scrap</h2>
            <p>Manage scrap requests and transactions here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealerPage;

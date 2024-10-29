import React, { useState } from 'react';

const Customer = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [scrapPhoto, setScrapPhoto] = useState(null);

  const handlePhotoUpload = (event, setPhoto) => {
    const file = event.target.files[0];
    setPhoto(URL.createObjectURL(file));
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen flex`}>
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Customer Dashboard</h2>
        <button onClick={() => setActiveTab('profile')} className={`p-4 text-lg hover:bg-gray-700 ${activeTab === 'profile' ? 'bg-gray-700' : ''}`}>Profile</button>
        <button onClick={() => setActiveTab('scrap')} className={`p-4 text-lg hover:bg-gray-700 ${activeTab === 'scrap' ? 'bg-gray-700' : ''}`}>Scrap</button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-semibold">Profile Information</h1>

            {/* Profile Photo Upload */}
            <div className="flex items-center space-x-4">
              <label className="block">
                <span className="text-lg">Profile Photo:</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, setProfilePhoto)} />
                <div className="mt-2 w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex items-center justify-center cursor-pointer" onClick={() => document.querySelector('input[type="file"]').click()}>
                  {profilePhoto ? <img src={profilePhoto} alt="Profile" className="object-cover w-full h-full"/> : <span className="text-gray-500">Upload</span>}
                </div>
              </label>
            </div>

            {/* Profile Fields */}
            <div className="space-y-4">
              <input type="text" placeholder="Name" className="w-full p-2 rounded border dark:border-gray-700"/>
              <input type="text" placeholder="Location" className="w-full p-2 rounded border dark:border-gray-700"/>
              <input type="text" placeholder="Industry" className="w-full p-2 rounded border dark:border-gray-700"/>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Settings</h2>

              <div className="flex items-center justify-between">
                <span className="text-lg">Dark Mode</span>
                <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600"/>
              </div>

              <label className="flex items-center justify-between mt-2">
                <span className="text-lg">Language</span>
                <select className="rounded p-2 dark:bg-gray-700">
                  <option>English</option>
                  <option>Spanish</option>
                </select>
              </label>

              <label className="flex items-center justify-between mt-2">
                <span className="text-lg">Content Language</span>
                <select className="rounded p-2 dark:bg-gray-700">
                  <option>English</option>
                  <option>Spanish</option>
                </select>
              </label>

              <label className="flex items-center justify-between mt-2">
                <span className="text-lg">Autoplay Videos</span>
                <input type="checkbox" className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600"/>
              </label>

              <label className="flex items-center justify-between mt-2">
                <span className="text-lg">Sound Effects</span>
                <input type="checkbox" className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600"/>
              </label>
            </div>

            {/* Save Button */}
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg mt-6">Save</button>
          </div>
        )}

        {/* Scrap Tab */}
        {activeTab === 'scrap' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-semibold">Scrap Information</h1>

            {/* Scrap Photo Upload */}
            <label className="block">
              <span className="text-lg">Scrap Photo:</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, setScrapPhoto)} />
              <div className="mt-2 w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex items-center justify-center cursor-pointer" onClick={() => document.querySelectorAll('input[type="file"]')[1].click()}>
                {scrapPhoto ? <img src={scrapPhoto} alt="Scrap" className="object-cover w-full h-full"/> : <span className="text-gray-500">Upload Scrap</span>}
              </div>
            </label>

            {/* Scrap Details */}
            <textarea placeholder="Type of Scrap" className="w-full p-2 mt-4 rounded border dark:border-gray-700"></textarea>

            {/* Add Scrap Button */}
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-6">Add Scrap</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customer;

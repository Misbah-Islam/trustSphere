import React, { useState, useEffect } from 'react';
import { useApp } from '../context';

export const ProfileSettings = () => {
  const { theme, setTheme, donations, beneficiaries, events } = useApp();
  
  const defaultProfile = {
    name: 'TrustSphere Organization',
    email: 'contact@trustsphere.global',
    phone: '+1 (555) 019-8273',
    address: '100 Global Impact Way, Suite 400',
  };
  
  const [formData, setFormData] = useState(defaultProfile);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('trustsphere_org_profile');
    if (savedProfile) {
      try {
        setFormData(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to parse org profile.");
      }
    }
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-white');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-gray-900', 'text-white');
    }
  }, [theme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('trustsphere_org_profile', JSON.stringify(formData));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleExportData = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      organizationProfile: formData,
      donations,
      beneficiaries,
      events,
      settings: { theme }
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `trustsphere_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleClearAll = () => {
    const confirmed = window.confirm(
      "WARNING: You are about to permanently delete all donations, beneficiaries, events, and settings from this device. Are you absolutely sure?"
    );
    if (confirmed) {
      const doubleConfirmed = window.confirm("This action is completely IRREVERSIBLE. Press OK to nuke the database.");
      if (doubleConfirmed) {
        localStorage.clear();
        window.location.reload();
      }
    }
  };

  return (
    <div className={`w-full flex flex-col gap-6 animate-fade-in-up pb-10 mt-2 ${theme === 'dark' ? 'dark-mode-overrides' : ''}`}>
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-trust-blue dark:text-blue-400">System Settings</h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">Configure platform aesthetics, organization branding, and absolute data control.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Left Column: Organization Profile Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-sm transition-all duration-300">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
            <div className="p-3 bg-trust-blue/10 rounded-xl text-trust-blue">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Organization Identity</h2>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col">
                 <label className="text-sm font-semibold text-gray-700 mb-1.5">Registered Name</label>
                 <input 
                   type="text" name="name" 
                   value={formData.name} onChange={handleChange}
                   className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trust-blue outline-none transition-all font-medium bg-white text-gray-900"
                   required
                 />
              </div>

              <div className="flex flex-col">
                 <label className="text-sm font-semibold text-gray-700 mb-1.5">Corporate Email</label>
                 <input 
                   type="email" name="email" 
                   value={formData.email} onChange={handleChange}
                   className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trust-blue outline-none transition-all font-medium bg-white text-gray-900"
                   required
                 />
              </div>
            </div>

            <div className="flex flex-col">
               <label className="text-sm font-semibold text-gray-700 mb-1.5">Support Hotline / Phone</label>
               <input 
                 type="text" name="phone" 
                 value={formData.phone} onChange={handleChange}
                 className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trust-blue outline-none transition-all font-medium bg-white text-gray-900"
               />
            </div>

            <div className="flex flex-col">
               <label className="text-sm font-semibold text-gray-700 mb-1.5">Physical HQ Address</label>
               <input 
                 type="text" name="address" 
                 value={formData.address} onChange={handleChange}
                 className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-trust-blue outline-none transition-all font-medium bg-white text-gray-900"
                 placeholder="Enter full physical address for mapping..."
               />
            </div>

            <div className="pt-6 border-t border-gray-50 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
              {isSaved ? (
                <span className="text-emerald-500 font-bold flex items-center gap-2 animate-fade-in-up">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  Preferences secured logically.
                </span>
              ) : <span className="hidden sm:inline"></span>}

              <button 
                type="submit"
                className="w-full sm:w-auto bg-trust-blue text-white px-8 py-3.5 rounded-full font-extrabold hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
              >
                Save Profile Parameters
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Danger Zone & Theme controls */}
        <div className="flex flex-col gap-6">
          
          {/* Aesthetic Controls */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-sm text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Display Mechanics</h3>
            <p className="text-sm text-gray-500 mb-6">Toggle global interface lighting variables.</p>
            
            <button 
              onClick={toggleTheme}
              className={`w-full relative flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all ${theme === 'dark' ? 'bg-gray-900 text-white shadow-xl inset-ring inset-ring-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              {theme === 'dark' ? (
                <>
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-trust-gold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                  Dark Mode Online
                </>
              ) : (
                <>
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-amber-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
                  Light Mode Online
                </>
              )}
            </button>
          </div>

          {/* Database Admin Operations */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Data Operations</h3>
            <p className="text-sm text-gray-500 mb-6 pb-5 border-b border-gray-50">Local state management tools.</p>
            
            <div className="flex flex-col gap-4">
               <button 
                 onClick={handleExportData}
                 className="flex items-center justify-between w-full px-5 py-3.5 bg-blue-50 text-trust-blue rounded-xl font-bold hover:bg-blue-100 transition-colors"
               >
                 <span className="flex items-center gap-2">
                   <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                   </svg>
                   Export Database
                 </span>
                 <span className="text-xs text-gray-600 bg-white px-2 py-0.5 rounded-md shadow-sm border border-blue-100">.JSON</span>
               </button>

               <button 
                 onClick={handleClearAll}
                 className="flex items-center gap-2 w-full px-5 py-3.5 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-colors"
               >
                 <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                 </svg>
                 Clear Local Storage
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
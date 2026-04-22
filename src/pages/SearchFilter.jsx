import React, { useState, useMemo } from 'react';
import { useApp } from '../context';

export const SearchFilter = () => {
  const { donations, beneficiaries, events } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const tabs = ['All', 'Donation', 'Beneficiary', 'Event'];
  const allCategories = useMemo(() => {
    const list = new Set();
    donations.forEach(d => { if (d.campaign) list.add(d.campaign) });
    beneficiaries.forEach(b => { if (b.category) list.add(b.category) });
    return ['All', ...Array.from(list)];
  }, [donations, beneficiaries]);

  const normalizedData = useMemo(() => {
    const d = donations.map(item => ({
      ...item,
      _type: 'Donation',
      _title: item.donor || 'Anonymous',
      _primaryDetail: `$${Number(item.amount).toLocaleString()}`,
      _secondaryDetail: item.campaign,
      _searchString: `${item.donor} ${item.campaign} ${item.notes} ${item.amount}`.toLowerCase()
    }));

    const b = beneficiaries.map(item => ({
      ...item,
      _type: 'Beneficiary',
      _title: item.name,
      _primaryDetail: `${item.age} years old`,
      _secondaryDetail: item.category,
      _searchString: `${item.name} ${item.category} ${item.supportType} ${item.contact}`.toLowerCase()
    }));

    const e = events.map(item => ({
      ...item,
      _type: 'Event',
      _title: item.title,
      _primaryDetail: item.location,
      _secondaryDetail: `Cap: ${item.capacity}`,
      _searchString: `${item.title} ${item.location} ${item.description}`.toLowerCase()
    }));

    return [...d, ...b, ...e];
  }, [donations, beneficiaries, events]);

  const filteredResults = useMemo(() => {
    return normalizedData.filter(item => {
      if (searchTerm && !item._searchString.includes(searchTerm.toLowerCase())) return false;
      if (activeTab !== 'All' && item._type !== activeTab) return false;
      if (categoryFilter !== 'All') {
        const itemCategory = item.category || item.campaign;
        if (itemCategory !== categoryFilter) return false;
      }
      if (dateStart || dateEnd) {
        if (!item.date) return false;
        const itemDate = new Date(item.date).getTime();
        if (dateStart && itemDate < new Date(dateStart).getTime()) return false;
        if (dateEnd && itemDate > new Date(dateEnd).getTime()) return false;
      }
      return true;
    }).sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  }, [normalizedData, searchTerm, activeTab, categoryFilter, dateStart, dateEnd]);

  const getTypeColor = (type) => {
    switch (type) {
      case 'Donation': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Beneficiary': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Event': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Donation':
        return (
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        );
      case 'Beneficiary':
        return (
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        );
      case 'Event':
        return (
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
          </svg>
        );
      default: return null;
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActiveTab('All');
    setDateStart('');
    setDateEnd('');
    setCategoryFilter('All');
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in-up pb-10 mt-2">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-trust-blue dark:text-blue-400">Search & Discover</h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">Instantly traverse across all domains, beneficiaries, funds, and schedules.</p>
      </div>

      {/* Primary Search Bar */}
      <div className="relative w-full shadow-lg rounded-2xl group transition-all">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-trust-blue">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for names, campaigns, locations or support specifics..."
          className="w-full pl-12 sm:pl-14 pr-6 py-4 sm:py-5 rounded-2xl border-none outline-none ring-2 ring-transparent focus:ring-trust-blue bg-white text-gray-900 text-base sm:text-lg font-medium placeholder-gray-400 transition-all"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Advanced Filters Layout */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 sm:gap-6">
        
        {/* Dynamic Type Tab Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-trust-blue focus:ring-offset-1 ${activeTab === tab 
                ? 'bg-trust-blue text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {tab === 'All' ? 'Everything' : `${tab}s`}
            </button>
          ))}
        </div>

        <div className="h-px bg-gray-100 w-full"></div>

        {/* Form Inputs for Sub-Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Attached Category</label>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-trust-blue outline-none transition-all appearance-none bg-white font-medium text-gray-700"
            >
              {allCategories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'Any Category / Area' : cat}</option>)}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Limit After Date</label>
            <input 
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-trust-blue outline-none transition-all bg-white text-gray-700 font-medium"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Limit Before Date</label>
            <input 
              type="date"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-trust-blue outline-none transition-all bg-white text-gray-700 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-2">
        <h3 className="text-lg font-bold text-black dark:text-white">
          Showing {filteredResults.length} Result{filteredResults.length !== 1 ? 's' : ''}
        </h3>
        {(searchTerm || activeTab !== 'All' || dateStart || dateEnd || categoryFilter !== 'All') && (
          <button 
            onClick={clearFilters}
            className="text-sm font-bold text-black dark:text-white hover:text-blue-800 transition"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Results Grid */}
      {filteredResults.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-16 text-center shadow-sm flex flex-col items-center">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 mb-4 text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <p className="text-base sm:text-lg font-bold text-gray-700">No matches found</p>
          <p className="text-xs sm:text-sm text-gray-500">We couldn't find anything mapping to that criteria. Try adjusting your parameters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredResults.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col relative group">
              
              <div className="flex items-start justify-between mb-4">
                 <div className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 border ${getTypeColor(item._type)}`}>
                   {getIcon(item._type)} {item._type}
                 </div>
                 {item.date && (
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                 )}
              </div>
              
              <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight mb-2 group-hover:text-trust-blue transition-colors">
                {item._title}
              </h3>
              
              <div className="flex items-center justify-between text-[10px] sm:text-xs mt-auto pt-4 border-t border-gray-50">
                 <span className="font-semibold text-gray-700 truncate mr-2">{item._primaryDetail}</span>
                 <span className="font-medium text-gray-400 truncate">{item._secondaryDetail}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
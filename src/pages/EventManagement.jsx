import React, { useState } from 'react';
import { useApp } from '../context';

export const EventManagement = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useApp();
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form state
  const initialForm = { 
    title: '', 
    date: new Date().toISOString().split('T')[0], 
    time: '12:00', 
    location: '', 
    description: '',
    capacity: ''
  };
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingId(event.id);
    setFormData({ 
      title: event.title || '', 
      date: event.date || new Date().toISOString().split('T')[0], 
      time: event.time || '12:00', 
      location: event.location || '', 
      description: event.description || '',
      capacity: event.capacity || ''
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Event title is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.capacity || Number(formData.capacity) <= 0) newErrors.capacity = "Capacity must be a positive number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingId) {
      updateEvent(editingId, { ...formData, capacity: Number(formData.capacity) });
    } else {
      addEvent({ ...formData, capacity: Number(formData.capacity) });
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to cancel and delete this event? This action is permanent.")) {
      deleteEvent(id);
    }
  };

  // Status Logic
  const getEventStatus = (event) => {
    const now = new Date();
    const eventTimeStr = event.time ? event.time : '00:00';
    const eventDateTime = new Date(`${event.date}T${eventTimeStr}`);
    
    if(isNaN(eventDateTime.getTime())) {
       const rawDate = new Date(event.date);
       if (rawDate.toDateString() === now.toDateString()) return 'Ongoing';
       return rawDate > now ? 'Upcoming' : 'Completed';
    }

    const isToday = now.toDateString() === eventDateTime.toDateString();
    
    if (isToday) return 'Ongoing';
    if (now < eventDateTime) return 'Upcoming';
    return 'Completed';
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Ongoing':
        return <span className="px-3 py-1 bg-trust-gold text-trust-blue rounded-full text-xs font-black tracking-widest uppercase shadow-sm">Ongoing</span>;
      case 'Upcoming':
        return <span className="px-3 py-1 bg-trust-blue text-white rounded-full text-xs font-black tracking-widest uppercase shadow-sm">Upcoming</span>;
      case 'Completed':
        return <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 rounded-full text-xs font-black tracking-widest uppercase shadow-sm">Completed</span>;
      default:
        return null;
    }
  };

  // Split logic
  const eventsWithStatus = events.map(e => ({ ...e, computedStatus: getEventStatus(e) }));
  
  const activeEvents = eventsWithStatus
     .filter(e => e.computedStatus === 'Ongoing' || e.computedStatus === 'Upcoming')
     .sort((a, b) => new Date(a.date) - new Date(b.date));
     
  const pastEvents = eventsWithStatus
     .filter(e => e.computedStatus === 'Completed')
     .sort((a, b) => new Date(b.date) - new Date(a.date));

  const renderEventList = (eventList, noDataMessage) => {
     if (eventList.length === 0) {
        return (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500 col-span-full">
            {noDataMessage}
          </div>
        );
     }

     return eventList.map((event) => (
        <div key={event.id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow p-4 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-6 relative overflow-hidden group">
           
           {/* Left Date Ribbon */}
           <div className="md:w-32 shrink-0 flex flex-row md:flex-col items-center justify-between md:justify-center p-3 sm:p-4 bg-blue-50/50 rounded-xl border border-blue-50/50 text-trust-blue group-hover:bg-trust-blue group-hover:text-white transition-colors duration-300">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
              <span className="text-3xl sm:text-4xl font-black mt-0 md:mt-1 leading-none">{new Date(event.date).getDate()}</span>
              <span className="text-[10px] sm:text-xs font-semibold mt-0 md:mt-2 opacity-80">{new Date(event.date).getFullYear()}</span>
           </div>

           {/* Center Body */}
           <div className="flex-grow flex flex-col justify-center">
              <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2">
                 <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">{event.title}</h3>
                 <div className="shrink-0">{getStatusBadge(event.computedStatus)}</div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-4">
                 <div className="flex items-center text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 gap-2">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {event.time}
                 </div>
                 <div className="flex items-center text-xs sm:text-sm font-semibold text-gray-500 gap-2">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                    Capacity: {event.capacity}
                 </div>
                 <div className="flex items-center text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 gap-2 sm:col-span-2">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {event.location}
                 </div>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 md:line-clamp-none bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 italic">
                 {event.description || "No description provided."}
              </p>
           </div>

           {/* Right Actions */}
           <div className="md:w-32 shrink-0 flex flex-row md:flex-col items-center justify-center gap-2 sm:gap-3 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700 pt-3 md:pt-0 pl-0 md:pl-6">
              <button 
                onClick={() => openEditModal(event)}
                className="flex-1 w-full bg-blue-50 dark:bg-blue-900/30 text-trust-blue dark:text-blue-400 px-4 md:px-0 py-2 rounded-lg font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors flex justify-center items-center gap-2 text-sm"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(event.id)}
                className="flex-1 w-full bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 px-4 md:px-0 py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-colors flex justify-center items-center gap-2 text-sm"
              >
                Delete
              </button>
           </div>
        </div>
     ));
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in-up pb-10 mt-2">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-trust-blue dark:text-blue-400">Event Management</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">Organize upcoming galas, coordinate drives, and review past outreach.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-trust-blue text-white px-6 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors shadow-md flex items-center justify-center gap-2 w-full md:w-max"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create Event
        </button>
      </div>

      {/* Analytics Summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4">
         <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm border-l-4 border-l-trust-blue">
           <p className="text-[10px] sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest truncate">Active Events</p>
           <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">{activeEvents.length}</p>
         </div>
         <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm border-l-4 border-l-gray-300 dark:border-l-gray-600">
           <p className="text-[10px] sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest truncate">Completed</p>
           <p className="text-2xl sm:text-3xl font-black text-gray-400 dark:text-gray-500 mt-1">{pastEvents.length}</p>
         </div>
      </div>

      {/* Upcoming Section */}
      <div>
         <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-trust-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
            Active & Upcoming Events
         </h2>
         <div className="flex flex-col gap-4">
            {renderEventList(activeEvents, "No upcoming events scheduled.")}
         </div>
      </div>

      {/* Past Section */}
      <div className="mt-6 opacity-80 hover:opacity-100 transition-opacity">
         <h2 className="text-xl font-bold text-gray-400 mb-4 flex items-center gap-2">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Completed Events History
         </h2>
         <div className="flex flex-col gap-4">
            {renderEventList(pastEvents, "No completed events in the historical ledger.")}
         </div>
      </div>

      {/* Form Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in-up" style={{animationDuration: '0.2s'}}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? 'Modify Strategy Event' : 'Create Strategy Event'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 transition">
                 <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                 </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow">
              <div className="space-y-5">
                
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Event Title *</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white text-gray-900 ${errors.title ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-trust-blue'} outline-none focus:ring-2 transition-all`}
                    placeholder="e.g. Annual Charity Gala"
                  />
                  {errors.title && <p className="text-red-500 text-xs font-semibold mt-1">{errors.title}</p>}
                </div>

                {/* Date & Time row */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Scheduled Date *</label>
                    <input 
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-gray-900 ${errors.date ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-trust-blue'} outline-none focus:ring-2 transition-all`}
                    />
                    {errors.date && <p className="text-red-500 text-xs font-semibold mt-1">{errors.date}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Scheduled Time *</label>
                    <input 
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-trust-blue outline-none focus:ring-2 transition-all"
                    />
                  </div>
                </div>

                {/* Location & Capacity Row */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <div className="flex-[2]">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Venue Location *</label>
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-gray-900 ${errors.location ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-trust-blue'} outline-none focus:ring-2 transition-all`}
                      placeholder="e.g. Community Center, Room B"
                    />
                    {errors.location && <p className="text-red-500 text-xs font-semibold mt-1">{errors.location}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Headcount Limit *</label>
                    <input 
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-gray-900 ${errors.capacity ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-trust-blue'} outline-none focus:ring-2 transition-all`}
                      placeholder="e.g. 150"
                    />
                    {errors.capacity && <p className="text-red-500 text-xs font-semibold mt-1">{errors.capacity}</p>}
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mission Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-trust-blue outline-none focus:ring-2 transition-all"
                    placeholder="Provide overview of the event..."
                  ></textarea>
                </div>

              </div>
            </form>
            
            {/* Modal Footer Actions */}
            <div className="px-6 py-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 border-t border-gray-100 bg-gray-50/50 shrink-0">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit} 
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full font-bold text-trust-blue bg-trust-gold hover:bg-yellow-400 transition-colors shadow-md hover:shadow-lg"
                >
                  {editingId ? 'Modify Parameters' : 'Deploy Event Registration'}
                </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
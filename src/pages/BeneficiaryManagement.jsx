import React, { useState } from 'react';
import { useApp } from '../context';

export const BeneficiaryManagement = () => {
  const { beneficiaries, addBeneficiary, updateBeneficiary, deleteBeneficiary } = useApp();
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form state
  const initialForm = { 
    name: '', 
    age: '', 
    category: 'Education', 
    supportType: '', 
    contact: '',
    status: 'Active'
  };
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const categories = ["Education", "Health", "Food", "Shelter"];
  const statuses = ["Active", "Inactive"];

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (beneficiary) => {
    setEditingId(beneficiary.id);
    setFormData({ 
      name: beneficiary.name || '', 
      age: beneficiary.age || '', 
      category: beneficiary.category || 'Education', 
      supportType: beneficiary.supportType || '', 
      contact: beneficiary.contact || '',
      status: beneficiary.status || 'Active'
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
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age || Number(formData.age) <= 0) newErrors.age = "Valid age is required";
    if (!formData.supportType.trim()) newErrors.supportType = "Support type is required";
    if (!formData.contact.trim()) newErrors.contact = "Contact information is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingId) {
      updateBeneficiary(editingId, { ...formData, age: Number(formData.age) });
    } else {
      addBeneficiary({ ...formData, age: Number(formData.age) });
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this beneficiary? This cannot be undone.")) {
      deleteBeneficiary(id);
    }
  };

  // Helper for category colors
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Education': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
      case 'Health': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800';
      case 'Food': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800';
      case 'Shelter': return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const activeCount = beneficiaries.filter(b => b.status === "Active").length;

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in-up pb-10 mt-2">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-trust-blue dark:text-blue-400">Beneficiary Management</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">Manage profiles, categorize support, and track aid recipients.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-trust-blue text-white px-6 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors shadow-md flex items-center justify-center gap-2 w-full md:w-max"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Register Beneficiary
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-2">
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm border-l-4 border-l-trust-blue">
           <p className="text-[10px] sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest truncate">Total Registered</p>
           <p className="text-2xl sm:text-3xl font-black text-gray-900  mt-1">{beneficiaries.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm border-l-4 border-l-emerald-500">
           <p className="text-[10px] sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest truncate">Currently Active</p>
           <p className="text-2xl sm:text-3xl font-black text-gray-900  mt-1">{activeCount}</p>
        </div>
      </div>

      {/* Beneficiaries Grid View */}
      {beneficiaries.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-12 text-center text-gray-500 dark:text-gray-400 shadow-sm">
          No beneficiaries found. Click "Register Beneficiary" to begin storing profile details.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...beneficiaries].reverse().map((beneficiary) => (
            <div key={beneficiary.id} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg dark:hover:shadow-black/50 transition-all duration-300 overflow-hidden flex flex-col relative group">
              
              {/* Card Header & Ribbon */}
              <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-50 dark:border-gray-700 flex items-start justify-between bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative">
                {/* Active/Inactive Badge */}
                <div className={`absolute top-0 right-0 -mr-1 -mt-1 px-3 sm:px-4 py-1.5 rounded-bl-xl rounded-tr-xl font-bold text-[10px] tracking-wider uppercase shadow-sm ${beneficiary.status === 'Inactive' ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-600' : 'bg-emerald-500 text-white'}`}>
                  {beneficiary.status}
                </div>

                <div className="flex items-center gap-3 sm:gap-4 mt-2">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-trust-gold/20 text-trust-gold flex items-center justify-center font-bold text-lg sm:text-xl shrink-0 shadow-inner">
                    {beneficiary.name ? beneficiary.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 dark:text-white text-base sm:text-lg leading-tight">{beneficiary.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">{beneficiary.age} years old</p>
                  </div>
                </div>
              </div>

              {/* Card Body Components */}
              <div className="px-4 sm:px-6 py-4 sm:py-5 flex-grow space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl">
                  <span className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Category</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border ${getCategoryColor(beneficiary.category)}`}>
                    {beneficiary.category}
                  </span>
                </div>
                
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Support Type</p>
                  <p className="text-gray-700 dark:text-gray-200 font-medium bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-2 rounded-lg text-xs sm:text-sm">{beneficiary.supportType}</p>
                </div>
                
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Contact Info</p>
                  <p className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm flex items-center gap-2">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-trust-gold">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.069-3.936-6.181-5.713l1.082-1.084c.37-.37.49-.9.34-1.39l-1.07-4.417C8.5 2.5 8.05 2.05 7.5 2.25H3a2.25 2.25 0 0 0-2.25 2.25Z" />
                    </svg>
                    {beneficiary.contact}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800 group-hover:bg-gray-50/50 dark:group-hover:bg-gray-700/30 transition-colors">
                <button 
                  onClick={() => openEditModal(beneficiary)}
                  className="font-bold text-sm text-trust-blue dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-2 transition"
                >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                  </svg>
                  Edit Data
                </button>
                <button 
                  onClick={() => handleDelete(beneficiary.id)}
                  className="p-2 text-red-400 hover:text-white hover:bg-red-500 rounded-lg transition-colors"
                  title="Remove Beneficiary"
                >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in-up" style={{animationDuration: '0.2s'}}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? 'Update Beneficiary Profile' : 'Register New Beneficiary'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 transition">
                 <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                 </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                
                {/* Status & Category row */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Status *</label>
                    <select 
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-trust-blue focus:border-trust-blue outline-none transition-all appearance-none font-semibold"
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category Area *</label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-trust-blue focus:border-trust-blue outline-none transition-all appearance-none font-semibold"
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Name & Age row */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <div className="flex-[2]">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-gray-900 ${errors.name ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-trust-blue'} outline-none focus:ring-2 transition-all`}
                      placeholder="e.g. Jane Smith"
                    />
                    {errors.name && <p className="text-red-500 text-xs font-semibold mt-1">{errors.name}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Age *</label>
                    <input 
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-gray-900 ${errors.age ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-trust-blue'} outline-none focus:ring-2 transition-all`}
                      placeholder="e.g. 34"
                    />
                    {errors.age && <p className="text-red-500 text-xs font-semibold mt-1">{errors.age}</p>}
                  </div>
                </div>

                {/* Support Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Support Provided *</label>
                  <input 
                    type="text" 
                    name="supportType"
                    value={formData.supportType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white text-gray-900 ${errors.supportType ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-trust-blue'} outline-none focus:ring-2 transition-all`}
                    placeholder="e.g. Monthly Stipend, Medical Bills"
                  />
                  {errors.supportType && <p className="text-red-500 text-xs font-semibold mt-1">{errors.supportType}</p>}
                </div>
                
                {/* Contact */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Details *</label>
                  <input 
                    type="text" 
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white text-gray-900 ${errors.contact ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-trust-blue'} outline-none focus:ring-2 transition-all`}
                    placeholder="Phone number, email, or physical address layout"
                  />
                  {errors.contact && <p className="text-red-500 text-xs font-semibold mt-1">{errors.contact}</p>}
                </div>

              </div>

              {/* Form Actions */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full font-bold text-trust-blue bg-trust-gold hover:bg-yellow-400 transition-colors shadow-md hover:shadow-lg"
                >
                  {editingId ? 'Save Profile Data' : 'Register Beneficiary'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
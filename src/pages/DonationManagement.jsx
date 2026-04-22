import React, { useState } from 'react';
import { useApp } from '../context';

export const DonationManagement = () => {
  const { donations, addDonation, updateDonation, deleteDonation } = useApp();
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form state
  const initialForm = { 
    donor: '', 
    amount: '', 
    campaign: 'General Fund', 
    date: new Date().toISOString().split('T')[0], 
    notes: '' 
  };
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const purposes = ["General Fund", "Winter Relief", "Education Fund", "Housing Support", "Emergency Aid", "Food Drive"];

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (donation) => {
    setEditingId(donation.id);
    setFormData({ 
      donor: donation.donor || '', 
      amount: donation.amount || '', 
      campaign: donation.campaign || 'General Fund', 
      date: donation.date || new Date().toISOString().split('T')[0], 
      notes: donation.notes || '' 
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
    if (!formData.donor.trim()) newErrors.donor = "Donor name is required";
    if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = "Amount must be a positive number";
    if (!formData.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingId) {
      updateDonation(editingId, { ...formData, amount: Number(formData.amount) });
    } else {
      addDonation({ ...formData, amount: Number(formData.amount) });
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this donation record? This action cannot be undone.")) {
      deleteDonation(id);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in-up pb-10 mt-2">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-trust-blue dark:text-blue-400">Donation Management</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">Track, modify, and audit all incoming contributions.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-trust-blue text-white px-6 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors shadow-md flex items-center justify-center gap-2 w-full md:w-max"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Record Donation
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white  p-4 sm:p-5 rounded-2xl border border-gray-100  shadow-sm border-l-4 border-l-trust-gold">
           <p className="text-[10px] sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest truncate">Total Records</p>
           <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-black mt-1">{donations.length}</p>
        </div>
        <div className="bg-white  p-4 sm:p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm border-l-4 border-l-emerald-500">
           <p className="text-[10px] sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest truncate">Total Sum</p>
           <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-bback mt-1 truncate">
             ${donations.reduce((sum, d) => sum + Number(d.amount || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-gray-900/50 text-gray-500  text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold border-b border-gray-100 dark:border-gray-700">Donor</th>
                <th className="px-6 py-4 font-semibold border-b border-gray-100 dark:border-gray-700">Amount</th>
                <th className="px-6 py-4 font-semibold border-b border-gray-100 dark:border-gray-700">Purpose</th>
                <th className="px-6 py-4 font-semibold border-b border-gray-100 dark:border-gray-700">Date Logged</th>
                <th className="px-6 py-4 font-semibold border-b border-gray-100 dark:border-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {donations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400 bg-gray-50/20 dark:bg-gray-900/20 font-medium">
                    No donation records available. Click "Record Donation" to add your first entry.
                  </td>
                </tr>
              ) : (
                [...donations].reverse().map((donation) => (
                  <tr key={donation.id} className="hover:bg-blue-50/30 dark:hover:bg-gray-200/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-trust-blue/10 dark:bg-blue-900/30 text-trust-blue dark:text-blue-400 flex items-center justify-center font-bold text-sm mr-4 border border-trust-blue/20 dark:border-blue-800/50">
                          {donation.donor ? donation.donor.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 ">{donation.donor}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">{donation.notes || "No notes attached"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                      ${Number(donation.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 shadow-sm">
                        {donation.campaign || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                      {donation.date ? new Date(donation.date).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(donation)}
                          className="p-2 text-trust-blue  bg-blue-50  rounded-lg hover:bg-blue-100 transition-colors"
                          title="Edit"
                        >
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(donation.id)}
                          className="p-2 text-red-600  bg-red-50  rounded-lg hover:bg-red-100 transition-colors"
                          title="Delete"
                        >
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in-up" style={{animationDuration: '0.2s'}}>
          <div className="bg-white  rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 ">
            <div className="px-6 py-4 border-b border-gray-100  flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
              <h2 className="text-xl font-bold text-gray-800 ">
                {editingId ? 'Edit Donation Record' : 'Record New Donation'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition">
                 <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                 </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                {/* Donor Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 -300 mb-1">Donor Name *</label>
                  <input 
                    type="text" 
                    name="donor"
                    value={formData.donor}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white  text-gray-900  ${errors.donor ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-trust-blue focus:border-trust-blue dark:focus:border-blue-400'} focus:ring-2 focus:outline-none transition-all`}
                    placeholder="E.g., John Doe"
                  />
                  {errors.donor && <p className="text-red-500 text-xs font-semibold mt-1">{errors.donor}</p>}
                </div>
                
                {/* Amount & Date row */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700  mb-1">Amount ($) *</label>
                    <input 
                      type="number"
                      step="0.01" 
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white  text-gray-900  ${errors.amount ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-trust-blue focus:border-trust-blue'} focus:ring-2 focus:outline-none transition-all`}
                      placeholder="0.00"
                    />
                    {errors.amount && <p className="text-red-500 text-xs font-semibold mt-1">{errors.amount}</p>}
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700  mb-1">Date *</label>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white  text-gray-900  ${errors.date ? 'border-red-400 focus:ring-red-500' : 'border-gray-300  focus:ring-trust-blue focus:border-trust-blue'} focus:ring-2 focus:outline-none transition-all`}
                    />
                    {errors.date && <p className="text-red-500 text-xs font-semibold mt-1">{errors.date}</p>}
                  </div>
                </div>

                {/* Purpose Dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700  mb-1">Purpose / Campaign *</label>
                  <select 
                    name="campaign"
                    value={formData.campaign}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300  bg-white  text-gray-900  focus:ring-2 focus:ring-trust-blue focus:border-trust-blue focus:outline-none transition-all appearance-none"
                  >
                    {purposes.map(purpose => (
                      <option key={purpose} value={purpose}>{purpose}</option>
                    ))}
                  </select>
                </div>
                
                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700  mb-1">Additional Notes</label>
                  <textarea 
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white  text-gray-900  focus:ring-2 focus:ring-trust-blue focus:border-trust-blue focus:outline-none transition-all"
                    placeholder="Any specific requests or tags..."
                  ></textarea>
                </div>
              </div>

              {/* Form Actions */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-gray-100 ">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full font-bold text-gray-600 dark:text-gray-300 bg-gray-100  hover:bg-gray-200  transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full font-bold text-trust-blue bg-trust-gold hover:bg-yellow-400 transition-colors shadow-md hover:shadow-lg"
                >
                  {editingId ? 'Save Changes' : 'Record Donation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

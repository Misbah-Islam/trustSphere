import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // State initialization
  const [donations, setDonations] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [events, setEvents] = useState([]);
  const [theme, setTheme] = useState('light');

  // Load from localStorage on app start
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('trustsphere_theme');
      const storedDonations = localStorage.getItem('trustsphere_donations');
      const storedBeneficiaries = localStorage.getItem('trustsphere_beneficiaries');
      const storedEvents = localStorage.getItem('trustsphere_events');

      if (storedTheme) setTheme(storedTheme);
      if (storedDonations) setDonations(JSON.parse(storedDonations));
      if (storedBeneficiaries) setBeneficiaries(JSON.parse(storedBeneficiaries));
      if (storedEvents) setEvents(JSON.parse(storedEvents));
    } catch (e) {
      console.error("Failed to parse local storage state", e);
    }
  }, []);

  // Sync state to localStorage on every change
  useEffect(() => {
    localStorage.setItem('trustsphere_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('trustsphere_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('trustsphere_beneficiaries', JSON.stringify(beneficiaries));
  }, [beneficiaries]);

  useEffect(() => {
    localStorage.setItem('trustsphere_events', JSON.stringify(events));
  }, [events]);

  // Helper ID generator
  const generateId = () => crypto.randomUUID ? crypto.randomUUID() : Date.now().toString() + Math.random().toString(36).substring(2, 9);

  // CRUD for Donations
  const addDonation = (donation) => {
    setDonations(prev => [...prev, { ...donation, id: generateId() }]);
  };
  const updateDonation = (id, updatedData) => {
    setDonations(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
  };
  const deleteDonation = (id) => {
    setDonations(prev => prev.filter(item => item.id !== id));
  };

  // CRUD for Beneficiaries
  const addBeneficiary = (beneficiary) => {
    setBeneficiaries(prev => [...prev, { ...beneficiary, id: generateId() }]);
  };
  const updateBeneficiary = (id, updatedData) => {
    setBeneficiaries(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
  };
  const deleteBeneficiary = (id) => {
    setBeneficiaries(prev => prev.filter(item => item.id !== id));
  };

  // CRUD for Events
  const addEvent = (eventData) => {
    setEvents(prev => [...prev, { ...eventData, id: generateId() }]);
  };
  const updateEvent = (id, updatedData) => {
    setEvents(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
  };
  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(item => item.id !== id));
  };

  const value = {
    theme, setTheme,
    donations, addDonation, updateDonation, deleteDonation,
    beneficiaries, addBeneficiary, updateBeneficiary, deleteBeneficiary,
    events, addEvent, updateEvent, deleteEvent
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

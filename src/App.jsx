import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context';
import { Navbar } from './components';
import { useApp } from './context';
import {
  LandingPage,
  Dashboard,
  DonationManagement,
  BeneficiaryManagement,
  EventManagement,
  SearchFilter,
  ProfileSettings,
} from './pages';

const AppContent = () => {
  const { theme } = useApp();
  
  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col font-sans transition-colors duration-300 ${theme === 'dark' ? 'dark bg-gray-900 text-white' : ''}`}>
      <Navbar />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/donations" element={<DonationManagement />} />
          <Route path="/beneficiaries" element={<BeneficiaryManagement />} />
          <Route path="/events" element={<EventManagement />} />
          <Route path="/search" element={<SearchFilter />} />
          <Route path="/settings" element={<ProfileSettings />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;

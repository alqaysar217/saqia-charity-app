import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import SplashScreen from './components/SplashScreen';
import Layout from './components/Layout';

// Pages
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import DonationSelect from './pages/donation/DonationSelect';
import DonationMosque from './pages/donation/DonationMosque';
import DonationPayment from './pages/donation/DonationPayment';
import DonationConfirm from './pages/donation/DonationConfirm';
import Profile from './pages/Profile';
import MyDonations from './pages/MyDonations';
import Notifications from './pages/Notifications';
import Campaigns from './pages/Campaigns';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (hasVisited) {
      setIsFirstVisit(false);
    }

    return () => clearTimeout(timer);
  }, []);

  // After splash screen, determine where to redirect
  if (isLoading) {
    return <SplashScreen />;
  }

  // Show onboarding for first time visitors
  if (isFirstVisit && location.pathname === '/') {
    return <Onboarding onComplete={() => {
      localStorage.setItem('hasVisitedBefore', 'true');
      setIsFirstVisit(false);
    }} />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/onboarding" element={<Onboarding onComplete={() => {
          localStorage.setItem('hasVisitedBefore', 'true');
          setIsFirstVisit(false);
        }} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Main app routes with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="donations" element={<MyDonations />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="profile" element={<Profile />} />
          
          {/* Donation flow */}
          <Route path="donate">
            <Route path="select" element={<DonationSelect />} />
            <Route path="mosque" element={<DonationMosque />} />
            <Route path="payment" element={<DonationPayment />} />
            <Route path="confirm" element={<DonationConfirm />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container-app pb-20">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;
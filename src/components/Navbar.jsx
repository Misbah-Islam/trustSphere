import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useApp } from "../context";

export const Navbar = () => {
  const { theme, setTheme } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const linkBaseClass =
    "px-3 py-2 rounded-lg font-bold text-sm transition-all duration-200 tracking-wide";
  const mobileLinkBaseClass =
    "block w-full text-left px-4 py-3 rounded-xl font-bold text-lg transition-all duration-200";

  const getSytles = ({ isActive }) =>
    isActive
      ? `${linkBaseClass} bg-trust-blue text-white shadow-md active-nav-link`
      : `${linkBaseClass} text-gray-600 dark:text-gray-300 hover:bg-blue-50/80 dark:hover:bg-gray-800 hover:text-trust-blue dark:hover:text-amber-500`;

  const getMobileStyles = ({ isActive }) =>
    isActive
      ? `${mobileLinkBaseClass} bg-trust-blue text-white shadow-md`
      : `${mobileLinkBaseClass} text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800`;

  const links = [
    { to: "/", label: "Home", exact: true },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/donations", label: "Donations" },
    { to: "/beneficiaries", label: "Beneficiaries" },
    { to: "/events", label: "Events" },
    { to: "/search", label: "Search" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-tr from-trust-blue to-blue-500 rounded-xl flex items-center justify-center shadow-md animate-pulse-slow shrink-0">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="white"
                className="w-4 h-4 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            </div>
            <NavLink
              to="/"
              className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white group"
            >
              Trust
              <span className="text-trust-blue dark:text-yellow-400 group-hover:text-amber-500 transition-colors">
                Sphere
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex md:items-center md:space-x-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={getSytles}
                end={link.exact}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

            {/* Desktop Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-trust-blue hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors shadow-sm border border-transparent hover:border-blue-100 dark:hover:border-gray-700"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-trust-gold"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-inner"
            >
              {theme === "dark" ? (
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-trust-gold"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              )}
            </button>

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl text-trust-blue dark:text-white bg-blue-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-trust-blue transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-xl animate-fade-in-up"
          style={{ animationDuration: "0.2s" }}
        >
          <div className="px-4 py-6 space-y-3 bg-gray-50/50 dark:bg-gray-800/50">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={getMobileStyles}
                end={link.exact}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

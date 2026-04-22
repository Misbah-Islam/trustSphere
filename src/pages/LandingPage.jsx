import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  const features = [
    {
      title: "Donations",
      description: "Secure, transparent, and effortlessly track every cent of incoming contributions from anywhere.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      )
    },
    {
      title: "Beneficiaries",
      description: "Deliver real-time aid and maintain holistic views of those receiving your organization's support.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
      )
    },
    {
      title: "Events",
      description: "Host impactful fundraising galas, community drives, and impactful charity events at scale.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      )
    },
    {
      title: "Volunteers",
      description: "Mobilize your workforce, schedule assignments, and amplify the impact of community heroes.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-10 w-full pb-10">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-trust-blue rounded-[2.5rem] shadow-2xl animate-fade-in-up mt-4">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 opacity-10">
           <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
             <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </div>
        
        {/* Glowing aura effect */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-trust-gold blur-[120px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-400 blur-[100px] opacity-10"></div>

        <div className="relative z-10 px-4 sm:px-6 py-16 sm:py-24 md:py-32 text-center flex flex-col items-center justify-center">
          <div className="inline-block px-5 py-2 rounded-full border border-trust-gold/30 bg-trust-gold/10 backdrop-blur-md mb-8">
            <span className="text-trust-gold font-bold tracking-widest text-xs uppercase">Welcome to TrustSphere</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight max-w-5xl">
            Empowering Communities, <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-trust-gold to-yellow-300 drop-shadow-sm">Building Trust</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mb-12 font-light leading-relaxed">
            A comprehensive, all-in-one platform engineered to seamlessly coordinate charitable operations, maximize transparency, and amplify your organization's impact.
          </p>
          
          <Link 
            to="/dashboard" 
            className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-10 sm:py-5 font-bold text-trust-blue bg-trust-gold rounded-full transition-all duration-300 hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(240,165,0,0.4)] hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
              Access Dashboard 
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-1.5 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* Feature Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        {features.map((feature, idx) => (
          <div 
            key={idx} 
            className="group relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl dark:hover:shadow-black/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            {/* Hover splash effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-trust-gold/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-[2] opacity-0 group-hover:opacity-100"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-slate-50 dark:bg-gray-900 flex items-center justify-center mb-6 group-hover:bg-trust-blue transition-colors duration-500 shadow-sm border border-slate-100 dark:border-gray-700">
                {React.cloneElement(feature.icon, { className: "w-6 h-6 sm:w-8 sm:h-8 text-trust-blue group-hover:text-trust-gold transition-colors duration-500" })}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-trust-blue transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbar bg-primary text-primary-content shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl font-bold">Portfolio</a>
        </div>
        
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal gap-2">
            <li><a className="btn btn-ghost rounded-btn">Home</a></li>
            <li><a className="btn btn-ghost rounded-btn">About</a></li>
            <li><a className="btn btn-ghost rounded-btn">Projects</a></li>
            <li><a className="btn btn-ghost rounded-btn">Contact</a></li>
          </ul>
        </div>

        <div className="flex-none lg:hidden">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                 className="inline-block w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-primary lg:hidden">
          <ul className="menu menu-vertical px-4 py-3">
            <li><a className="btn btn-ghost justify-start">Home</a></li>
            <li><a className="btn btn-ghost justify-start">About</a></li>
            <li><a className="btn btn-ghost justify-start">Projects</a></li>
            <li><a className="btn btn-ghost justify-start">Contact</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;


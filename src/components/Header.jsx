import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logoImage from '../IMG/urgence_oqtf_logo.webp'

export default function Header({ onOpenPopup }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false)
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false)
  const [closeTimer, setCloseTimer] = useState(null)
  const [locationCloseTimer, setLocationCloseTimer] = useState(null)

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleMouseEnter = () => {
    if (closeTimer) {
      clearTimeout(closeTimer)
      setCloseTimer(null)
    }
    setIsServicesMenuOpen(true)
  }

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setIsServicesMenuOpen(false)
    }, 150)
    setCloseTimer(timer)
  }

  const handleLocationMouseEnter = () => {
    if (locationCloseTimer) {
      clearTimeout(locationCloseTimer)
      setLocationCloseTimer(null)
    }
    setIsLocationMenuOpen(true)
  }

  const handleLocationMouseLeave = () => {
    const timer = setTimeout(() => {
      setIsLocationMenuOpen(false)
    }, 150)
    setLocationCloseTimer(timer)
  }

  return (
    <>
      <header className="bg-white shadow-2xl fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img 
                  src={logoImage} 
                  alt="URGENCE OQTF" 
                  className="h-10 sm:h-12 w-auto"
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 font-['Poppins']">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </Link>
              
              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center">
                  Nos services
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Desktop Services Dropdown */}
                {isServicesMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link to="/oqtf-simple" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      OQTF Simple
                    </Link>
                    <Link to="/oqtf-assignation" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      OQTF avec assignation à résidence
                    </Link>
                    <Link to="/oqtf-placement" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      OQTF avec placement en rétention
                    </Link>
                    <Link to="/irtf" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      IRTF (Interdiction de retour)
                    </Link>
                  </div>
                )}
              </div>
              
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                À propos
              </Link>
              
              {/* Location Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleLocationMouseEnter}
                onMouseLeave={handleLocationMouseLeave}
              >
                <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center">
                  Où nous rencontrer ?
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Desktop Location Dropdown */}
                {isLocationMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link to="/paris" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Paris
                    </Link>
                    <Link to="/nice" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Nice
                    </Link>
                  </div>
                )}
              </div>
              
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Blog
              </Link>
            </nav>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Email Button */}
              <button 
                onClick={onOpenPopup}
                className="bg-[#12255D] hover:bg-[#0f1d4d] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                title="Nous contacter par email"
              >
                <i className="bx bx-envelope text-lg sm:text-xl"></i>
              </button>
              
              {/* Phone Button - Desktop */}
              <button 
                onClick={() => window.location.href = 'tel:0184748720'}
                className="hidden md:flex bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-medium transition-colors items-center font-['Poppins'] text-sm"
                title="Appeler le 01 84 74 87 20"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                01 84 74 87 20
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu mobile"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden fixed top-16 sm:top-20 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out z-40 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <nav className="max-w-7xl mx-auto px-4 py-4 font-['Poppins'] overflow-y-auto max-h-[calc(100vh-5rem)]">
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 px-3 py-3 rounded-md"
              >
                <i className="bx bx-home text-xl mr-3"></i>
                Home
              </Link>
              
              {/* Mobile Services Menu */}
              <div className="mt-2">
                <button 
                  className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 px-3 py-3 rounded-md"
                  onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
                >
                  <span className="flex items-center">
                    <i className="bx bx-briefcase-alt-2 text-xl mr-3"></i>
                    Nos services
                  </span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${isServicesMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Mobile Services Submenu */}
                {isServicesMenuOpen && (
                  <div className="ml-6 mt-2 space-y-1">
                    <Link to="/oqtf-simple" onClick={closeMobileMenu} className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 px-3 py-2 rounded-md text-sm">
                      <i className="bx bx-file-blank text-base mr-3"></i>
                      OQTF Simple
                    </Link>
                    <Link to="/oqtf-assignation" onClick={closeMobileMenu} className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 px-3 py-2 rounded-md text-sm">
                      <i className="bx bx-home-heart text-base mr-3"></i>
                      OQTF avec assignation à résidence
                    </Link>
                    <Link to="/oqtf-placement" onClick={closeMobileMenu} className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 px-3 py-2 rounded-md text-sm">
                      <i className="bx bx-lock text-base mr-3"></i>
                      OQTF avec placement en rétention
                    </Link>
                    <Link to="/irtf" onClick={closeMobileMenu} className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 px-3 py-2 rounded-md text-sm">
                      <i className="bx bx-block text-base mr-3"></i>
                      IRTF (Interdiction de retour)
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                to="/about" 
                onClick={closeMobileMenu}
                className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 px-3 py-3 rounded-md mt-2"
              >
                <i className="bx bx-info-circle text-xl mr-3"></i>
                À propos
              </Link>
              
              {/* Mobile Location Menu */}
              <div className="mt-2">
                <button 
                  className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 px-3 py-3 rounded-md"
                  onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
                >
                  <span className="flex items-center">
                    <i className="bx bx-map text-xl mr-3"></i>
                    Où nous rencontrer ?
                  </span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${isLocationMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Mobile Location Submenu */}
                {isLocationMenuOpen && (
                  <div className="ml-6 mt-2 space-y-1">
                    <Link to="/paris" onClick={closeMobileMenu} className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 px-3 py-2 rounded-md text-sm">
                      <i className="bx bx-buildings text-base mr-3"></i>
                      Paris
                    </Link>
                    <Link to="/nice" onClick={closeMobileMenu} className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 px-3 py-2 rounded-md text-sm">
                      <i className="bx bx-sun text-base mr-3"></i>
                      Nice
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                to="/blog" 
                onClick={closeMobileMenu}
                className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 px-3 py-3 rounded-md mt-2"
              >
                <i className="bx bx-edit text-xl mr-3"></i>
                Blog
              </Link>
              
              {/* Mobile Phone Button */}
              <button 
                onClick={() => window.location.href = 'tel:0184748720'}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full font-medium transition-colors flex items-center justify-center mt-6 w-full"
                title="Appeler le 01 84 74 87 20"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                01 84 74 87 20
              </button>
            </nav>
          </div>
    </>
  )
}
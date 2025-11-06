import React from 'react'

export default function CallButton({ phoneNumber = "07 63 56 01 50", className = "" }) {
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`
  }

  return (
    <button 
      onClick={handleCall}
      className={`px-12 sm:px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto max-w-xs sm:max-w-none ${className}`} 
      style={{
        backgroundColor: '#12255D', 
        color: 'white', 
        fontFamily: 'Poppins, sans-serif'
      }} 
      onMouseEnter={(e) => e.target.style.backgroundColor = '#0f1d4d'} 
      onMouseLeave={(e) => e.target.style.backgroundColor = '#12255D'}
    >
      Contactez-nous
    </button>
  )
}

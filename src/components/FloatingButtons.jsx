import React from 'react'

export default function FloatingButtons({ onOpenPopup }) {
  const phoneNumber = "07 63 56 01 50"

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`
  }

  return (
    <div className="fixed top-1/2 right-4 z-50 flex flex-col gap-3 md:hidden transform -translate-y-1/2">
      {/* Bouton d'appel */}
      <button
        onClick={handleCall}
        className="w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        title={`Appeler le ${phoneNumber}`}
        aria-label="Appeler maintenant"
      >
        <svg 
          className="w-6 h-6" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </button>

      {/* Bouton de contact */}
      <button
        onClick={onOpenPopup}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        title="Ouvrir le formulaire de contact"
        aria-label="Contacter par formulaire"
      >
        <svg 
          className="w-6 h-6" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )
}

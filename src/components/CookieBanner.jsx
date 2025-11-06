import React, { useState, useEffect } from 'react'
import { getConsentStatus, updateConsentMode, ConsentStatus } from '../services/consentMode'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState({
    analytics: true,
    advertising: true
  })

  useEffect(() => {
    const checkAndShowBanner = () => {
      const status = getConsentStatus()
      if (status === ConsentStatus.PENDING) {
        setShowBanner(true)
        document.body.style.overflow = 'hidden'
      }
    }
    
    checkAndShowBanner()
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleClose = () => {
    setShowBanner(false)
    document.body.style.overflow = ''
  }

  const handleAcceptAll = () => {
    updateConsentMode(true, preferences)
    handleClose()
  }

  const handleRejectAll = () => {
    updateConsentMode(false, { analytics: false, advertising: false })
    handleClose()
  }

  const handleSavePreferences = () => {
    const hasAnyConsent = preferences.analytics || preferences.advertising
    updateConsentMode(hasAnyConsent, preferences)
    setShowPreferences(false)
    handleClose()
  }

  if (!showBanner) {
    return null
  }

  return (
    <>
      <div 
        className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm"
        style={{ pointerEvents: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white shadow-2xl border-t-2" style={{ borderColor: '#12255D' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {!showPreferences ? (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2" style={{ color: '#12255D', fontFamily: 'Poppins, sans-serif' }}>
                  Gestion des cookies
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser le trafic du site et personnaliser le contenu. 
                  En acceptant, vous autorisez l'utilisation de cookies à des fins d'analyse et de publicité.{' '}
                  <a 
                    href="/politique-confidentialite" 
                    className="underline font-medium"
                    style={{ color: '#12255D' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    En savoir plus
                  </a>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Personnaliser
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#6B7280' }}
                >
                  Refuser tout
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#12255D' }}
                >
                  Tout accepter
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold" style={{ color: '#12255D', fontFamily: 'Poppins, sans-serif' }}>
                Préférences des cookies
              </h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Cookies analytiques</h4>
                  <p className="text-sm text-gray-600">
                    Ces cookies nous permettent d'analyser l'utilisation du site pour améliorer nos services.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Cookies publicitaires</h4>
                  <p className="text-sm text-gray-600">
                    Ces cookies permettent d'afficher des publicités personnalisées basées sur vos intérêts.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input
                    type="checkbox"
                    checked={preferences.advertising}
                    onChange={(e) => setPreferences({ ...preferences, advertising: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Retour
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#12255D' }}
              >
                Enregistrer les préférences
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    </>
  )
}


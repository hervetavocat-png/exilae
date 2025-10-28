import React, { useState, useEffect } from 'react'
import avocatImage from '../IMG/avocat.png'
import logoImage from '../IMG/logo.png'

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const fullText = 'avocats'



  // Gérer l'animation de typing
  useEffect(() => {
    const startTypingAnimation = () => {
      let currentIndex = 0
      setDisplayText('') // Réinitialiser le texte
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typingInterval)
          // Attendre 2 secondes puis effacer et recommencer
          setTimeout(() => {
            let deleteIndex = fullText.length
            const deleteInterval = setInterval(() => {
              if (deleteIndex >= 0) {
                setDisplayText(fullText.slice(0, deleteIndex))
                deleteIndex--
              } else {
                clearInterval(deleteInterval)
                // Recommencer l'animation après une pause
                setTimeout(startTypingAnimation, 1000)
              }
            }, 100) // Vitesse d'effacement plus rapide
          }, 2000) // Pause avant d'effacer
        }
      }, 200) // Vitesse de frappe
    }

    // Démarrer l'animation après un délai initial
    const initialDelay = setTimeout(startTypingAnimation, 1000)

    return () => {
      clearTimeout(initialDelay)
    }
  }, [fullText])

  // Gérer l'animation du curseur
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => {
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <div className="text-white relative overflow-hidden" style={{backgroundColor: '#12255D'}}>
      {/* Wave decoration - flowing lines from right edge */}
      <div className="absolute right-0 top-0 w-full h-full pointer-events-none">
        <svg
          className="absolute right-0 top-0 w-full h-full opacity-15"
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMaxYMid slice"
        >
                          <defs>
                  <linearGradient id="waveGradient2" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stopColor="white" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                
                {/* Main flowing wave lines starting from right edge - fines et rapprochées - déplacées vers le bas */}
                <path
                  d="M600 80 C500 85, 400 95, 300 110 C200 125, 100 140, 0 160"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 85 C500 90, 400 100, 300 115 C200 130, 100 145, 0 165"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 90 C500 95, 400 105, 300 120 C200 135, 100 150, 0 170"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 95 C500 100, 400 110, 300 125 C200 140, 100 155, 0 175"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 100 C500 105, 400 115, 300 130 C200 145, 100 160, 0 180"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 105 C500 110, 400 120, 300 135 C200 150, 100 165, 0 185"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 110 C500 115, 400 125, 300 140 C200 155, 100 170, 0 190"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 55 C500 60, 400 70, 300 85 C200 100, 100 115, 0 135"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 60 C500 65, 400 75, 300 90 C200 105, 100 120, 0 140"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 65 C500 70, 400 80, 300 95 C200 110, 100 125, 0 145"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 70 C500 75, 400 85, 300 100 C200 115, 100 130, 0 150"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 75 C500 80, 400 90, 300 105 C200 120, 100 135, 0 155"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 80 C500 85, 400 95, 300 110 C200 125, 100 140, 0 160"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 85 C500 90, 400 100, 300 115 C200 130, 100 145, 0 165"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 90 C500 95, 400 105, 300 120 C200 135, 100 150, 0 170"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 95 C500 100, 400 110, 300 125 C200 140, 100 155, 0 175"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 100 C500 105, 400 115, 300 130 C200 145, 100 160, 0 180"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 105 C500 110, 400 120, 300 135 C200 150, 100 165, 0 185"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 110 C500 115, 400 125, 300 140 C200 155, 100 170, 0 190"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 115 C500 120, 400 130, 300 145 C200 160, 100 175, 0 195"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 120 C500 125, 400 135, 300 150 C200 165, 100 180, 0 200"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 125 C500 130, 400 140, 300 155 C200 170, 100 185, 0 205"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 130 C500 135, 400 145, 300 160 C200 175, 100 190, 0 210"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 135 C500 140, 400 150, 300 165 C200 180, 100 195, 0 215"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 140 C500 145, 400 155, 300 170 C200 185, 100 200, 0 220"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 145 C500 150, 400 160, 300 175 C200 190, 100 205, 0 225"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 150 C500 155, 400 165, 300 180 C200 195, 100 210, 0 230"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 155 C500 160, 400 170, 300 185 C200 200, 100 215, 0 235"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 160 C500 165, 400 175, 300 190 C200 205, 100 220, 0 240"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 165 C500 170, 400 180, 300 195 C200 210, 100 225, 0 245"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 170 C500 175, 400 185, 300 200 C200 215, 100 230, 0 250"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 175 C500 180, 400 190, 300 205 C200 220, 100 235, 0 255"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 180 C500 185, 400 195, 300 210 C200 225, 100 240, 0 260"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 185 C500 190, 400 200, 300 215 C200 230, 100 245, 0 265"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 190 C500 195, 400 205, 300 220 C200 235, 100 250, 0 270"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 195 C500 200, 400 210, 300 225 C200 240, 100 255, 0 275"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M600 200 C500 205, 400 215, 300 230 C200 245, 100 260, 0 280"
                  stroke="url(#waveGradient2)"
                  strokeWidth="0.5"
                  fill="none"
                />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 relative z-10">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-12" data-aos="fade-down">
          <div className="flex items-center space-x-6 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
            <img 
              src={logoImage} 
              alt="Logo Exilae Avocats" 
              className="h-16 w-auto"
            />
            <div className="text-white">
              <p className="text-lg font-light opacity-90">Un service proposé par le Cabinet EXILAE Avocats</p>
            </div>
          </div>
        </div>

        {/* Main Content - Centered */}
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl mb-8 leading-tight" style={{fontFamily: 'Poppins, sans-serif', fontWeight: '700'}}>
            Faites annuler votre OQTF par nos <span style={{fontFamily: '"Fugaz One", sans-serif', fontWeight: '400', fontStyle: 'normal', display: 'inline-block', minWidth: '150px', textAlign: 'left'}}>
              {displayText}
              <span style={{opacity: showCursor ? 1 : 0}}>|</span>
            </span>
          </h1>
          
          <p className="text-xl mb-12 text-blue-100 font-light max-w-3xl mx-auto leading-relaxed">
            Contestez votre OQTF et défendez vos droits avec l'expertise de nos avocats en droit des étrangers
          </p>
          
          <div className="flex justify-center">
            <button 
              onClick={() => window.location.href = 'tel:0763560150'}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              style={{fontFamily: 'Poppins, sans-serif'}}
              title="Appeler le 07 63 56 01 50"
            >
              Annulez votre OQTF maintenant !
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Timeline - Modern Process Steps */}
      <div className="bg-blue-100 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 transform -translate-y-1/2 z-0"></div>
              
              {/* Step 1 */}
              <div className="relative bg-white rounded-2xl shadow-lg p-6 w-80 transform hover:scale-105 transition-all duration-300 z-10">
                <div className="text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{backgroundColor: '#12255D'}}>
                      1
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto bg-gradient-to-br from-blue-100 to-blue-200">
                    <i className="bx bx-phone text-2xl" style={{color: '#12255D'}}></i>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-bold text-lg mb-2 font-['Poppins']" style={{color: '#12255D'}}>
                    DEVIS IMMÉDIAT
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Un devis vous est adressé immédiatement ensuite.
                  </p>
                </div>
                
                {/* Arrow */}
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-2xl z-20">
                  <i className="bx bx-right-arrow-alt"></i>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative bg-white rounded-2xl shadow-lg p-6 w-80 transform hover:scale-105 transition-all duration-300 z-10">
                <div className="text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{backgroundColor: '#12255D'}}>
                      2
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto bg-gradient-to-br from-blue-100 to-blue-200">
                    <i className="bx bx-calendar text-2xl" style={{color: '#12255D'}}></i>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-bold text-lg mb-2 font-['Poppins']" style={{color: '#12255D'}}>
                    RENDEZ-VOUS
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Prise de rendez vous avec votre avocat au téléphone, en visio ou au cabinet et signature de la convention d'honoraire
                  </p>
                </div>
                
                {/* Arrow */}
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-2xl z-20">
                  <i className="bx bx-right-arrow-alt"></i>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative bg-white rounded-2xl shadow-lg p-6 w-80 transform hover:scale-105 transition-all duration-300 z-10">
                <div className="text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{backgroundColor: '#12255D'}}>
                      3
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto bg-gradient-to-br from-blue-100 to-blue-200">
                    <i className="bx bx-building text-2xl" style={{color: '#12255D'}}></i>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-bold text-lg mb-2 font-['Poppins']" style={{color: '#12255D'}}>
                    PRISE EN CHARGE
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Prise en charge de votre dossier immédiatement par votre avocat en droit des étrangers
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Timeline - Vertical */}
          <div className="md:hidden space-y-6">
            {/* Step 1 */}
            <div className="relative flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{backgroundColor: '#12255D'}}>
                  1
                </div>
              </div>
              <div className="ml-4 bg-white rounded-xl shadow-md p-4 flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-blue-100">
                    <i className="bx bx-phone text-lg" style={{color: '#12255D'}}></i>
                  </div>
                  <h3 className="font-bold text-sm font-['Poppins']" style={{color: '#12255D'}}>
                    PRISE DE CONTACT
                  </h3>
                </div>
                <p className="text-xs text-gray-600">
                  Contactez-nous pour une première évaluation gratuite
                </p>
              </div>
              {/* Connecting Line */}
              <div className="absolute left-5 top-10 w-0.5 h-6 bg-blue-300"></div>
            </div>
            
            {/* Step 2 */}
            <div className="relative flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{backgroundColor: '#12255D'}}>
                  2
                </div>
              </div>
              <div className="ml-4 bg-white rounded-xl shadow-md p-4 flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-blue-100">
                    <i className="bx bx-calendar text-lg" style={{color: '#12255D'}}></i>
                  </div>
                  <h3 className="font-bold text-sm font-['Poppins']" style={{color: '#12255D'}}>
                    RENDEZ-VOUS
                  </h3>
                </div>
                <p className="text-xs text-gray-600">
                  Prise de rendez vous avec votre avocat au téléphone, en visio ou au cabinet et signature de la convention d'honoraire
                </p>
              </div>
              {/* Connecting Line */}
              <div className="absolute left-5 top-10 w-0.5 h-6 bg-blue-300"></div>
            </div>
            
            {/* Step 3 */}
            <div className="relative flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{backgroundColor: '#12255D'}}>
                  3
                </div>
              </div>
              <div className="ml-4 bg-white rounded-xl shadow-md p-4 flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-blue-100">
                    <i className="bx bx-building text-lg" style={{color: '#12255D'}}></i>
                  </div>
                  <h3 className="font-bold text-sm font-['Poppins']" style={{color: '#12255D'}}>
                    RENCONTRE EN CABINET
                  </h3>
                </div>
                <p className="text-xs text-gray-600">
                  Prise en charge de votre dossier immédiatement par votre avocat en droit des étrangers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

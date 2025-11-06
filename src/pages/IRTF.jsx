import React from 'react'
import irtfImage from '../IMG/OQTF_IRTF_2.png'
import ServicesGrid from '../components/ServicesGrid'
import FAQ2 from '../components/FAQ2'
import CallButton from '../components/CallButton'

export default function IRTF() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Espace blanc - seulement sur desktop */}
      <div className="hidden lg:block bg-white pt-32 pb-8"></div>
      
      {/* Hero Section Bleu - seulement les titres */}
      <div className="hidden md:block text-white relative overflow-hidden pt-32 lg:pt-16 pb-16" style={{backgroundColor: '#12255D'}}>
        <div className="absolute right-0 top-0 w-full h-full pointer-events-none">
          <svg className="absolute right-0 top-0 w-full h-full opacity-15" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid slice">
            <defs>
              <linearGradient id="waveGradient2" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M600 80 C500 85, 400 95, 300 110 C200 125, 100 140, 0 160" stroke="url(#waveGradient2)" strokeWidth="0.5" fill="none"/>
            <path d="M600 100 C500 105, 400 115, 300 130 C200 145, 100 160, 0 180" stroke="url(#waveGradient2)" strokeWidth="0.5" fill="none"/>
            <path d="M600 120 C500 125, 400 135, 300 150 C200 165, 100 180, 0 200" stroke="url(#waveGradient2)" strokeWidth="0.5" fill="none"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight" style={{fontFamily: 'Poppins, sans-serif'}}>
            IRTF
          </h1>
          <p className="text-lg lg:text-xl opacity-90">
            Contester une interdiction de retour sur le territoire français
          </p>
        </div>
      </div>

      {/* Hero Section - Layout comme l'image */}
      <div className="py-8 md:py-20 flex items-center justify-center bg-white">
        <div className="container mx-auto px-1 sm:px-4 pt-8 sm:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contenu à gauche */}
            <div className="pt-8 sm:pt-0 lg:pt-8 px-1 sm:px-0">
               <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6  text-blue-900 bg-gradient-to-r from-blue-900 via-blue-800 to-red-600 bg-clip-text w-full" style={{fontFamily: 'Poppins, sans-serif', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                IRTF (Interdiction de Retour)
              </h1>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed" style={{color: '#1E40AF', fontFamily: 'Poppins, sans-serif'}}>
                Chez nos avocats, nous nous consacrons à simplifier le parcours vers <strong>la défense de vos droits</strong> et <strong>l'emploi légal en France</strong>. L'Interdiction de Retour sur le Territoire Français (IRTF) est une mesure administrative qui empêche un étranger de revenir en France pendant une durée déterminée, généralement à la suite d'une OQTF non respectée. Pour vous aider dans vos démarches, nous vous présentons l'état actuel du droit, les conditions à remplir pour être éligible à une demande de <strong>recours contre l'IRTF</strong> ou à une <strong>régularisation</strong>, et nous vous accompagnons pas à pas dans la défense de vos droits.
              </p>
              
              {/* Points forts avec icônes */}
              <div className="grid grid-cols-2 gap-4 mb-6 sm:mb-8">
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-bold text-xs sm:text-base" style={{color: '#1E40AF', fontFamily: 'Poppins, sans-serif'}}>Avocat expert</span>
                </div>
                
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="font-bold text-xs sm:text-base" style={{color: '#1E40AF', fontFamily: 'Poppins, sans-serif'}}>Prise en charge rapide du dossier</span>
                </div>
                
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="font-bold text-xs sm:text-base" style={{color: '#1E40AF', fontFamily: 'Poppins, sans-serif'}}>Confidentialité garantie</span>
                </div>
                
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <span className="font-bold text-xs sm:text-base" style={{color: '#1E40AF', fontFamily: 'Poppins, sans-serif'}}>Interlocuteur dédié</span>
                </div>
              </div>
              
              {/* Bouton CTA */}
              <div className="flex justify-center sm:justify-start">
                <CallButton />
              </div>
            </div>
            
            {/* Image à droite - positionnée un peu plus bas */}
            <div className="flex justify-center lg:justify-end pt-8">
              <img 
                src={irtfImage} 
                alt="IRTF - Interdiction de retour" 
                className="w-full max-w-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ2 />

      {/* Services Grid Section */}
      <ServicesGrid />
    </div>
  )
}

import React from 'react'
import oqtfMaisonImage from '../IMG/oqtf_maison.png'
import logoImage from '../IMG/logo.png'
import ServicesGrid from '../components/ServicesGrid'
import FAQ2 from '../components/FAQ2'
import CallButton from '../components/CallButton'

export default function OQTFAssignation() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logo Section - en dehors */}
      <section className="py-20 bg-white pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src={logoImage} 
            alt="Logo Exilae Avocats" 
            className="h-32 lg:h-40 w-auto mx-auto"
          />
        </div>
      </section>

      {/* Hero Section Bleu - seulement les titres */}
      <div className="text-white relative overflow-hidden" style={{backgroundColor: '#12255D'}}>
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
            OQTF AVEC ASSIGNATION
          </h1>
          <p className="text-lg lg:text-xl opacity-90">
            Défendez vos droits lors d'une assignation à résidence
          </p>
        </div>
      </div>

      {/* Hero Section - Layout comme l'image */}
      <div className="py-20 flex items-center justify-center bg-white">
        <div className="container mx-auto px-1 sm:px-4 pt-20 sm:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contenu à gauche */}
            <div className="px-1 sm:px-0">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-900 via-blue-800 to-red-600 bg-clip-text w-full" style={{fontFamily: 'Poppins, sans-serif', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                OQTF avec Assignation à Résidence
              </h1>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed" style={{color: '#1E40AF', fontFamily: 'Poppins, sans-serif'}}>
                Nos avocats vous accompagnent pour <strong>défendre vos droits</strong> et sécuriser votre situation en France. Lorsqu'une Obligation de Quitter le Territoire Français (OQTF) est prononcée, elle peut être accompagnée d'une Assignation à Résidence, qui oblige à rester dans un lieu précis en attendant la décision d'éloignement. Nous vous expliquons clairement vos droits, les <strong>recours possibles</strong> et les conditions à remplir pour contester une OQTF ou demander une <strong>régularisation</strong>, tout en vous guidant pas à pas dans vos démarches juridiques.
              </p>
              
              {/* Points forts avec icônes */}
              <div className="grid grid-cols-2 gap-4 mb-6 sm:mb-8">
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-bold text-xs sm:text-base" style={{color: '#1E40AF', fontFamily: 'Poppins, sans-serif'}}>Avocats spécialisés</span>
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
            
            {/* Image à droite */}
            <div className="flex justify-center lg:justify-end">
              <img 
                src={oqtfMaisonImage} 
                alt="OQTF Assignation à résidence" 
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

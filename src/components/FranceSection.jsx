import React from 'react'
import backgroundImage from '../IMG/background.jpg'

export default function FranceSection() {
  return (
    <section className="py-16 relative overflow-hidden" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-md p-6 lg:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/30 rounded-full -translate-y-12 translate-x-12"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-red-100/30 rounded-full translate-y-10 -translate-x-10"></div>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 relative z-10">
            <div className="flex-shrink-0 order-2 lg:order-1">
              <div className="relative">
                <img 
                  src={new URL('../IMG/la-france.png', import.meta.url).href}
                  alt="Carte de la France"
                  className="w-64 lg:w-80 h-auto object-contain drop-shadow-lg"
                />
                {/* Decorative dots around the map */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-8 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center text-center lg:text-left max-w-lg order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 mx-auto lg:mx-0" style={{backgroundColor: '#12255D'}}>
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold mb-3" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>
                Intervention partout en France
              </h2>
              
              <p className="text-base lg:text-lg text-gray-700 mb-6 leading-relaxed">
                Nos avocats en droit des étrangers peuvent vous aider quel que soit votre lieu de résidence, devant tous les tribunaux administratifs de France.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start">
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Plus de 50 villes couvertes
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import React from 'react'

export default function MapSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>Présents dans toute la France</h2>
          <p className="text-lg text-gray-600">
            Notre cabinet intervient sur l'ensemble du territoire français
          </p>
        </div>
        
        <div className="relative bg-blue-50 rounded-lg p-8">
          {/* Map Container */}
          <div className="relative h-96 bg-blue-100 rounded-lg flex items-center justify-center">
            {/* France Map Silhouette */}
            <div className="relative">
              <svg width="300" height="350" viewBox="0 0 300 350" className="text-blue-900">
                <path
                  fill="currentColor"
                  d="M150 50 L180 80 L200 60 L220 70 L240 90 L250 120 L260 150 L250 180 L240 210 L220 240 L200 260 L180 270 L150 280 L120 270 L100 260 L80 240 L60 210 L50 180 L40 150 L50 120 L60 90 L80 70 L100 60 L120 80 Z"
                />
              </svg>
              
              {/* Location Pins */}
              <div className="absolute top-20 left-24">
                <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                <div className="text-xs text-gray-700 mt-1 whitespace-nowrap">Paris</div>
              </div>
              
              <div className="absolute top-32 left-16">
                <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                <div className="text-xs text-gray-700 mt-1 whitespace-nowrap">Lyon</div>
              </div>
              
              <div className="absolute top-28 left-8">
                <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                <div className="text-xs text-gray-700 mt-1 whitespace-nowrap">Bordeaux</div>
              </div>
              
              <div className="absolute top-36 right-12">
                <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                <div className="text-xs text-gray-700 mt-1 whitespace-nowrap">Nice</div>
              </div>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">15+</div>
              <div className="text-gray-600">Villes couvertes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">500+</div>
              <div className="text-gray-600">Dossiers traités</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">95%</div>
              <div className="text-gray-600">Taux de réussite</div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors">
              TROUVER UN AVOCAT PRÈS DE CHEZ VOUS
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

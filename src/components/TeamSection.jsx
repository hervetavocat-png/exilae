import React from 'react'

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Maître Dupont",
      title: "Avocat associé",
      speciality: "Droit des étrangers",
      experience: "15 ans d'expérience"
    },
    {
      name: "Maître Martin",
      title: "Avocat associé",
      speciality: "Contentieux administratif",
      experience: "12 ans d'expérience"
    },
    {
      name: "Maître Dubois",
      title: "Avocat collaborateur",
      speciality: "Droit de la famille",
      experience: "8 ans d'expérience"
    },
    {
      name: "Maître Leroy",
      title: "Avocat collaborateur",
      speciality: "Régularisation",
      experience: "6 ans d'expérience"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{backgroundColor: '#12255D'}}>
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>Notre équipe d'experts</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Des avocats expérimentés et spécialisés dans le droit des étrangers pour vous accompagner
          </p>
        </div>
        
        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              {/* Profile Picture Placeholder */}
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-blue-600 font-medium mb-2">
                {member.title}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                {member.speciality}
              </p>
              <p className="text-gray-500 text-sm">
                {member.experience}
              </p>
            </div>
          ))}
        </div>
        
        {/* Google Reviews Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left - Google Reviews */}
            <div>
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-xl font-semibold text-gray-900">Google</span>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-900">4.8/5</span>
              </div>
              
              <p className="text-gray-600 mb-4">
                Basé sur <span className="font-semibold">127 avis</span> clients
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 w-8">5★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 w-8">4★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '12%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">12%</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 w-8">3★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '2%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">2%</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 w-8">2★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '1%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">1%</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 w-8">1★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '0%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">0%</span>
                </div>
              </div>
            </div>
            
            {/* Right - Recent Reviews */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>Avis récents</h3>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-2">
                  "Excellent service, très professionnel. Mon OQTF a été annulée grâce à leur expertise."
                </p>
                <p className="text-gray-500 text-xs">- Marie L. • il y a 2 jours</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-2">
                  "Avocat très compétent, à l'écoute et disponible. Je recommande vivement."
                </p>
                <p className="text-gray-500 text-xs">- Jean K. • il y a 5 jours</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-2">
                  "Service irréprochable, résultat au rendez-vous. Merci pour votre professionnalisme."
                </p>
                <p className="text-gray-500 text-xs">- Fatima B. • il y a 1 semaine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

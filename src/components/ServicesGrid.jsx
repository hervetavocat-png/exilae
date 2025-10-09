import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import avocatImageJpg from '../IMG/avocat2.jpg'

export default function ServicesGrid() {
  const navigate = useNavigate()
  
  useEffect(() => {
    AOS.init()
  }, [])

  const oqtfTypes = [
    {
      title: "OQTF simple",
      subtitle: "(30 jours)",
      image: new URL('../IMG/OQTF_30_ jours.png', import.meta.url).href,
      urgency: "Standard",
      description: "Délai de recours de 30 jours pour contester la décision",
      color: "from-red-500 to-red-700",
      route: "/oqtf-simple"
    },
    {
      title: "OQTF avec assignation à résidence",
      subtitle: "(7 jours)",
      image: new URL('../IMG/OQTF_assignation_7_jours.png', import.meta.url).href,
      urgency: "Urgent",
      description: "Recours limité à 7 jours, assignation à résidence obligatoire",
      color: "from-red-500 to-red-700",
      route: "/oqtf-assignation"
    },
    {
      title: "OQTF avec placement en Centre de Rétention",
      subtitle: "(48h)",
      image: new URL('../IMG/OQTF_avec_placement_48h.png', import.meta.url).href,
      urgency: "Très urgent",
      description: "Délai extrêmement court, placement immédiat en rétention",
      color: "from-red-500 to-red-700",
      route: "/oqtf-placement"
    },
    {
      title: "OQTF avec IRTF",
      subtitle: "Interdiction de retour",
      image: new URL('../IMG/oqtf IRTF.png', import.meta.url).href,
      urgency: "Critique",
      description: "Interdiction de retour sur le territoire français",
      color: "from-red-500 to-red-700",
      route: "/irtf"
    }
  ]

  const getUrgencyStyle = (urgency) => {
    switch(urgency) {
      case "Standard": return "bg-blue-100 text-blue-800"
      case "Urgent": return "bg-orange-100 text-orange-800"
      case "Très urgent": return "bg-red-100 text-red-800"
      case "Critique": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden" style={{backgroundColor: '#ffffff'}}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{backgroundColor: '#12255D'}}>
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>
            Votre OQTF
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600">
            Nous gérons toutes les OQTF avec expertise et professionnalisme pour défendre vos droits selon leur urgence
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {oqtfTypes.map((oqtf, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100 min-h-[500px] flex flex-col"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Header with gradient */}
              <div className={`h-2 bg-gradient-to-r ${oqtf.color}`}></div>
              
              {/* Content */}
              <div className="p-6 flex flex-col h-full">
                {/* Title Section - Hauteur fixe */}
                <div className="mb-6 text-center h-20 flex flex-col justify-center">
                  <h3 className="text-lg font-bold mb-2 leading-tight" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                    {oqtf.title}
                  </h3>
                  <p className="text-lg font-semibold text-red-600">
                    {oqtf.subtitle}
                  </p>
                </div>
                
                {/* Image - Hauteur fixe */}
                <div className="mb-6 h-40 flex justify-center items-center">
                  <img 
                    src={oqtf.image} 
                    alt={oqtf.title}
                    className="w-32 h-32 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                {/* Description - Hauteur fixe */}
                <div className="mb-6 h-20 flex items-center justify-center">
                  <p className="text-sm text-gray-600 leading-relaxed text-center">
                    {oqtf.description}
                  </p>
                </div>
                
                {/* Button - Toujours en bas */}
                <div className="mt-auto">
                  <button 
                    className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    style={{backgroundColor: '#12255D'}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#0f1d4d'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#12255D'}
                    onClick={() => navigate(oqtf.route)}
                  >
                    Voir plus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-16" data-aos="fade-up" data-aos-delay="400">
          <div className="rounded-2xl p-8 text-white relative overflow-hidden" style={{backgroundColor: '#12255D'}}>
            {/* Left side - Avocat Image with gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 flex items-center justify-start">
              <div className="relative h-full w-full">
                <img 
                  src={avocatImageJpg} 
                  alt="Avocat spécialisé en droit des étrangers" 
                  className="h-full w-full object-cover opacity-80"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#12255D]/40 via-[#12255D]/70 to-[#12255D]/85"></div>
              </div>
            </div>
            
            {/* Center Content */}
            <div className="text-center relative z-10">
              <h3 className="text-2xl font-bold mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                Besoin d'aide pour votre OQTF ?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Nos experts analysent votre situation et vous accompagnent dans les meilleurs délais
              </p>
              <button 
                onClick={() => window.location.href = 'tel:0184748720'}
                className="bg-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                style={{color: '#12255D'}}
                title="Appeler le 01 84 74 87 20"
              >
                DEMANDER UNE CONSULTATION
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

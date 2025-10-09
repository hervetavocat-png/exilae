import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import aproposImage1 from '../IMG/apropos.jpg'
import aproposImage2 from '../IMG/apropos2.jpg'
import backgroundImage from '../IMG/background.jpg'

export default function AboutSection() {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <section className="py-20 relative" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
            À propos
          </h2>
          <div className="w-24 h-1 mx-auto mb-8" style={{backgroundColor: '#12255D'}}></div>
        </div>

        {/* Main Content */}
        <div className="mb-16" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 lg:p-12 text-white text-center shadow-xl">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight" style={{fontFamily: 'Poppins, sans-serif'}}>
              Contestez immédiatement votre OQTF avec l'un de nos avocats, disponibles 7 jours sur 7, de 8h à 22h !
            </h3>
          </div>
        </div>

        {/* Content with Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          
          {/* Left Side */}
          <div data-aos="fade-right" data-aos-delay="400">
            <div className="space-y-8">
              <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img 
                  src={aproposImage1} 
                  alt="Cabinet d'avocats spécialisé en droit des étrangers" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Si vous venez de recevoir une Obligation de Quitter le Territoire Français (OQTF), il est crucial de réagir rapidement. Une OQTF est une décision administrative sérieuse qui peut entraîner votre expulsion du territoire français, et chaque minute compte pour contester cette mesure.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div data-aos="fade-left" data-aos-delay="600">
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Grâce à notre équipe d'avocats spécialisés en droit des étrangers, vous bénéficiez d'une assistance immédiate et personnalisée pour faire valoir vos droits.
                </p>
                <p className="text-lg font-semibold leading-relaxed" style={{color: '#12255D'}}>
                  Que vous soyez confronté à une OQTF avec ou sans délai de départ volontaire, nos avocats vous fourniront une défense adaptée et complète.
                </p>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img 
                  src={aproposImage2} 
                  alt="Équipe d'avocats experts en OQTF" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-aos="fade-up" data-aos-delay="800">
          
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto" style={{backgroundColor: '#12255D'}}>
              <i className="bx bx-time text-white text-2xl"></i>
            </div>
            <h4 className="font-bold text-xl mb-2" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
              Disponibilité 7j/7
            </h4>
            <p className="text-gray-600">
              Nos avocats sont disponibles tous les jours de la semaine pour vous accompagner
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto" style={{backgroundColor: '#12255D'}}>
              <i className="bx bx-phone text-white text-2xl"></i>
            </div>
            <h4 className="font-bold text-xl mb-2" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
              Horaires 8h - 22h
            </h4>
            <p className="text-gray-600">
              Des horaires étendus pour répondre à vos besoins urgents
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

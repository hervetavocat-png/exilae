import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import logoImage from '../IMG/logo.png'
import cabinetNiceImage from '../IMG/cabinet_nice.png'
import backgroundImage from '../IMG/background.jpg'
import ServicesGrid from '../components/ServicesGrid'
import FAQSection from '../components/FAQSection'
import ReviewsSection from '../components/ReviewsSection'

export default function Nice() {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-white relative overflow-hidden" style={{backgroundColor: '#12255D'}}>
        {/* Wave decoration */}
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
            
            {/* Wave lines */}
            <path
              d="M600 80 C500 85, 400 95, 300 110 C200 125, 100 140, 0 160"
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
              d="M600 120 C500 125, 400 135, 300 150 C200 165, 100 180, 0 200"
              stroke="url(#waveGradient2)"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        </div>

      </div>

      {/* Logo Section bien visible */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
          <div className="mb-12">
            <img 
              src={logoImage} 
              alt="Logo Exilae Avocats" 
              className="h-32 lg:h-40 w-auto mx-auto mb-8"
            />
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
              Cabinet EXILAE AVOCATS - Nice
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 font-medium">Spécialistes en droit des étrangers</p>
          </div>
        </div>
      </section>

      {/* About Cabinet Section */}
      <section className="py-20 relative" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
          
          {/* Header */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
              Notre Cabinet Nice
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{backgroundColor: '#12255D'}}></div>
          </div>

          {/* Main Content */}
          <div className="mb-16" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 lg:p-12 text-white text-center shadow-xl">
              <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight" style={{fontFamily: 'Poppins, sans-serif'}}>
                Avocats en droit des étrangers sur la Côte d'Azur
              </h3>
              <p className="text-xl opacity-90">
                Une présence privilégiée sur la Côte d'Azur pour défendre vos droits
              </p>
            </div>
          </div>

          {/* Content with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            
            {/* Left Side - Image */}
            <div data-aos="fade-right" data-aos-delay="400">
              <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img 
                  src={cabinetNiceImage} 
                  alt="Cabinet Exilae Avocats Nice" 
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div data-aos="fade-left" data-aos-delay="600">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{backgroundColor: '#12255D'}}>
                      <i className="bx bx-sun text-white text-xl"></i>
                    </div>
                    <h4 className="font-bold text-xl" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                      Au cœur de la Côte d'Azur
                    </h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Notre cabinet niçois bénéficie d'un emplacement privilégié sur la Côte d'Azur pour vous offrir un accès optimal à nos services juridiques spécialisés. Nous sommes proches des principales préfectures de la région PACA.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{backgroundColor: '#12255D'}}>
                      <i className="bx bx-shield text-white text-xl"></i>
                    </div>
                    <h4 className="font-bold text-xl" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                      Proximité et compétence
                    </h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Notre équipe d'avocats niçois allie proximité géographique et compétence juridique pour vous offrir un accompagnement personnalisé dans la contestation de votre OQTF. Nous connaissons parfaitement les spécificités régionales.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Carte Google Maps */}
          <div className="mb-20" data-aos="fade-up" data-aos-delay="700">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                Trouvez-nous facilement
              </h3>
              <p className="text-gray-600 text-lg">
                Notre cabinet est situé au cœur du centre-ville de Nice
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Informations */}
                <div className="p-8 lg:p-12 bg-gradient-to-br from-blue-50 to-white">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#12255D'}}>
                        <i className="bx bx-map-pin text-white text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                          Adresse complète
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          <span className="font-semibold">Cabinet EXILAE Avocats</span><br />
                          22 Rue de l'Hôtel des Postes<br />
                          06000 Nice, France
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#12255D'}}>
                        <i className="bx bx-train text-white text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                          Accès transport
                        </h4>
                        <p className="text-gray-700">
                          <span className="inline-flex items-center bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-bold mr-2">T1</span>Tramway Ligne 1<br />
                          <span className="font-medium">Gare SNCF Nice-Ville</span> - 10 min à pied
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#12255D'}}>
                        <i className="bx bx-car text-white text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                          Parking
                        </h4>
                        <p className="text-gray-700">
                          Parking Masséna à proximité<br />
                          Stationnement centre-ville
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Carte Google Maps */}
                <div className="h-96 lg:h-full min-h-[400px] relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.123!2d7.266944!3d43.695833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdd01b0b0b0b0b%3A0x12cdd01b0b0b0b0b!2s22%20Rue%20de%20l%27H%C3%B4tel%20des%20Postes%2C%2006000%20Nice!5e0!3m2!1sfr!2sfr!4v1609459200000!5m2!1sfr!2sfr"
                    width="100%"
                    height="100%"
                    style={{border: 0}}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                    title="Localisation Cabinet EXILAE Avocats Nice"
                  ></iframe>
                  
                  {/* Animation de pin qui apparaît */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg animate-bounce">
                    <i className="bx bx-current-location text-red-600 text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="800">
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto" style={{backgroundColor: '#12255D'}}>
                <i className="bx bx-map text-white text-2xl"></i>
              </div>
              <h4 className="font-bold text-xl mb-2" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                Adresse
              </h4>
              <p className="text-gray-600">
                <span className="font-semibold">Cabinet EXILAE Avocats</span><br />
                22 Rue de l'Hôtel des Postes<br />
                06000 Nice, France
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto" style={{backgroundColor: '#12255D'}}>
                <i className="bx bx-phone text-white text-2xl"></i>
              </div>
              <h4 className="font-bold text-xl mb-2" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                Téléphone
              </h4>
              <p className="text-gray-600">
                <a href="tel:0184748720" className="text-2xl font-bold hover:text-blue-600 transition-colors" style={{color: '#12255D'}}>
                  01 84 74 87 20
                </a>
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto" style={{backgroundColor: '#12255D'}}>
                <i className="bx bx-time text-white text-2xl"></i>
              </div>
              <h4 className="font-bold text-xl mb-2" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                Horaires
              </h4>
              <p className="text-gray-600">
                <span className="font-bold text-green-600">7j/7 de 8h à 22h</span><br />
                <span className="font-bold text-red-600">Urgences acceptées</span>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Services disponibles */}
      <ServicesGrid />

      {/* Avis clients */}
      <ReviewsSection />

      {/* FAQ */}
      <FAQSection />
    </div>
  )
}

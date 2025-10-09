import React, { useState, useEffect } from 'react'
import box1Image from '../IMG/box1.jpg'
import box2Image from '../IMG/box2.jpg'
import box3Image from '../IMG/box3.jpg'
import box4Image from '../IMG/box4.jpg'
import box5Image from '../IMG/box5.jpg'
import box6Image from '../IMG/box6.jpg'
import avocatImageJpg from '../IMG/avocat2.jpg'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    AOS.init()
  }, [])

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs = [
    {
      id: 1,
      question: "Qu'est ce urgence-oqtf.fr ?",
      answer: "Urgence-oqtf.fr est un service du Cabinet d'avocats EXILAE Avocats, avocats en droit des étrangers inscrits aux Barreaux de Paris et Nice, représenté par Maître Grégoire HERVET, avocat Associé, créé pour assister les étrangers qui se voient notifier une obligation de quitter le territoire (OQTF).",
      image: box1Image
    },
    {
      id: 2,
      question: "Est ce possible d'annuler une OQTF ?",
      answer: "Il est possible de contester une OQTF (Obligation de Quitter le Territoire Français) et de la faire annuler. Votre avocat en droit des étranger va vous poser beaucoup de question pour comprendre la situation et les raisons qui ont conduit à son émission afin qu'il puisse la contester.",
      image: box2Image
    },
    {
      id: 3,
      question: "Si le délai de recours est dépassé que puis-je faire ?",
      answer: "Les délais pour contester une décision administrative prise à votre encontre sont très stricts et doivent être respectés. Il est donc impératif que votre conseil introduise le recours dans les délais prévus par la loi car tout recours déposé après l'expiration de ce délai sera considéré comme irrecevable.",
      image: box3Image
    },
    {
      id: 4,
      question: "Je suis marié avec une Française / des enfants français, est ce que l'OQTF est légale ?",
      answer: "Oui, elle est légale. Depuis le 28 janvier 2024, l'article L. 611-3 du CESEDA ne prévoit plus une protection contre l'OQTF pour les personnes mariées à des ressortissants français ou les parents d'enfants français. Désormais, cette disposition n'accorde de protection contre l'éloignement qu'aux mineurs de 18 ans.",
      image: box4Image
    },
    {
      id: 5,
      question: "Quel intérêt de faire le recours avec urgence-oqtf.fr ?",
      answer: "Exilae Avocats est un cabinet qui intervient en droit des étrangers et droit du travail. Ses avocats et juristes interviennent partout en France, sur toutes les questions liées au droit des étrangers et droit du travail des étrangers. Le Cabinet gère plus de 2.000 dossiers par an en droit des étrangers.",
      image: box5Image
    },
    {
      id: 6,
      question: "Combien de temps dure une OQTF ?",
      answer: "Jusqu'à l'entrée en vigueur de la loi immigration du 26 janvier 2024, la durée de validité d'une obligation de quitter le territoire français était limitée à un an. Cette loi a modifié l'article L.731-1 du CESEDA, portant désormais cette durée à trois ans.",
      image: box6Image
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-blue-100/50"></div>
      
      {/* Animated geometric shapes layer 1 - Large blurred shapes */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-10 left-10 w-60 h-60 rounded-full blur-3xl animate-pulse" style={{backgroundColor: '#12255D', animationDuration: '4s'}}></div>
        <div className="absolute top-40 right-20 w-40 h-40 rotate-45 blur-2xl animate-bounce" style={{backgroundColor: '#12255D', animationDuration: '6s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 rounded-full blur-3xl animate-pulse" style={{backgroundColor: '#12255D', animationDuration: '5s'}}></div>
        <div className="absolute bottom-60 right-16 w-32 h-32 rotate-12 blur-2xl animate-bounce" style={{backgroundColor: '#12255D', animationDuration: '7s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-44 h-44 rounded-full blur-3xl animate-pulse" style={{backgroundColor: '#12255D', animationDuration: '4.5s'}}></div>
        <div className="absolute top-1/3 left-1/2 w-24 h-24 rotate-45 blur-2xl animate-bounce" style={{backgroundColor: '#12255D', animationDuration: '5.5s'}}></div>
      </div>
      
      {/* Animated geometric shapes layer 2 - Medium shapes */}
      <div className="absolute inset-0 opacity-6">
        <div className="absolute top-80 left-1/3 w-20 h-40 rotate-12 blur-lg animate-pulse" style={{backgroundColor: '#12255D', animationDuration: '3s'}}></div>
        <div className="absolute bottom-80 right-1/4 w-48 h-12 rotate-45 blur-lg animate-bounce" style={{backgroundColor: '#12255D', animationDuration: '4s'}}></div>
        <div className="absolute top-60 right-1/2 w-12 h-36 rotate-75 blur-lg animate-pulse" style={{backgroundColor: '#12255D', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-28 h-28 rounded-full blur-xl animate-bounce" style={{backgroundColor: '#12255D', animationDuration: '6s'}}></div>
        <div className="absolute top-20 right-1/4 w-16 h-16 rotate-30 blur-lg animate-pulse" style={{backgroundColor: '#12255D', animationDuration: '4.5s'}}></div>
      </div>
      
      {/* Enhanced SVG patterns with animations */}
      <div className="absolute inset-0 pointer-events-none opacity-4">
        <svg className="w-full h-full" viewBox="0 0 1400 900" fill="none">
          <defs>
            {/* Enhanced hexagon pattern */}
            <pattern id="hexagons" x="0" y="0" width="80" height="69" patternUnits="userSpaceOnUse">
              <polygon points="40,3 65,20 65,48 40,65 15,48 15,20" fill="none" stroke="#12255D" strokeWidth="0.3" opacity="0.6"/>
            </pattern>
            
            {/* Dot pattern */}
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#12255D" opacity="0.3"/>
            </pattern>
            
            {/* Line pattern */}
            <pattern id="lines" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="15" x2="30" y2="15" stroke="#12255D" strokeWidth="0.5" opacity="0.2"/>
            </pattern>
          </defs>
          
          {/* Apply patterns to different areas */}
          <rect x="0" y="0" width="500" height="300" fill="url(#hexagons)"/>
          <rect x="600" y="200" width="400" height="400" fill="url(#dots)"/>
          <rect x="200" y="500" width="600" height="200" fill="url(#lines)"/>
          
          {/* Floating animated geometric shapes */}
          <g className="animate-pulse" style={{animationDuration: '3s'}}>
            <circle cx="250" cy="180" r="4" fill="#12255D" opacity="0.4"/>
            <circle cx="950" cy="250" r="3" fill="#12255D" opacity="0.5"/>
            <circle cx="1200" cy="450" r="5" fill="#12255D" opacity="0.3"/>
            <circle cx="180" cy="650" r="3.5" fill="#12255D" opacity="0.4"/>
            <circle cx="700" cy="120" r="4.5" fill="#12255D" opacity="0.3"/>
          </g>
          
          <g className="animate-bounce" style={{animationDuration: '4s'}}>
            <rect x="350" y="350" width="8" height="8" fill="#12255D" opacity="0.4" transform="rotate(45 354 354)"/>
            <rect x="800" y="550" width="6" height="6" fill="#12255D" opacity="0.5" transform="rotate(30 803 553)"/>
            <rect x="1100" y="180" width="7" height="7" fill="#12255D" opacity="0.3" transform="rotate(60 1103.5 183.5)"/>
            <rect x="150" y="450" width="9" height="9" fill="#12255D" opacity="0.4" transform="rotate(15 154.5 454.5)"/>
          </g>
          
          {/* Triangular shapes */}
          <g className="animate-pulse" style={{animationDuration: '5s'}}>
            <polygon points="500,100 510,120 490,120" fill="#12255D" opacity="0.3"/>
            <polygon points="1000,300 1012,325 988,325" fill="#12255D" opacity="0.4"/>
            <polygon points="300,600 315,630 285,630" fill="#12255D" opacity="0.3"/>
          </g>
          
          {/* Enhanced flowing wave elements */}
          <g opacity="0.15">
            <path d="M0,400 Q200,350 400,400 T800,400" stroke="#12255D" strokeWidth="2" fill="none"/>
            <path d="M400,200 Q600,150 800,200 T1200,200" stroke="#12255D" strokeWidth="1.5" fill="none"/>
            <path d="M0,600 Q300,550 600,600 T1200,600" stroke="#12255D" strokeWidth="2.5" fill="none"/>
            
            {/* Additional wave lines */}
            <path d="M0,300 Q150,280 300,300 Q450,320 600,300 Q750,280 900,300 Q1050,320 1200,300" stroke="#12255D" strokeWidth="1" fill="none" opacity="0.6"/>
            <path d="M200,100 Q400,80 600,100 Q800,120 1000,100 Q1200,80 1400,100" stroke="#12255D" strokeWidth="1.2" fill="none" opacity="0.7"/>
            <path d="M0,500 Q250,470 500,500 Q750,530 1000,500 Q1250,470 1400,500" stroke="#12255D" strokeWidth="1.8" fill="none" opacity="0.5"/>
            <path d="M100,700 Q350,680 600,700 Q850,720 1100,700 Q1350,680 1400,700" stroke="#12255D" strokeWidth="1.3" fill="none" opacity="0.6"/>
          </g>
          
          {/* Circular wave patterns */}
          <g opacity="0.1">
            <circle cx="300" cy="200" r="80" fill="none" stroke="#12255D" strokeWidth="1" strokeDasharray="5,5"/>
            <circle cx="300" cy="200" r="100" fill="none" stroke="#12255D" strokeWidth="0.8" strokeDasharray="3,7"/>
            <circle cx="300" cy="200" r="120" fill="none" stroke="#12255D" strokeWidth="0.6" strokeDasharray="8,4"/>
            
            <circle cx="900" cy="400" r="60" fill="none" stroke="#12255D" strokeWidth="1.2" strokeDasharray="4,6"/>
            <circle cx="900" cy="400" r="85" fill="none" stroke="#12255D" strokeWidth="0.9" strokeDasharray="6,3"/>
            <circle cx="900" cy="400" r="110" fill="none" stroke="#12255D" strokeWidth="0.7" strokeDasharray="2,8"/>
            
            <circle cx="1100" cy="150" r="50" fill="none" stroke="#12255D" strokeWidth="1" strokeDasharray="7,3"/>
            <circle cx="1100" cy="150" r="70" fill="none" stroke="#12255D" strokeWidth="0.8" strokeDasharray="5,5"/>
            
            <circle cx="200" cy="600" r="90" fill="none" stroke="#12255D" strokeWidth="1.1" strokeDasharray="3,6"/>
            <circle cx="200" cy="600" r="115" fill="none" stroke="#12255D" strokeWidth="0.7" strokeDasharray="9,2"/>
          </g>
          
          {/* Animated concentric circles */}
          <g className="animate-pulse" style={{animationDuration: '6s'}} opacity="0.08">
            <circle cx="600" cy="300" r="150" fill="none" stroke="#12255D" strokeWidth="2"/>
            <circle cx="600" cy="300" r="180" fill="none" stroke="#12255D" strokeWidth="1.5"/>
            <circle cx="600" cy="300" r="210" fill="none" stroke="#12255D" strokeWidth="1"/>
          </g>
          
          <g className="animate-pulse" style={{animationDuration: '8s'}} opacity="0.06">
            <circle cx="1000" cy="600" r="120" fill="none" stroke="#12255D" strokeWidth="1.8"/>
            <circle cx="1000" cy="600" r="145" fill="none" stroke="#12255D" strokeWidth="1.2"/>
            <circle cx="1000" cy="600" r="170" fill="none" stroke="#12255D" strokeWidth="0.8"/>
          </g>
        </svg>
      </div>
      
      {/* Additional wave circles and lines layer */}
      <div className="absolute inset-0 pointer-events-none opacity-8">
        <svg className="w-full h-full" viewBox="0 0 1400 900" fill="none">
          {/* More wave circles */}
          <g className="animate-pulse" style={{animationDuration: '10s'}}>
            <circle cx="150" cy="300" r="40" fill="none" stroke="#12255D" strokeWidth="1" strokeDasharray="4,4"/>
            <circle cx="150" cy="300" r="60" fill="none" stroke="#12255D" strokeWidth="0.8" strokeDasharray="6,2"/>
            <circle cx="150" cy="300" r="80" fill="none" stroke="#12255D" strokeWidth="0.6" strokeDasharray="2,6"/>
            
            <circle cx="1200" cy="250" r="35" fill="none" stroke="#12255D" strokeWidth="1.2" strokeDasharray="5,3"/>
            <circle cx="1200" cy="250" r="55" fill="none" stroke="#12255D" strokeWidth="0.9" strokeDasharray="3,5"/>
            
            <circle cx="700" cy="700" r="45" fill="none" stroke="#12255D" strokeWidth="1" strokeDasharray="7,2"/>
            <circle cx="700" cy="700" r="70" fill="none" stroke="#12255D" strokeWidth="0.7" strokeDasharray="2,7"/>
            <circle cx="700" cy="700" r="95" fill="none" stroke="#12255D" strokeWidth="0.5" strokeDasharray="4,5"/>
          </g>
          
          {/* Diagonal wave lines */}
          <g opacity="0.12">
            <path d="M0,0 Q200,50 400,0 Q600,50 800,0 Q1000,50 1200,0 Q1400,50 1400,0" stroke="#12255D" strokeWidth="1.5" fill="none"/>
            <path d="M0,50 Q150,100 300,50 Q450,100 600,50 Q750,100 900,50 Q1050,100 1200,50" stroke="#12255D" strokeWidth="1.2" fill="none"/>
            <path d="M200,800 Q400,750 600,800 Q800,750 1000,800 Q1200,750 1400,800" stroke="#12255D" strokeWidth="1.8" fill="none"/>
            <path d="M0,850 Q250,800 500,850 Q750,800 1000,850 Q1250,800 1400,850" stroke="#12255D" strokeWidth="1.3" fill="none"/>
          </g>
          
          {/* Curved connecting lines */}
          <g opacity="0.1">
            <path d="M100,200 Q300,150 500,200 Q700,250 900,200 Q1100,150 1300,200" stroke="#12255D" strokeWidth="1" fill="none" strokeDasharray="10,5"/>
            <path d="M50,400 Q300,350 550,400 Q800,450 1050,400 Q1300,350 1400,400" stroke="#12255D" strokeWidth="1.4" fill="none" strokeDasharray="8,7"/>
            <path d="M0,650 Q200,600 400,650 Q600,700 800,650 Q1000,600 1200,650" stroke="#12255D" strokeWidth="1.1" fill="none" strokeDasharray="6,9"/>
          </g>
          
          {/* Small decorative circles */}
          <g className="animate-bounce" style={{animationDuration: '12s'}} opacity="0.15">
            <circle cx="400" cy="150" r="3" fill="#12255D"/>
            <circle cx="800" cy="350" r="2.5" fill="#12255D"/>
            <circle cx="1150" cy="500" r="3.5" fill="#12255D"/>
            <circle cx="250" cy="750" r="2" fill="#12255D"/>
            <circle cx="950" cy="100" r="4" fill="#12255D"/>
            <circle cx="50" cy="550" r="2.8" fill="#12255D"/>
            <circle cx="650" cy="450" r="3.2" fill="#12255D"/>
          </g>
        </svg>
      </div>
      
      {/* Enhanced floating particles effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDuration: '2s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-500 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-blue-600 rounded-full animate-ping" style={{animationDuration: '2.5s'}}></div>
        <div className="absolute top-1/6 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/4 left-1/6 w-1 h-1 bg-blue-500 rounded-full animate-ping" style={{animationDuration: '3.5s'}}></div>
        
        {/* Additional particles */}
        <div className="absolute top-1/3 left-1/5 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{animationDuration: '5s'}}></div>
        <div className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-blue-600 rounded-full animate-ping" style={{animationDuration: '2.8s'}}></div>
        <div className="absolute top-2/3 left-2/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDuration: '3.2s'}}></div>
        <div className="absolute top-1/8 left-3/4 w-1 h-1 bg-blue-500 rounded-full animate-ping" style={{animationDuration: '4.5s'}}></div>
        <div className="absolute bottom-1/6 right-2/3 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{animationDuration: '3.8s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{backgroundColor: '#12255D'}}>
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>
            Questions fréquentes
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600">
            Trouvez des réponses claires et détaillées aux questions les plus courantes concernant les OQTF et nos services juridiques spécialisés.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Image without overlay */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={faq.image} 
                  alt={`FAQ ${faq.id}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4 leading-tight" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                  {faq.question}
                </h3>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100 mb-4' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
                
                {/* Action button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {openIndex === index ? 'Masquer la réponse' : 'Voir la réponse'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

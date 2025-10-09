import React, { useState, useEffect } from 'react'
import logoImage from '../IMG/logo.png'
import backgroundImage from '../IMG/background.jpg'
import gregoire from '../IMG/exilae.fr-gregoire-hervet-exilae-person.jpg'
import margaux from '../IMG/exilae.fr-margaux-larroucau-margaux.png'
import marta from '../IMG/exilae.fr-marta-nahay-sd-20220923-12659-marta-nahay-web.jpeg'
import sanchez from '../IMG/exilae.fr-sanchez-previl-photo-up-20230906-hervet-5.jpg'

export default function About() {
  const [selectedMember, setSelectedMember] = useState(null)
  const [hoveredMember, setHoveredMember] = useState(null)

  const teamMembers = [
    {
      id: 1,
      name: "Maître Grégoire HERVET",
      title: "Avocat Associé Fondateur",
      speciality: "Droit des étrangers et droit public",
      image: gregoire,
      shortDesc: "Fondateur du cabinet, expert en OQTF",
      fullDescription: "Spécialisé en droit des étrangers depuis plus de 10 ans, Maître HERVET accompagne ses clients dans toutes leurs démarches administratives et contentieuses. Fondateur du cabinet EXILAE, il possède une expertise reconnue en matière de recours contre les OQTF et de régularisation de situation.",
      experience: "10+ ans d'expérience",
      education: "Master en droit public",
      achievements: [
        "Plus de 500 OQTF annulées avec succès",
        "Spécialiste reconnu en droit des étrangers",
        "Fondateur du cabinet EXILAE",
        "Intervenant en formations juridiques",
        "Taux de réussite de 87% en contentieux"
      ],
      languages: ["Français", "Anglais", "Espagnol"],
      phone: "01 84 74 87 20",
      email: "g.hervet@exilae.fr"
    },
    {
      id: 2,
      name: "Maître Margaux LARROUCAU",
      title: "Avocate Associée",
      speciality: "Droit de la famille et droit des étrangers",
      image: margaux,
      shortDesc: "Experte en regroupement familial",
      fullDescription: "Maître LARROUCAU conjugue expertise en droit des étrangers et sensibilité aux questions familiales. Elle accompagne particulièrement les familles dans leurs démarches de regroupement familial et de régularisation, avec une approche humaine et personnalisée.",
      experience: "8+ ans d'expérience",
      education: "Master en droit de la famille",
      achievements: [
        "Experte en regroupement familial",
        "Plus de 300 dossiers de régularisation traités",
        "Spécialiste des situations familiales complexes",
        "Médiatrice certifiée en droit de la famille",
        "Taux de réussite de 82% en droit familial"
      ],
      languages: ["Français", "Anglais", "Italien"],
      phone: "01 84 74 87 20",
      email: "m.larroucau@exilae.fr"
    },
    {
      id: 3,
      name: "Maître Marta NAHAY",
      title: "Avocate Collaboratrice",
      speciality: "Contentieux administratif et droit des étrangers",
      image: marta,
      shortDesc: "Spécialiste en procédures d'urgence",
      fullDescription: "Maître NAHAY apporte son expertise en contentieux administratif au service de la défense des droits des étrangers. Elle excelle dans la préparation des recours et la représentation devant les tribunaux administratifs, particulièrement en référé-suspension.",
      experience: "6+ ans d'expérience",
      education: "Master en contentieux public",
      achievements: [
        "Spécialiste en procédures d'urgence",
        "Taux de réussite de 85% en référé-suspension",
        "Plus de 200 recours devant les TA traités",
        "Experte en droit européen des étrangers",
        "Formation continue en droit européen"
      ],
      languages: ["Français", "Anglais", "Polonais"],
      phone: "01 84 74 87 20",
      email: "m.nahay@exilae.fr"
    },
    {
      id: 4,
      name: "Maître Sanchez PREVIL",
      title: "Avocat Collaborateur",
      speciality: "Droit pénal et droit des étrangers",
      image: sanchez,
      shortDesc: "Double expertise pénal/administratif",
      fullDescription: "Maître PREVIL combine expertise en droit pénal et droit des étrangers, offrant une approche globale dans les dossiers complexes impliquant des aspects pénaux et administratifs. Sa double compétence permet une prise en charge complète des situations les plus délicates.",
      experience: "7+ ans d'expérience",
      education: "Master en droit pénal",
      achievements: [
        "Double expertise pénal/administratif",
        "Spécialiste des interdictions du territoire",
        "Plus de 150 dossiers pénal-étrangers traités",
        "Expert en droit pénal des étrangers",
        "Formation spécialisée en droit pénal international"
      ],
      languages: ["Français", "Créole", "Anglais"],
      phone: "01 84 74 87 20",
      email: "s.previl@exilae.fr"
    }
  ]

  // Fermer le modal si on clique à l'extérieur
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedMember(null)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header simple */}
      <div className="bg-white py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src={logoImage} 
            alt="Logo Exilae Avocats" 
            className="h-32 lg:h-40 w-auto mx-auto mb-6"
          />
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
            NOTRE ÉQUIPE
          </h1>
          <p className="text-lg lg:text-xl text-gray-600">
            Des experts passionnés au service de vos droits
          </p>
        </div>
      </div>

      {/* Section Équipe - Style Netflix Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
              Rencontrez nos avocats
            </h2>
            <p className="text-gray-600 text-lg">
              Cliquez sur une carte pour découvrir l'expertise de chaque avocat
            </p>
          </div>

          {/* Grid Netflix Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="group relative cursor-pointer transform transition-all duration-500 ease-out"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                onClick={() => setSelectedMember(member)}
                style={{
                  transform: hoveredMember === member.id ? 'scale(1.05) translateY(-10px)' : 'scale(1)',
                  zIndex: hoveredMember === member.id ? 20 : 1
                }}
              >
                {/* Carte principale */}
                <div className="relative overflow-hidden rounded-lg shadow-xl bg-white">
                  <div className="aspect-[3/4] relative">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* Info de base */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1 line-clamp-2" style={{fontFamily: 'Poppins, sans-serif'}}>
                        {member.name}
                      </h3>
                      <p className="text-red-400 font-medium text-sm mb-1">
                        {member.title}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {member.shortDesc}
                      </p>
                    </div>
                    
                    {/* Hover overlay */}
                    <div 
                      className={`absolute inset-0 bg-blue-600/90 flex items-center justify-center transition-opacity duration-300 ${
                        hoveredMember === member.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="text-center text-white">
                        <i className="bx bx-info-circle text-4xl mb-2"></i>
                        <p className="font-semibold">Cliquez pour en savoir plus</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
              Certifications & Spécialisations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre expertise reconnue par les institutions juridiques françaises
            </p>
          </div>

          {/* Grid des certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            
            {/* Certificat CNB - Droit des étrangers */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              {/* Badge certificat minimaliste */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-300">
                  <div className="text-center">
                    <div className="text-gray-700 font-bold text-xs">CNB</div>
                    <div className="text-gray-700 text-2xl">⚖️</div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                Certificat CNB
              </h3>
              <p className="text-gray-700 mb-4">
                Spécialisation en <strong>Droit des étrangers</strong>
              </p>
              <p className="text-sm text-gray-600">
                Certification officielle du Conseil National des Barreaux attestant de notre expertise en droit des étrangers
              </p>
            </div>

            {/* Formation continue */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              {/* Badge formation minimaliste */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-300">
                  <div className="text-center">
                    <div className="text-gray-700 font-bold text-xs">40H+</div>
                    <div className="text-gray-700 text-2xl">📚</div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                Formation Continue
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>40h+ annuelles</strong> de formation spécialisée
              </p>
              <p className="text-sm text-gray-600">
                Mise à jour permanente des connaissances en droit des étrangers et contentieux administratif
              </p>
            </div>

            {/* Expertise judiciaire */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              {/* Badge expertise minimaliste */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-300">
                  <div className="text-center">
                    <div className="text-gray-700 font-bold text-xs">T.A.</div>
                    <div className="text-gray-700 text-2xl">🏛️</div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                Expertise Judiciaire
              </h3>
              <p className="text-gray-700 mb-4">
                Reconnaissance par les <strong>Tribunaux Administratifs</strong>
              </p>
              <p className="text-sm text-gray-600">
                Expertise reconnue par les juridictions administratives en matière de droit des étrangers
              </p>
            </div>

          </div>

          {/* Section Reconnaissances */}
          <div className="bg-gray-50 rounded-3xl p-12">
            <h3 className="text-2xl font-bold text-center mb-12" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
              Reconnaissances Professionnelles
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              <div className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <i className="bx bx-buildings text-3xl" style={{color: '#12255D'}}></i>
                </div>
                <h4 className="font-bold mb-2" style={{color: '#12255D'}}>Barreaux de Paris & Nice</h4>
                <p className="text-gray-600 text-sm">Inscrits aux barreaux de Paris et Nice</p>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <i className="bx bx-group text-3xl" style={{color: '#12255D'}}></i>
                </div>
                <h4 className="font-bold mb-2" style={{color: '#12255D'}}>Associations Spécialisées</h4>
                <p className="text-gray-600 text-sm">Membres d'associations de droit des étrangers</p>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <i className="bx bx-trophy text-3xl" style={{color: '#12255D'}}></i>
                </div>
                <h4 className="font-bold mb-2" style={{color: '#12255D'}}>Taux de Réussite</h4>
                <p className="text-gray-600 text-sm">85% de succès en contentieux administratif</p>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <i className="bx bx-time-five text-3xl" style={{color: '#12255D'}}></i>
                </div>
                <h4 className="font-bold mb-2" style={{color: '#12255D'}}>Expérience Cumulée</h4>
                <p className="text-gray-600 text-sm">Plus de 30 ans d'expérience de l'équipe</p>
              </div>

            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3 text-blue-800">
              <i className="bx bx-check-circle mr-2"></i>
              <span className="font-semibold">Cabinet certifié et reconnu par les instances juridiques françaises</span>
            </div>
          </div>

        </div>
      </section>

      {/* Modal Netflix Style */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-600/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <i className="bx bx-x text-2xl"></i>
            </button>
            
            {/* Content */}
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="lg:w-1/2 relative">
                <div className="aspect-[4/5] lg:aspect-auto lg:h-full">
                  <img 
                    src={selectedMember.image} 
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 lg:to-white/30"></div>
                </div>
              </div>
              
              {/* Info */}
              <div className="lg:w-1/2 p-8 text-gray-800 overflow-y-auto max-h-[70vh] lg:max-h-none">
                <h2 className="text-3xl font-bold mb-2" style={{fontFamily: 'Poppins, sans-serif', color: '#12255D'}}>
                  {selectedMember.name}
                </h2>
                <p className="text-red-600 font-semibold text-lg mb-1">
                  {selectedMember.title}
                </p>
                <p className="text-blue-600 font-medium mb-6">
                  {selectedMember.speciality}
                </p>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {selectedMember.fullDescription}
                </p>
                
                {/* Réalisations */}
                <div className="mb-6">
                  <h4 className="font-semibold text-blue-600 mb-3">Réalisations clés</h4>
                  <ul className="space-y-2">
                    {selectedMember.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <i className="bx bx-check text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

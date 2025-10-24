import React, { useEffect, useState, useRef } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function ReviewsSection() {
  const [counters, setCounters] = useState({
    rating: 0,
    dossiers: 0,
    success: 0,
    experience: 0
  })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const sectionRef = useRef(null)

  const reviews = [
    {
      id: 1,
      name: "Ahmed M.",
      city: "Paris",
      rating: 5,
      date: "Il y a 2 jours",
      situation: "OQTF annulée",
      review: "Grâce à Maître HERVET et son équipe, j'ai pu faire annuler mon OQTF. Leur professionnalisme et leur expertise m'ont permis de régulariser ma situation. Je recommande vivement leurs services.",
      avatar: "AM"
    },
    {
      id: 2,
      name: "Fatima B.",
      city: "Nice",
      rating: 5,
      date: "Il y a 5 jours",
      situation: "Titre de séjour obtenu",
      review: "Service irréprochable, résultat au rendez-vous. L'équipe m'a accompagnée tout au long de la procédure avec patience et compétence. Merci pour votre professionnalisme.",
      avatar: "FB"
    },
    {
      id: 3,
      name: "Jean K.",
      city: "Lyon",
      rating: 5,
      date: "Il y a 1 semaine",
      situation: "Recours gagné",
      review: "Avocat très compétent, à l'écoute et disponible. Mon recours a été accepté en première instance. Une équipe formidable qui mérite toute ma confiance.",
      avatar: "JK"
    },
    {
      id: 4,
      name: "Maria S.",
      city: "Marseille",
      rating: 5,
      date: "Il y a 2 semaines",
      situation: "Régularisation réussie",
      review: "Excellente prise en charge de mon dossier. Les délais ont été respectés et le résultat est parfait. Je recommande sans hésitation ce cabinet d'avocats.",
      avatar: "MS"
    },
    {
      id: 5,
      name: "Omar T.",
      city: "Toulouse",
      rating: 5,
      date: "Il y a 3 semaines",
      situation: "OQTF suspendue",
      review: "Intervention rapide et efficace. Mon OQTF a été suspendue grâce à leur expertise juridique. Une équipe réactive qui comprend l'urgence des situations.",
      avatar: "OT"
    },
    {
      id: 6,
      name: "Aminata D.",
      city: "Bordeaux",
      rating: 5,
      date: "Il y a 1 mois",
      situation: "Carte de séjour obtenue",
      review: "Accompagnement personnalisé et professionnel. J'ai obtenu ma carte de séjour grâce à leur aide précieuse. Merci pour votre dévouement et votre expertise.",
      avatar: "AD"
    }
  ]

  useEffect(() => {
    AOS.init()
  }, [])

  // Pas besoin d'useEffect pour l'animation continue

  // Animation des compteurs
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateCounters()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [hasAnimated])

  const animateCounters = () => {
    const targets = {
      rating: 4.9,
      dossiers: 2000,
      success: 97,
      experience: 15
    }

    const duration = 2000 // 2 secondes
    const steps = 60 // 60 FPS
    const stepDuration = duration / steps

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      // Fonction d'easing pour une animation plus fluide
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setCounters({
        rating: Math.min(targets.rating * easeOutQuart, targets.rating),
        dossiers: Math.min(Math.floor(targets.dossiers * easeOutQuart), targets.dossiers),
        success: Math.min(Math.floor(targets.success * easeOutQuart), targets.success),
        experience: Math.min(Math.floor(targets.experience * easeOutQuart), targets.experience)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setCounters(targets) // S'assurer que les valeurs finales sont exactes
      }
    }, stepDuration)
  }

  const getAvatarColor = (index) => {
    const colors = [
      'from-blue-500 to-blue-700',
      'from-red-500 to-red-700',
      'from-green-500 to-green-700',
      'from-purple-500 to-purple-700',
      'from-orange-500 to-orange-700',
      'from-indigo-500 to-indigo-700'
    ]
    return colors[index % colors.length]
  }

  const getSituationColor = (situation) => {
    if (situation.includes('annulée') || situation.includes('obtenu') || situation.includes('gagné') || situation.includes('réussie')) {
      return 'bg-green-100 text-green-800'
    }
    if (situation.includes('suspendue')) {
      return 'bg-orange-100 text-orange-800'
    }
    return 'bg-blue-100 text-blue-800'
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-blue-100/50"></div>
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 opacity-6">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full blur-2xl animate-pulse" style={{backgroundColor: '#12255D', animationDuration: '4s'}}></div>
        <div className="absolute top-60 right-32 w-28 h-28 rotate-45 blur-xl animate-bounce" style={{backgroundColor: '#DC2626', animationDuration: '6s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse" style={{backgroundColor: '#12255D', animationDuration: '5s'}}></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 rotate-12 blur-xl animate-bounce" style={{backgroundColor: '#DC2626', animationDuration: '7s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full blur-xl animate-pulse" style={{backgroundColor: '#12255D', animationDuration: '3.5s'}}></div>
      </div>

      {/* SVG patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-3">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <defs>
            <pattern id="reviewsHexagons" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 50,15 50,37 30,50 10,37 10,15" fill="none" stroke="#12255D" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#reviewsHexagons)"/>
          
          {/* Floating elements */}
          <g className="animate-pulse" style={{animationDuration: '3s'}}>
            <circle cx="200" cy="150" r="3" fill="#12255D" opacity="0.4"/>
            <circle cx="800" cy="250" r="2.5" fill="#DC2626" opacity="0.4"/>
            <circle cx="1000" cy="400" r="4" fill="#12255D" opacity="0.3"/>
            <circle cx="400" cy="600" r="3.5" fill="#DC2626" opacity="0.3"/>
          </g>
        </svg>
      </div>
      
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          
          .reviews-scroll-container {
            overflow: hidden;
            white-space: nowrap;
          }
          
          .reviews-scroll-track {
            display: flex;
            animation: scroll 60s linear infinite;
            gap: 3rem;
          }
          
          @media (max-width: 768px) {
            .reviews-scroll-track {
              gap: 1.5rem;
            }
          }
          
          @media (max-width: 480px) {
            .reviews-scroll-track {
              gap: 1rem;
            }
          }
          
          .reviews-scroll-track:hover {
            animation-play-state: paused;
          }
          
          .review-card {
            flex: 0 0 600px;
            white-space: normal;
            display: inline-block;
            height: auto;
            min-height: 320px;
          }
          
          @media (max-width: 768px) {
            .review-card {
              flex: 0 0 280px;
              min-height: 300px;
            }
          }
          
          @media (max-width: 480px) {
            .review-card {
              flex: 0 0 250px;
              min-height: 280px;
            }
          }
        `}</style>
        {/* Section Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8" style={{backgroundColor: '#12255D'}}>
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-8" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>
            Avis de nos clients
          </h2>
          <p className="text-xl max-w-5xl mx-auto leading-relaxed text-gray-600">
            Découvrez les témoignages de nos clients satisfaits et leurs réussites dans leurs démarches juridiques. Plus de 2000 dossiers traités avec succès chaque année.
          </p>
        </div>

        {/* Reviews Défilement horizontal continu */}
        <div className="reviews-scroll-container mb-16">
          <div className="reviews-scroll-track">
            {/* Premier set d'avis */}
            {reviews.map((review, index) => (
              <div 
                key={`first-${review.id}`}
                className="review-card group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getAvatarColor(index)} flex items-center justify-center text-white font-bold text-sm`}>
                        {review.avatar}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-bold text-gray-900">{review.name}</h4>
                        <p className="text-sm text-gray-500">{review.city}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>

                  {/* Situation Badge */}
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getSituationColor(review.situation)}`}>
                      {review.situation}
                    </span>
                  </div>
                </div>

                {/* Review Content */}
                <div className="px-6 pb-6">
                  <div className="relative">
                    <svg className="absolute -top-2 -left-2 w-8 h-8 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-700 leading-relaxed text-sm pl-6">
                      "{review.review}"
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Avis vérifié</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Google</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Deuxième set d'avis pour la continuité */}
            {reviews.map((review, index) => (
              <div 
                key={`second-${review.id}`}
                className="review-card group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getAvatarColor(index)} flex items-center justify-center text-white font-bold text-sm`}>
                        {review.avatar}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-bold text-gray-900">{review.name}</h4>
                        <p className="text-sm text-gray-500">{review.city}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>

                  {/* Situation Badge */}
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getSituationColor(review.situation)}`}>
                      {review.situation}
                    </span>
                  </div>
                </div>

                {/* Review Content */}
                <div className="px-6 pb-6">
                  <div className="relative">
                    <svg className="absolute -top-2 -left-2 w-8 h-8 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-700 leading-relaxed text-sm pl-6">
                      "{review.review}"
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Avis vérifié</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Google</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Stats Section */}
        <div ref={sectionRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-20" data-aos="fade-up" data-aos-delay="600">
          <div className="text-center bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-5xl font-bold mb-3 transition-all duration-300" style={{color: '#12255D'}}>
              {counters.rating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-6 h-6 text-yellow-400 transition-all duration-300 ${hasAnimated ? 'animate-pulse' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  style={{animationDelay: `${i * 100}ms`}}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-base text-gray-600 font-semibold">Note moyenne</p>
          </div>

          <div className="text-center bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-5xl font-bold mb-3 transition-all duration-300" style={{color: '#12255D'}}>
              {counters.dossiers.toLocaleString()}+
            </div>
            <p className="text-base text-gray-600 font-semibold">Dossiers traités<br/>par an</p>
          </div>

          <div className="text-center bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-5xl font-bold mb-3 transition-all duration-300" style={{color: '#12255D'}}>
              {counters.success}%
            </div>
            <p className="text-base text-gray-600 font-semibold">Taux de<br/>réussite</p>
          </div>

          <div className="text-center bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-5xl font-bold mb-3 transition-all duration-300" style={{color: '#12255D'}}>
              {counters.experience}+
            </div>
            <p className="text-base text-gray-600 font-semibold">Années<br/>d'expérience</p>
          </div>
        </div>

        {/* Google Reviews Integration */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10 mb-20" data-aos="fade-up" data-aos-delay="800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Google Reviews */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <svg className="w-10 h-10 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <div>
                  <h3 className="text-2xl font-bold" style={{color: '#12255D'}}>Google Reviews</h3>
                  <p className="text-sm text-gray-600">Avis clients authentiques</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="flex mr-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-900">4.9/5</span>
              </div>
              
              <p className="text-gray-600 mb-4">
                Basé sur <span className="font-semibold">247 avis</span> clients
              </p>
            </div>

            {/* Right - Rating Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 w-8">5★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
                <span className="text-sm text-gray-600">92%</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 w-8">4★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{width: '6%'}}></div>
                </div>
                <span className="text-sm text-gray-600">6%</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 w-8">3★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{width: '1%'}}></div>
                </div>
                <span className="text-sm text-gray-600">1%</span>
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
        </div>

        {/* Vimeo Video avec coordonnées - Design sobre Apple */}
        <div className="max-w-5xl mx-auto" data-aos="fade-up" data-aos-delay="1000">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 lg:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Vidéo à gauche */}
              <div className="flex justify-center">
                <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
                  <iframe src="https://player.vimeo.com/video/1125961773?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="100%" height="500" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerPolicy="strict-origin-when-cross-origin" title="v0f300gc0001d2bhkenog65q3jr5o6m0" className="rounded-2xl"></iframe>
                </div>
              </div>
              
              {/* Coordonnées de contact à droite */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-semibold mb-2" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif', fontWeight: '600', letterSpacing: '-0.02em'}}>
                    Nous contacter
                  </h3>
                  <p className="text-gray-500 text-sm">Disponibles pour vous accompagner</p>
                </div>
                
                {/* Téléphone */}
                <div className="group">
                  <div className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 transition-colors">
                      <svg className="w-5 h-5" style={{color: '#12255D'}} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Téléphone</p>
                      <a href="tel:0184748720" className="text-base font-medium hover:underline" style={{color: '#12255D'}}>
                        01 84 74 87 20
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Email */}
                <div className="group">
                  <div className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 transition-colors">
                      <svg className="w-5 h-5" style={{color: '#12255D'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Email</p>
                      <a href="mailto:contact@urgence-oqtf.fr" className="text-base font-medium hover:underline" style={{color: '#12255D'}}>
                        contact@urgence-oqtf.fr
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Adresse Paris */}
                <div className="group">
                  <div className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 transition-colors">
                      <svg className="w-5 h-5" style={{color: '#12255D'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Paris</p>
                      <p className="text-base font-medium" style={{color: '#12255D'}}>
                        94 Boulevard Flandrin<br />
                        75016 Paris
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Adresse Nice */}
                <div className="group">
                  <div className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 transition-colors">
                      <svg className="w-5 h-5" style={{color: '#12255D'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Nice</p>
                      <p className="text-base font-medium" style={{color: '#12255D'}}>
                        22 Rue de l'Hôtel des Postes<br />
                        06000 Nice
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* TikTok */}
                <div className="group">
                  <div className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-black group-hover:bg-gray-800 transition-colors">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">TikTok</p>
                      <a href="https://www.tiktok.com/@le_maitre_a_dit" target="_blank" rel="noopener noreferrer" className="text-base font-medium hover:underline" style={{color: '#12255D'}}>
                        @le_maitre_a_dit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}




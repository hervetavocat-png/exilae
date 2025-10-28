import React, { useState } from 'react'
import backgroundImage from '../IMG/background.jpg'

export default function FAQ2() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs = [
    {
      id: 1,
      question: "Qu'est ce urgence-oqtf.fr ?",
      answer: "Urgence-oqtf.fr est un service du Cabinet d'avocats EXILAE Avocats, avocats en droit des étrangers inscrits aux Barreaux de Paris et Nice, représenté par Maître Grégoire HERVET, avocat Associé, créé pour assister les étrangers qui se voient notifier une obligation de quitter le territoire (OQTF)."
    },
    {
      id: 2,
      question: "Est ce possible d'annuler une OQTF ?",
      answer: "Il est possible de contester une OQTF (Obligation de Quitter le Territoire Français) et de la faire annuler. Votre avocat en droit des étranger va vous poser beaucoup de question pour comprendre la situation et les raisons qui ont conduit à son émission afin qu'il puisse la contester."
    },
    {
      id: 3,
      question: "Si le délai de recours est dépassé que puis-je faire ?",
      answer: "Les délais pour contester une décision administrative prise à votre encontre sont très stricts et doivent être respectés. Il est donc impératif que votre conseil introduise le recours dans les délais prévus par la loi car tout recours déposé après l'expiration de ce délai sera considéré comme irrecevable."
    },
    {
      id: 4,
      question: "Je suis marié avec une Française / des enfants français, est ce que l'OQTF est légale ?",
      answer: "Oui, elle est légale. Depuis le 28 janvier 2024, l'article L. 611-3 du CESEDA ne prévoit plus une protection contre l'OQTF pour les personnes mariées à des ressortissants français ou les parents d'enfants français. Désormais, cette disposition n'accorde de protection contre l'éloignement qu'aux mineurs de 18 ans."
    },
    {
      id: 5,
      question: "Quel intérêt de faire le recours avec urgence-oqtf.fr ?",
      answer: "Exilae Avocats est un cabinet qui intervient en droit des étrangers et droit du travail. Ses avocats et juristes interviennent partout en France, sur toutes les questions liées au droit des étrangers et droit du travail des étrangers. Le Cabinet gère plus de 2.000 dossiers par an en droit des étrangers."
    },
    {
      id: 6,
      question: "Combien de temps dure une OQTF ?",
      answer: "Jusqu'à l'entrée en vigueur de la loi immigration du 26 janvier 2024, la durée de validité d'une obligation de quitter le territoire français était limitée à un an. Cette loi a modifié l'article L.731-1 du CESEDA, portant désormais cette durée à trois ans."
    },
    {
      id: 7,
      question: "La préfecture m'a informé d'une décision définitive mais je n'ai pas reçu l'OQTF, que faire ?",
      answer: "Si vous n'avez pas reçu votre OQTF mais que la préfecture vous informe d'une décision définitive, il est urgent de contacter un avocat spécialisé en droit des étrangers. La notification formelle de l'OQTF fait courir les délais de recours. Sans réception de l'OQTF, vous devez immédiatement demander une copie à la préfecture et consulter un avocat pour vérifier vos délais et options de recours. Ne laissez pas cette situation sans réponse car les délais sont stricts et peuvent compromettre vos droits."
    }
  ]

  return (
    <section 
      className="py-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{backgroundColor: '#12255D'}}>
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
            Questions Fréquentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement les réponses aux questions les plus courantes sur les OQTF
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none"
              >
                <h3 className="text-lg font-bold pr-8" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg 
                    className={`w-6 h-6 text-red-600 transform transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <div className="h-px bg-gray-200 mb-4"></div>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="400">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
              Vous avez d'autres questions ?
            </h3>
            <p className="text-gray-600 mb-6">
              Notre équipe d'avocats spécialisés est là pour vous aider
            </p>
            <button 
              onClick={() => window.location.href = 'tel:0763560150'}
              className="bg-red-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
              title="Appeler le 07 63 56 01 50"
            >
              Contactez-nous
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

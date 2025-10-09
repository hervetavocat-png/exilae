import React from 'react'

export default function TestimonialSection() {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Image */}
          <div className="relative">
            <div className="w-full h-80 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-300">
                <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto mb-4"></div>
                <p>Photo du client satisfait</p>
              </div>
            </div>
            
            {/* Quote decoration */}
            <div className="absolute -top-4 -left-4 text-6xl text-red-600 font-serif">"</div>
          </div>
          
          {/* Right Content - Testimonial */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>Témoignage client</h2>
              
              {/* Stars Rating */}
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-xl leading-relaxed mb-6 italic">
                "Grâce à Maître Dupont et son équipe, j'ai pu faire annuler mon OQTF. 
                Leur professionnalisme et leur expertise m'ont permis de régulariser ma situation. 
                Je recommande vivement leurs services à toute personne dans ma situation."
              </blockquote>
              
              <div className="border-l-4 border-red-600 pl-4">
                <p className="font-semibold text-lg">Ahmed M.</p>
                <p className="text-blue-200">Client depuis 2023</p>
                <p className="text-blue-200 text-sm">OQTF annulée - Titre de séjour obtenu</p>
              </div>
            </div>
            
            <button className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors">
              VOIR PLUS DE TÉMOIGNAGES
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

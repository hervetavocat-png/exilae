import React from 'react'

export default function NewsSection() {
  const newsArticles = [
    {
      title: "Nouvelles procédures OQTF 2024",
      excerpt: "Les dernières modifications législatives concernant les obligations de quitter le territoire français.",
      date: "15 Mars 2024",
      category: "Législation",
      readTime: "5 min de lecture"
    },
    {
      title: "Régularisation par le travail",
      excerpt: "Guide complet sur les nouvelles possibilités de régularisation par l'activité professionnelle.",
      date: "10 Mars 2024",
      category: "Régularisation",
      readTime: "8 min de lecture"
    },
    {
      title: "Droit au regroupement familial",
      excerpt: "Tout ce qu'il faut savoir sur les conditions et procédures du regroupement familial en 2024.",
      date: "5 Mars 2024",
      category: "Famille",
      readTime: "6 min de lecture"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{backgroundColor: '#12255D'}}>
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>Dernières nouvelles</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Restez informé des dernières actualités juridiques et des évolutions législatives 
            dans le domaine du droit des étrangers
          </p>
        </div>
        
        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {newsArticles.map((article, index) => (
            <article key={index} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              {/* Article Image Placeholder */}
              <div className="h-48 bg-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm">Image de l'article</p>
                </div>
              </div>
              
              {/* Article Content */}
              <div className="p-6">
                {/* Category and Date */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-sm">{article.date}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                  {article.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                {/* Read More */}
                <div className="flex items-center justify-between">
                  <button className="text-red-600 font-medium hover:text-red-700 transition-colors">
                    Lire la suite →
                  </button>
                  <span className="text-gray-400 text-sm">{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Newsletter Subscription */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>
            Restez informé de nos actualités
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Abonnez-vous à notre newsletter pour recevoir les dernières informations 
            juridiques et nos conseils d'experts directement dans votre boîte mail.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors whitespace-nowrap">
                S'abonner
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              Pas de spam, désabonnement possible à tout moment.
            </p>
          </div>
        </div>
        
        {/* View All News */}
        <div className="text-center mt-12">
          <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
            VOIR TOUTES LES ACTUALITÉS
          </button>
        </div>
      </div>
    </section>
  )
}

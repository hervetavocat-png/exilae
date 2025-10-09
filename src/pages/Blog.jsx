import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import blogService from '../services/blogService'
import logoImage from '../IMG/logo.png'

export default function Blog() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      setLoading(true)
      const response = await blogService.getAllArticles()
      if (response.success) {
        setArticles(response.data || [])
        setError(null)
      } else {
        setError(response.message || 'Impossible de charger les articles')
      }
    } catch (err) {
      console.error('Erreur chargement articles:', err)
      setError('Impossible de charger les articles')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const extractFirstImage = (htmlContent) => {
    if (!htmlContent) return null
    const div = document.createElement('div')
    div.innerHTML = htmlContent
    const img = div.querySelector('img')
    return img ? img.src : null
  }

  const getArticleImage = (article) => {
    return article.image_url || extractFirstImage(article.content)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logo Section - en dehors */}
      <section className="py-20 bg-white pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src={logoImage} 
            alt="Logo Exilae Avocats" 
            className="h-32 lg:h-40 w-auto mx-auto"
          />
        </div>
      </section>

      {/* Hero Section Bleu - seulement les titres */}
      <div className="text-white relative overflow-hidden" style={{backgroundColor: '#12255D'}}>
        {/* Wave decoration */}
        <div className="absolute right-0 top-0 w-full h-full pointer-events-none">
          <svg className="absolute right-0 top-0 w-full h-full opacity-15" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid slice">
            <defs>
              <linearGradient id="waveGradient2" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M600 80 C500 85, 400 95, 300 110 C200 125, 100 140, 0 160" stroke="url(#waveGradient2)" strokeWidth="0.5" fill="none"/>
            <path d="M600 100 C500 105, 400 115, 300 130 C200 145, 100 160, 0 180" stroke="url(#waveGradient2)" strokeWidth="0.5" fill="none"/>
            <path d="M600 120 C500 125, 400 135, 300 150 C200 165, 100 180, 0 200" stroke="url(#waveGradient2)" strokeWidth="0.5" fill="none"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight" style={{fontFamily: 'Poppins, sans-serif'}}>
            Blog Juridique
          </h1>
          <p className="text-lg lg:text-xl opacity-90">
            Actualités, conseils et analyses en droit des étrangers
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des articles...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <i className="bx bx-error text-5xl text-red-500 mb-4"></i>
            <p className="text-red-700 text-lg">{error}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <i className="bx bx-edit text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg">
              Aucun article disponible pour le moment
            </p>
            <p className="text-gray-400 mt-2">
              Revenez bientôt pour découvrir nos analyses juridiques
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const articleImage = getArticleImage(article)
              return (
              <article 
                key={article.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {articleImage && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={articleImage} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  {article.status && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full mb-3">
                      {article.status}
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-3 text-gray-900 hover:text-blue-900 transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                  {article.published_date && (
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <i className="bx bx-calendar mr-1"></i>
                      {formatDate(article.published_date)}
                    </div>
                  )}
                  {article.id && (
                    <Link
                      to={`/blog/${article.id}`}
                      className="inline-flex items-center text-blue-900 font-semibold hover:text-blue-700 transition-colors"
                    >
                      Lire l'article
                      <i className="bx bx-right-arrow-alt ml-1 text-xl"></i>
                    </Link>
                  )}
                </div>
              </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

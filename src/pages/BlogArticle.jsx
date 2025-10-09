import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogService'

export default function BlogArticle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadArticle()
  }, [id])

  const loadArticle = async () => {
    try {
      setLoading(true)
      const response = await blogService.getArticleById(id)
      if (response.success) {
        setArticle(response.data)
        setError(null)
      } else {
        setError(response.message || 'Article non trouvé')
      }
    } catch (err) {
      console.error('Erreur chargement article:', err)
      setError('Impossible de charger l\'article')
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <i className="bx bx-error text-5xl text-red-500 mb-4"></i>
            <p className="text-red-700 text-lg mb-4">{error || 'Article non trouvé'}</p>
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <i className="bx bx-arrow-back mr-2"></i>
              Retour au blog
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Bouton retour */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center text-blue-900 hover:text-blue-700 font-medium transition-colors"
        >
          <i className="bx bx-arrow-back mr-2 text-xl"></i>
          Retour aux articles
        </button>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image de couverture */}
          {article.image_url && (
            <div className="w-full h-96 overflow-hidden">
              <img 
                src={article.image_url} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Contenu */}
          <div className="p-8 md:p-12">
            {/* Statut */}
            {article.status && (
              <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full mb-4">
                {article.status}
              </span>
            )}

            {/* Titre */}
            <h1 className="text-4xl font-bold mb-6 text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>
              {article.title}
            </h1>

            {/* Métadonnées */}
            {article.published_date && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
                <i className="bx bx-calendar text-xl"></i>
                <span>{formatDate(article.published_date)}</span>
              </div>
            )}

            {/* Extrait */}
            {article.excerpt && (
              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 mb-8 rounded-r-lg">
                <p className="text-lg text-gray-700 italic">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Contenu principal */}
            <div className="prose prose-lg max-w-none">
              {article.content ? (
                <div 
                  className="text-gray-800 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                <p className="text-gray-600 italic">Contenu non disponible</p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {article.created_at && (
                    <p>Publié le {formatDate(article.created_at)}</p>
                  )}
                  {article.updated_at && article.updated_at !== article.created_at && (
                    <p className="mt-1">Mis à jour le {formatDate(article.updated_at)}</p>
                  )}
                </div>
                <button
                  onClick={() => navigate('/blog')}
                  className="inline-flex items-center px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Voir plus d'articles
                  <i className="bx bx-right-arrow-alt ml-2 text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}


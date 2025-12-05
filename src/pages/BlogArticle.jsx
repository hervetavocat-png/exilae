import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogService'
import DOMPurify from 'dompurify'
import SEO from '../components/SEO'

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


  const shareToSocialMedia = (platform) => {
    const articleUrl = window.location.href
    const articleTitle = article?.title || 'Article - URGENCE OQTF'

    let shareUrl = ''

    switch(platform) {
      case 'Facebook':
        // Facebook partage avec aperçu Open Graph automatique
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`
        window.open(shareUrl, '_blank', 'width=600,height=400')
        break

      case 'Twitter':
        // Twitter/X partage avec aperçu Open Graph
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(articleTitle)}`
        window.open(shareUrl, '_blank', 'width=550,height=420')
        break

      case 'LinkedIn':
        // LinkedIn partage avec aperçu Open Graph
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`
        window.open(shareUrl, '_blank', 'width=600,height=600')
        break

      case 'WhatsApp':
        // WhatsApp partage avec aperçu automatique du lien
        shareUrl = `https://wa.me/?text=${encodeURIComponent(articleTitle + ' - ' + articleUrl)}`
        window.open(shareUrl, '_blank')
        break

      default:
        alert('Réseau social non supporté')
    }
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('✅ Lien copié dans le presse-papiers !')
    }).catch(err => {
      console.error('Erreur lors de la copie:', err)
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

  // Préparer les données Open Graph
  const articleUrl = typeof window !== 'undefined' ? window.location.href : `https://urgence-oqtf.fr/blog/${id}`
  const articleImage = article?.image_url || 'https://urgence-oqtf.fr/og-image.jpg'
  const articleDescription = article?.excerpt || 'Découvrez nos conseils et actualités sur le droit des étrangers et les recours OQTF.'

  return (
    <>
      {/* Meta tags SEO et Open Graph */}
      <SEO
        title={`${article.title} | Blog URGENCE OQTF`}
        description={articleDescription}
        image={articleImage}
        url={articleUrl}
        type="article"
        article={{
          publishedTime: article.published_date || article.created_at,
          modifiedTime: article.updated_at,
          author: 'URGENCE OQTF',
          section: 'Droit des étrangers'
        }}
      />

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
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(article.content, {
                      ADD_TAGS: ['iframe'],
                      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
                    })
                  }}
                />
              ) : (
                <p className="text-gray-600 italic">Contenu non disponible</p>
              )}
            </div>

            {/* Partager sur les réseaux sociaux */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Partager cet article</h3>
              <p className="text-sm text-gray-600 mb-4">Partagez le lien de cet article sur vos réseaux sociaux</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => shareToSocialMedia('Facebook')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors"
                  title="Partager sur Facebook"
                >
                  <i className="bx bxl-facebook text-xl"></i>
                  <span className="font-medium">Facebook</span>
                </button>

                <button
                  onClick={() => shareToSocialMedia('Twitter')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1A94DA] transition-colors"
                  title="Partager sur Twitter/X"
                >
                  <i className="bx bxl-twitter text-xl"></i>
                  <span className="font-medium">Twitter</span>
                </button>

                <button
                  onClick={() => shareToSocialMedia('LinkedIn')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#095196] transition-colors"
                  title="Partager sur LinkedIn"
                >
                  <i className="bx bxl-linkedin text-xl"></i>
                  <span className="font-medium">LinkedIn</span>
                </button>

                <button
                  onClick={() => shareToSocialMedia('WhatsApp')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BD5A] transition-colors"
                  title="Partager sur WhatsApp"
                >
                  <i className="bx bxl-whatsapp text-xl"></i>
                  <span className="font-medium">WhatsApp</span>
                </button>

                <button
                  onClick={copyLinkToClipboard}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  title="Copier le lien"
                >
                  <i className="bx bx-link text-xl"></i>
                  <span className="font-medium">Copier le lien</span>
                </button>
              </div>
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
    </>
  )
}


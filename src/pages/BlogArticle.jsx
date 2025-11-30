import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogService'
import DOMPurify from 'dompurify'

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

  const extractTextFromHtml = (html) => {
    if (!html) return ''
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  const exportContentForSocialMedia = (platform) => {
    const articleTitle = article?.title || ''
    const articleContent = extractTextFromHtml(article?.content || '')
    const articleUrl = window.location.href
    
    // Contenu complet pour WhatsApp et autres
    const fullContent = `📄 ${articleTitle}\n\n${articleContent}\n\n🔗 Lire l'article complet : ${articleUrl}`
    
    // Pour Twitter - inclure autant de contenu que possible (limite ~2000 chars dans URL)
    const twitterMaxLength = 1500 // Limite de sécurité pour l'URL
    let twitterContent = `${articleTitle}\n\n${articleContent}\n\n🔗 ${articleUrl}`
    
    if (twitterContent.length > twitterMaxLength) {
      const availableSpace = twitterMaxLength - articleUrl.length - 50 // -50 pour "\n\n🔗 " et marge
      const truncatedContent = articleContent.substring(0, availableSpace)
      twitterContent = `${articleTitle}\n\n${truncatedContent}...\n\n🔗 ${articleUrl}`
    }
    
    switch(platform) {
      case 'Twitter':
        // Twitter - inclure le contenu complet dans le paramètre text
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterContent)}`
        window.open(twitterUrl, '_blank', 'width=550,height=420')
        break
        
      case 'WhatsApp':
        // WhatsApp permet de pré-remplir le texte COMPLET
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullContent)}`
        window.open(whatsappUrl, '_blank')
        break
        
      case 'Facebook':
      case 'LinkedIn':
        // Facebook et LinkedIn ne permettent pas de pré-remplir le texte
        // On copie dans le presse-papiers et on affiche les instructions
        navigator.clipboard.writeText(fullContent).then(() => {
          const socialUrl = platform === 'Facebook' 
            ? 'https://www.facebook.com/' 
            : 'https://www.linkedin.com/feed/'
          
          // Afficher une popup avec instructions
          const shouldOpen = window.confirm(
            `✅ Le contenu COMPLET a été copié dans votre presse-papiers !\n\n` +
            `📝 Instructions :\n` +
            `1. Cliquez sur OK pour ouvrir ${platform}\n` +
            `2. Créez une nouvelle publication\n` +
            `3. Collez le contenu (Ctrl+V ou Cmd+V)\n` +
            `4. Publiez !\n\n` +
            `Voulez-vous ouvrir ${platform} maintenant ?`
          )
          
          if (shouldOpen) {
            window.open(socialUrl, '_blank')
          }
        }).catch(err => {
          console.error('Erreur lors de la copie:', err)
          alert('❌ Erreur : Impossible de copier le contenu')
        })
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
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
                />
              ) : (
                <p className="text-gray-600 italic">Contenu non disponible</p>
              )}
            </div>

            {/* Exporter sur les réseaux sociaux */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Exporter cet article</h3>
              <p className="text-sm text-gray-600 mb-4">Le contenu complet sera copié pour que vous puissiez le coller directement</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => exportContentForSocialMedia('Facebook')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors"
                  title="Copier et exporter vers Facebook"
                >
                  <i className="bx bxl-facebook text-xl"></i>
                  <span className="font-medium">Exporter vers Facebook</span>
                </button>
                
                <button
                  onClick={() => exportContentForSocialMedia('Twitter')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1A94DA] transition-colors"
                  title="Copier et exporter vers Twitter/X"
                >
                  <i className="bx bxl-twitter text-xl"></i>
                  <span className="font-medium">Exporter vers Twitter</span>
                </button>
                
                <button
                  onClick={() => exportContentForSocialMedia('LinkedIn')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#095196] transition-colors"
                  title="Copier et exporter vers LinkedIn"
                >
                  <i className="bx bxl-linkedin text-xl"></i>
                  <span className="font-medium">Exporter vers LinkedIn</span>
                </button>
                
                <button
                  onClick={() => exportContentForSocialMedia('WhatsApp')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BD5A] transition-colors"
                  title="Copier et exporter vers WhatsApp"
                >
                  <i className="bx bxl-whatsapp text-xl"></i>
                  <span className="font-medium">Exporter vers WhatsApp</span>
                </button>
                
                <button
                  onClick={copyLinkToClipboard}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  title="Copier uniquement le lien"
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
  )
}


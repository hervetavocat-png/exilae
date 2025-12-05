import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function SEO({
  title = 'URGENCE OQTF - Faites annuler votre OQTF en urgence',
  description = 'Avocat spécialisé en droit des étrangers. Recours OQTF rapide et efficace. Évaluation gratuite de votre dossier. Consultations à Paris et Nice.',
  image = 'https://urgence-oqtf.fr/og-image.jpg',
  url = 'https://urgence-oqtf.fr/',
  type = 'website',
  article = null
}) {
  const fullUrl = url.startsWith('http') ? url : `https://urgence-oqtf.fr${url}`
  const fullImage = image.startsWith('http') ? image : `https://urgence-oqtf.fr${image}`

  return (
    <Helmet>
      {/* Titre et description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="URGENCE OQTF" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Article spécifique (pour les articles de blog) */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author || 'URGENCE OQTF'} />
          <meta property="article:section" content={article.section || 'Droit des étrangers'} />
        </>
      )}
    </Helmet>
  )
}

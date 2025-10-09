import React, { useState } from 'react'
import { contactFormService, uploadService } from '../services'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
    document: null
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    
    if (file) {
      // Validation du fichier
      const validation = uploadService.validateFile(file)
      
      if (!validation.isValid) {
        setErrors(prev => ({
          ...prev,
          document: validation.errors.join(', ')
        }))
        return
      }
      
      setFormData({
        ...formData,
        document: file
      })
      
      // Effacer l'erreur du document
      if (errors.document) {
        setErrors(prev => ({
          ...prev,
          document: ''
        }))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Protection contre les soumissions multiples
    if (isSubmitting || isUploading) {
      console.log('⚠️ Soumission déjà en cours, ignorée')
      return
    }
    
    // Mapper les données du formulaire vers le format attendu par l'API
    const apiFormData = {
      nom: formData.nom,
      email: formData.email,
      telephone: formData.telephone,
      sujet: formData.sujet || 'Contact depuis le site web',
      message: formData.message,
      type_formulaire: 'contact'
    }
    
    // Validation côté client
    const validation = contactFormService.validateContactForm(apiFormData)
    
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }
    
    setIsSubmitting(true)
    setErrors({})
    setSubmitStatus(null)
    
    try {
      let documentUrl = null
      
      // Upload du document si présent
      if (formData.document) {
        setIsUploading(true)
        setUploadProgress(0)
        
        try {
          const uploadResult = await uploadService.uploadSingleFile(
            formData.document,
            'contact-documents',
            (progress) => setUploadProgress(progress)
          )
          
          if (uploadResult.success) {
            // Construire l'URL manuellement
            const fileName = uploadResult.data.fileName || uploadResult.data.originalName
            documentUrl = `http://localhost:5001/uploads/contact-documents/${fileName}`
            console.log('📎 Document uploadé:', fileName)
            console.log('🔗 URL construite:', documentUrl)
          } else {
            throw new Error('Erreur lors de l\'upload du document')
          }
        } catch (uploadError) {
          console.error('❌ Erreur upload:', uploadError)
          setErrors({ document: 'Erreur lors de l\'upload du document' })
          return
        } finally {
          setIsUploading(false)
          setUploadProgress(0)
        }
      }
      
      // Ajouter l'URL du document aux données
      const formattedData = contactFormService.formatContactFormData({
        ...apiFormData,
        document_url: documentUrl
      })
      
      // Envoyer au backend
      const result = await contactFormService.submitContactForm(formattedData)
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Votre message a été envoyé avec succès ! Nous vous répondrons sous 24h.'
        })
        
        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          email: '',
          telephone: '',
          sujet: '',
          message: '',
          document: null
        })
        
        // Réinitialiser le champ fichier
        const fileInput = document.getElementById('document-upload')
        if (fileInput) fileInput.value = ''
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Une erreur s\'est produite lors de l\'envoi'
        })
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Une erreur inattendue s\'est produite. Veuillez réessayer.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif', fontWeight: '600', letterSpacing: '-0.02em'}}>
            Nous contacter
          </h2>
          <p className="text-lg text-gray-500" style={{fontWeight: '400'}}>
            Votre premier pas vers une solution juridique
          </p>
        </div>
        
        {/* Message de statut */}
        {submitStatus && (
          <div className={`mb-8 p-4 rounded-lg max-w-4xl mx-auto ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
              {submitStatus.type === 'success' ? (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              {submitStatus.message}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.nom ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Votre nom complet"
                    disabled={isSubmitting}
                  />
                  {errors.nom && (
                    <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="votre@email.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.telephone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="06 12 34 56 78"
                    disabled={isSubmitting}
                  />
                  {errors.telephone && (
                    <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-2">
                    Votre situation *
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSubmitting}
                  >
                    <option value="">Sélectionnez votre situation</option>
                    <option value="J'ai reçu une OQTF">J'ai reçu une OQTF</option>
                    <option value="Demande de régularisation">Demande de régularisation</option>
                    <option value="Regroupement familial">Regroupement familial</option>
                    <option value="Autre situation">Autre situation</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Décrivez votre situation *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Décrivez votre situation en détail pour que nous puissions mieux vous conseiller..."
                  disabled={isSubmitting}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>
              
              {/* Upload de document */}
              <div>
                <label htmlFor="document-upload" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Document joint (optionnel)
                  </div>
                  <span className="text-xs text-gray-500 font-normal">
                    PDF, JPG, PNG, WebP (max 10MB) - OQTF, passeport, etc.
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="document-upload"
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                    onChange={handleFileChange}
                    className="sr-only"
                    disabled={isSubmitting || isUploading}
                  />
                  <label
                    htmlFor="document-upload"
                    className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      errors.document 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    } ${isSubmitting || isUploading ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    <div className="text-center">
                      {formData.document ? (
                        <div className="flex items-center text-green-600">
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium">{formData.document.name}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({uploadService.formatFileSize(formData.document.size)})
                          </span>
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-sm">
                            <span className="font-medium text-blue-600">Cliquez pour choisir</span> ou glissez un fichier
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
                {errors.document && (
                  <p className="mt-1 text-sm text-red-600">{errors.document}</p>
                )}
                
                {/* Barre de progression d'upload */}
                {isUploading && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Upload en cours...</span>
                      <span className="text-sm text-gray-500">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={isSubmitting}
                />
                <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
                  J'accepte que mes données soient utilisées pour me recontacter dans le cadre de ma demande *
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 rounded-lg font-bold text-lg transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                } text-white`}
              >
                {isSubmitting ? 'ENVOI EN COURS...' : 'ENVOYER MA DEMANDE'}
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>
                Réponse garantie sous 24h
              </h3>
              <p className="text-gray-600 mb-4">
                Nos avocats s'engagent à vous répondre rapidement pour évaluer votre situation.
              </p>
              <div className="flex items-center text-green-600">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Consultation gratuite
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>
                Contactez-nous directement
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-gray-700">01 23 45 67 89</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-700">contact@exilae.fr</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">123 Avenue des Champs-Élysées<br />75008 Paris</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import React, { useState, useEffect } from 'react'
import { consultationService, uploadService } from '../services'

export default function ContactPopup({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errors, setErrors] = useState({})
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    situation: '',
    urgency: '',
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      message: '',
      document: null
    }
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    {
      id: 1,
      title: "Situation",
      icon: <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
    },
    {
      id: 2,
      title: "Comment vous contacter ?", 
      icon: <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
    },
    {
      id: 3,
      title: "Contact",
      icon: <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
    }
  ]

  // Gérer l'animation d'ouverture/fermeture et le scroll
  useEffect(() => {
    if (isOpen) {
      // Sauvegarder la position actuelle du scroll
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      
      // Démarrer l'animation d'ouverture avec un petit délai pour un effet plus smooth
      const timer = setTimeout(() => {
        setIsAnimating(true)
      }, 10)
      
      return () => clearTimeout(timer)
    } else {
      // Animation de fermeture
      setIsAnimating(false)
      
      // Restaurer le scroll quand le popup se ferme
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    // Cleanup function
    return () => {
      if (isOpen) {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
      }
    }
  }, [isOpen])

  const handleOptionSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleContactChange = (field, value) => {
    // Validation pour les fichiers
    if (field === 'document' && value) {
      const validation = uploadService.validateFile(value)
      
      if (!validation.isValid) {
        setErrors(prev => ({
          ...prev,
          document: validation.errors.join(', ')
        }))
        return
      }
      
      // Effacer l'erreur du document
      if (errors.document) {
        setErrors(prev => ({
          ...prev,
          document: ''
        }))
      }
    }
    
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Protection contre les soumissions multiples
    if (isSubmitting || isUploading) {
      console.log('⚠️ Soumission déjà en cours, ignorée')
      return
    }
    
    setIsSubmitting(true)
    setErrors({})
    setSubmitStatus(null)
    
    try {
      let documentUrl = null
      
      // Upload du document si présent
      if (formData.contact.document) {
        setIsUploading(true)
        setUploadProgress(0)
        
        try {
          // Créer FormData avec l'email de l'utilisateur
          const formDataUpload = new FormData()
          formDataUpload.append('file', formData.contact.document)
          formDataUpload.append('folder', 'consultation-documents')
          formDataUpload.append('userEmail', formData.contact.email)
          
          // Upload direct vers l'API
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
          const response = await fetch(`${apiUrl}/uploads/single`, {
            method: 'POST',
            body: formDataUpload
          })
          
          const uploadResult = await response.json()
          
          if (uploadResult.success) {
            // Utiliser l'URL publique de Supabase Storage
            documentUrl = uploadResult.data.publicUrl
            console.log('📎 Document uploadé vers Supabase:', uploadResult.data.fileName)
            console.log('🔗 URL Supabase:', documentUrl)
            console.log('📁 Dossier:', uploadResult.data.folder)
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
      
      // Mapper les données du formulaire vers le format API
      const consultationData = {
        nom: formData.contact.lastName,
        prenom: formData.contact.firstName,
        email: formData.contact.email,
        telephone: formData.contact.phone,
        ville_consultation: formData.contact.city || 'Non spécifiée',
        situation_actuelle: formData.contact.message || `Situation: ${formData.situation}`,
        type_procedure: formData.situation || 'OQTF',
        urgence_niveau: mapUrgencyLevel(formData.urgency),
        message_complementaire: `Type OQTF: ${formData.situation}
Mode de contact préféré: ${formData.urgency}${formData.contact.document ? '\nDocument joint: ' + formData.contact.document.name : ''}`,
        document_url: documentUrl,
        documents_fournis: formData.contact.document ? {
          nom_fichier: formData.contact.document.name,
          taille: formData.contact.document.size,
          type: formData.contact.document.type,
          url: documentUrl
        } : {}
      }
      
      // Validation côté client
      const validation = consultationService.validateConsultationForm(consultationData)
      
      if (!validation.isValid) {
        setErrors(validation.errors)
        setSubmitStatus({
          type: 'error',
          message: 'Veuillez corriger les erreurs dans le formulaire'
        })
        return
      }
      
      // Envoyer directement consultationData sans formatage pour garder document_url
      console.log('📤 Données envoyées au backend:', consultationData)
      console.log('🔗 URL du document dans les données:', consultationData.document_url)
      
      // Envoyer au backend
      const result = await consultationService.createConsultationRequest(consultationData)
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Votre demande a été envoyée avec succès ! Nous vous contacterons sous 24h.'
        })
        
        // Réinitialiser le formulaire après un délai
        setTimeout(() => {
          resetForm()
          onClose()
        }, 2000)
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Une erreur s\'est produite lors de l\'envoi'
        })
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire popup:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Une erreur inattendue s\'est produite. Veuillez réessayer.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fonction pour mapper le mode de contact
  const mapUrgencyLevel = (contactMode) => {
    switch(contactMode) {
      case 'par téléphone ?': return 'telephone'
      case 'en visioconférence ?': return 'visioconference'
      default: return 'telephone'
    }
  }

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      situation: '',
      urgency: '',
      contact: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        message: '',
        document: null
      }
    })
    setCurrentStep(1)
    setErrors({})
    setSubmitStatus(null)
  }

  const getCurrentFieldValue = () => {
    switch(currentStep) {
      case 1: return formData.situation
      case 2: return formData.urgency
      case 3: return formData.contact.firstName && formData.contact.lastName && formData.contact.email && formData.contact.phone
      default: return false
    }
  }

  const getStepContent = () => {
    switch(currentStep) {
      case 1: return { title: "Votre situation", subtitle: "Quel type d'OQTF avez-vous reçu ?" }
      case 2: return { title: "Comment vous contacter ?", subtitle: "Choisissez votre mode de contact préféré" }
      case 3: return { title: "Vos coordonnées", subtitle: "Vous allez être rappelé dans la journée pour que nos avocats prennent en charge votre OQTF" }
      default: return { title: "", subtitle: "" }
    }
  }

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
      isAnimating ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Arrière-plan transparent */}
      <div 
        className={`fixed inset-0 backdrop-blur-md transition-all duration-300 ${
          isAnimating ? 'opacity-100 bg-black/30' : 'opacity-0 bg-black/0'
        }`}
        onClick={onClose}
      ></div>
      
      {/* Popup Content */}
      <div className={`relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] mx-4 overflow-hidden transform transition-all duration-500 ease-out flex flex-col ${
        isAnimating 
          ? 'scale-100 translate-y-0 opacity-100' 
          : 'scale-95 translate-y-4 opacity-0'
      }`}>
        {/* Header avec progress bar */}
        <div className="p-6 flex-shrink-0" style={{backgroundColor: '#12255D'}}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white" style={{fontFamily: 'Poppins, sans-serif'}}>
                Contactez votre avocat en urgence
              </h2>
              <p className="text-white/80 text-sm">
                Rappel gratuit dans la journée
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white">
              Étape {currentStep} sur {totalSteps}
            </span>
            <span className="text-sm font-medium text-white">
              {Math.round(progress)}%
            </span>
          </div>
          
          <div className="w-full bg-white/30 rounded-full h-2 mb-4">
            <div 
              className="h-2 rounded-full transition-all duration-500 ease-out bg-white"
              style={{width: `${progress}%`}}
            ></div>
          </div>

          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-white text-blue-600' 
                    : 'bg-white/30 text-white'
                }`}>
                  {currentStep > step.id ? (
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <span className={`hidden sm:block text-xs mt-1 ${
                  currentStep >= step.id ? 'text-white font-semibold' : 'text-white/60'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className={`p-6 bg-white overflow-y-auto flex-1 min-h-0 transition-all duration-700 ${
          isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`} style={{WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin'}}>
          
          {/* Message de statut */}
          {submitStatus && (
            <div className={`mb-6 p-4 rounded-lg ${
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
                <span className="text-sm font-medium">{submitStatus.message}</span>
              </div>
            </div>
          )}

          <div className="text-center mb-6">
            <div className="flex justify-center mb-2">{steps[currentStep - 1].icon}</div>
            <h3 className="text-xl font-bold" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
              {getStepContent().title}
            </h3>
            <p className="text-gray-600 text-sm">
              {getStepContent().subtitle}
            </p>
          </div>

          {/* Step Content */}
          <div className="mb-6">
            {currentStep === 1 && (
              <div className="space-y-3">
                {['OQTF simple (30 jours)', 'Assignation à résidence', 'Avec placement en CRA (Centre de Rétention Administrative)', 'IRTF'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect('situation', option)}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-300 ${
                      formData.situation === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        formData.situation === option
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {formData.situation === option && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span className="text-sm font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-3">
                {['par téléphone ?', 'en visioconférence ?'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect('urgency', option)}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-300 ${
                      formData.urgency === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        formData.urgency === option
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {formData.urgency === option && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span className="text-sm font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{color: '#12255D'}}>Prénom *</label>
                    <input
                      type="text"
                      value={formData.contact.firstName}
                      onChange={(e) => handleContactChange('firstName', e.target.value)}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:border-blue-500 focus:outline-none transition-colors ${
                        errors.prenom ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Prénom"
                      required
                      disabled={isSubmitting}
                    />
                    {errors.prenom && (
                      <p className="mt-1 text-xs text-red-600">{errors.prenom}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{color: '#12255D'}}>Nom *</label>
                    <input
                      type="text"
                      value={formData.contact.lastName}
                      onChange={(e) => handleContactChange('lastName', e.target.value)}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:border-blue-500 focus:outline-none transition-colors ${
                        errors.nom ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Nom"
                      required
                      disabled={isSubmitting}
                    />
                    {errors.nom && (
                      <p className="mt-1 text-xs text-red-600">{errors.nom}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium mb-1" style={{color: '#12255D'}}>Email *</label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:border-blue-500 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="votre@email.com"
                    required
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{color: '#12255D'}}>Téléphone *</label>
                    <input
                      type="tel"
                      value={formData.contact.phone}
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      className={`w-full px-3 py-2 text-sm border rounded-lg focus:border-blue-500 focus:outline-none transition-colors ${
                        errors.telephone ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="06 XX XX XX XX"
                      required
                      disabled={isSubmitting}
                    />
                    {errors.telephone && (
                      <p className="mt-1 text-xs text-red-600">{errors.telephone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{color: '#12255D'}}>Ville</label>
                    <input
                      type="text"
                      value={formData.contact.city}
                      onChange={(e) => handleContactChange('city', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Ville"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1" style={{color: '#12255D'}}>Message</label>
                  <textarea
                    value={formData.contact.message}
                    onChange={(e) => handleContactChange('message', e.target.value)}
                    rows={3}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none ${
                      errors.situation_actuelle ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Décrivez votre situation..."
                    disabled={isSubmitting}
                  ></textarea>
                  {errors.situation_actuelle && (
                    <p className="mt-1 text-xs text-red-600">{errors.situation_actuelle}</p>
                  )}
                </div>

                {/* Document Upload Field */}
                <div>
                  <label className="block text-xs font-medium mb-2" style={{color: '#12255D'}}>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Document OQTF (optionnel)
                    </div>
                    <span className="text-xs text-gray-500 font-normal">
                      PDF, JPG, PNG (max 5MB)
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="popup-document-upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleContactChange('document', e.target.files[0])}
                      className="sr-only"
                    />
                    <label
                      htmlFor="popup-document-upload"
                      className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-50 ${
                        formData.contact.document 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 bg-gray-50 hover:border-blue-400'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center py-3">
                        {formData.contact.document ? (
                          <>
                            <svg className="w-6 h-6 mb-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xs text-blue-600 font-semibold">
                              {formData.contact.document.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(formData.contact.document.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </>
                        ) : (
                          <>
                            <svg className="w-6 h-6 mb-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-xs text-gray-600">
                              <span className="font-semibold">Cliquez</span> ou glissez
                            </p>
                            <p className="text-xs text-gray-500">
                              Votre OQTF si disponible
                            </p>
                          </>
                        )}
                      </div>
                    </label>
                    
                    {/* Remove file button */}
                    {formData.contact.document && (
                      <button
                        type="button"
                        onClick={() => handleContactChange('document', null)}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        title="Supprimer le fichier"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  {/* Erreur d'upload */}
                  {errors.document && (
                    <p className="mt-1 text-xs text-red-600">{errors.document}</p>
                  )}
                  
                  {/* Barre de progression d'upload */}
                  {isUploading && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600">Upload en cours...</span>
                        <span className="text-xs text-gray-500">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1 || isSubmitting}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                currentStep === 1 || isSubmitting
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              Précédent
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                disabled={!getCurrentFieldValue() || isSubmitting}
                className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 text-white ${
                  getCurrentFieldValue() && !isSubmitting
                    ? 'cursor-pointer hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                style={getCurrentFieldValue() && !isSubmitting ? {backgroundColor: '#12255D'} : {}}
              >
                Suivant
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!getCurrentFieldValue() || isSubmitting}
                className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 text-white ${
                  getCurrentFieldValue() && !isSubmitting
                    ? 'cursor-pointer hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                style={getCurrentFieldValue() && !isSubmitting ? {backgroundColor: '#12255D'} : {}}
              >
                {isSubmitting ? 'Envoi...' : 'Envoyer'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
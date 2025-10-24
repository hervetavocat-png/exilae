import React, { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { consultationService, uploadService } from '../services'

export default function ProgressFormSection() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    oqtfType: '',
    nationality: '',
    entryDate: '',
    entryMode: '',
    professionalStatus: '',
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      document: null
    }
  })

  useEffect(() => {
    AOS.init()
  }, [])

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    {
      id: 1,
      title: "Type d'OQTF",
      icon: <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>,
      question: "Quel type d'OQTF avez-vous reçu ?",
      options: [
        { value: "simple", label: "OQTF simple (30 jours)" },
        { value: "assignation", label: "Assignation à résidence" },
        { value: "retention", label: "Avec placement en CRA (Centre de Rétention Administrative)" },
        { value: "irtf", label: "IRTF" }
      ]
    },
    {
      id: 2,
      title: "Nationalité",
      icon: <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" /></svg>,
      question: "Quelle est votre nationalité ?",
      isInput: true,
      inputType: "text",
      placeholder: "Votre nationalité"
    },
    {
      id: 3,
      title: "Entrée",
      icon: <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>,
      question: "Quand êtes-vous entré(e) en France ?",
      isInput: true,
      inputType: "date",
      placeholder: ""
    },
    {
      id: 4,
      title: "Mode d'entrée",
      icon: <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>,
      question: "Comment êtes-vous entré(e) en France ?",
      options: [
        { value: "visa_touristique", label: "Visa touristique" },
        { value: "visa_etudiant", label: "Visa étudiant" },
        { value: "sans_visa", label: "Sans visa" },
        { value: "autre", label: "Autre" }
      ]
    },
    {
      id: 5,
      title: "Professionnel",
      icon: <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" /></svg>,
      question: "Quelle est votre situation professionnelle ?",
      options: [
        { value: "salarie", label: "Salarié(e)" },
        { value: "etudiant", label: "Étudiant(e)" },
        { value: "sans_emploi", label: "Sans emploi" },
        { value: "independant", label: "Travailleur indépendant" },
        { value: "autre", label: "Autre" }
      ]
    },
    {
      id: 6,
      title: "Contact",
      icon: <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>,
      question: "Vous allez être rappelé dans la journée pour que nos avocats prennent en charge votre OQTF",
      isContact: true
    }
  ]

  const handleOptionSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleContactChange = (field, value) => {
    // Validation pour les fichiers
    if (field === 'document' && value) {
      const maxSize = 5 * 1024 * 1024 // 5MB
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
      
      if (value.size > maxSize) {
        alert('Le fichier est trop volumineux. Taille maximum : 5MB')
        return
      }
      
      if (!allowedTypes.includes(value.type)) {
        alert('Format de fichier non supporté. Formats acceptés : PDF, JPG, PNG')
        return
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

  const mapUrgencyLevel = (urgency) => {
    if (!urgency) return 'normal'
    if (urgency.includes('48h')) return 'urgent'
    if (urgency.includes('7 jours')) return 'important'
    if (urgency.includes('30 jours')) return 'normal'
    return 'normal'
  }

  const handleSubmit = async () => {
    if (isSubmitting || isUploading) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      let documentUrl = null
      
      // Upload du document si présent
      if (formData.contact.document) {
        setIsUploading(true)
        setUploadProgress(0)
        
        try {
          const formDataUpload = new FormData()
          formDataUpload.append('file', formData.contact.document)
          formDataUpload.append('folder', 'consultation-documents')
          formDataUpload.append('userEmail', formData.contact.email)
          
          const response = await fetch('http://localhost:5001/api/uploads/single', {
            method: 'POST',
            body: formDataUpload
          })
          
          const uploadResult = await response.json()
          
          if (uploadResult.success) {
            documentUrl = uploadResult.data.publicUrl
            console.log('📎 Document uploadé:', uploadResult.data.fileName)
          } else {
            throw new Error('Erreur lors de l\'upload du document')
          }
        } catch (uploadError) {
          console.error('❌ Erreur upload:', uploadError)
          setSubmitStatus({ type: 'error', message: 'Erreur lors de l\'upload du document' })
          return
        } finally {
          setIsUploading(false)
          setUploadProgress(0)
        }
      }
      
      // Créer les données de consultation
      const consultationData = {
        nom: formData.contact.lastName,
        prenom: formData.contact.firstName,
        email: formData.contact.email,
        telephone: formData.contact.phone,
        ville_consultation: 'Non spécifiée',
        situation_actuelle: `Type OQTF: ${formData.oqtfType}`,
        type_procedure: formData.oqtfType || 'OQTF',
        urgence_niveau: mapUrgencyLevel(formData.oqtfType),
        nationalite: formData.nationality || '',
        date_entree_france: formData.entryDate || null,
        mode_entree: formData.entryMode || '',
        statut_professionnel: formData.professionalStatus || '',
        message_complementaire: `Type d'OQTF: ${formData.oqtfType}
Nationalité: ${formData.nationality || 'Non renseignée'}
Date d'entrée en France: ${formData.entryDate || 'Non renseignée'}
Mode d'entrée: ${formData.entryMode || 'Non renseigné'}
Statut professionnel: ${formData.professionalStatus || 'Non renseigné'}${formData.contact.document ? '\nDocument joint: ' + formData.contact.document.name : ''}`,
        document_url: documentUrl,
        documents_fournis: formData.contact.document ? {
          nom_fichier: formData.contact.document.name,
          taille: formData.contact.document.size,
          type: formData.contact.document.type,
          url: documentUrl
        } : {}
      }
      
      // Validation
      const validation = consultationService.validateConsultationForm(consultationData)
      
      if (!validation.isValid) {
        setSubmitStatus({ type: 'error', message: 'Veuillez remplir tous les champs requis' })
        return
      }
      
      // Envoyer au backend
      const result = await consultationService.createConsultationRequest(consultationData)
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Merci ! Nous vous contacterons sous 24h pour votre évaluation.'
        })
        
        // Réinitialiser le formulaire après 3 secondes
        setTimeout(() => {
          setCurrentStep(1)
          setFormData({
            oqtfType: '',
            nationality: '',
            entryDate: '',
            entryMode: '',
            professionalStatus: '',
            contact: {
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              document: null
            }
          })
          setSubmitStatus(null)
        }, 3000)
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Une erreur s\'est produite'
        })
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Une erreur inattendue s\'est produite'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCurrentStepData = () => {
    return steps.find(step => step.id === currentStep)
  }

  const currentStepData = getCurrentStepData()

  return (
    <section className="py-20 bg-gray-50">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{backgroundColor: '#12255D'}}>
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>
            Estimez le coût de votre dossier
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600">
            Répondez à quelques questions pour obtenir une première évaluation de votre situation
          </p>
        </div>

        {/* Message de statut */}
        {submitStatus && (
          <div className={`max-w-3xl mx-auto mb-8 p-4 rounded-2xl ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 border-2 border-green-200 text-green-800'
              : 'bg-red-50 border-2 border-red-200 text-red-800'
          }`} data-aos="fade-down">
            <div className="flex items-center justify-center">
              {submitStatus.type === 'success' ? (
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-semibold">{submitStatus.message}</span>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-12" data-aos="fade-up" data-aos-delay="200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium" style={{color: '#12255D'}}>
              Étape {currentStep} sur {totalSteps}
            </span>
            <span className="text-sm font-medium" style={{color: '#12255D'}}>
              {Math.round(progress)}% complété
            </span>
          </div>
          
                     {/* Progress Bar */}
           <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
             <div 
               className="h-3 rounded-full transition-all duration-500 ease-out"
               style={{width: `${progress}%`, backgroundColor: '#12255D'}}
             ></div>
           </div>

          {/* Steps Indicators */}
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`} style={currentStep >= step.id ? {backgroundColor: '#12255D'} : {}}>
                  {currentStep > step.id ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <span className={`text-xs mt-2 text-center hidden sm:block ${
                  currentStep >= step.id ? 'text-blue-600 font-semibold' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12" data-aos="fade-up" data-aos-delay="400">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">{currentStepData.icon}</div>
            <h3 className="text-2xl font-bold mb-2" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
              {currentStepData.title}
            </h3>
            <p className="text-lg text-gray-600">
              {currentStepData.question}
            </p>
          </div>

          {/* Form Options or Contact Form */}
          {currentStepData.isInput ? (
            <div className="mb-8">
              <input
                type={currentStepData.inputType}
                value={currentStep === 2 ? formData.nationality : formData.entryDate}
                onChange={(e) => handleOptionSelect(currentStep === 2 ? 'nationality' : 'entryDate', e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:border-red-500 focus:outline-none text-lg transition-all"
                placeholder={currentStepData.placeholder}
              />
            </div>
          ) : !currentStepData.isContact ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentStepData.options.map((option, index) => {
                const fieldName = currentStep === 1 ? 'oqtfType' : 
                                currentStep === 4 ? 'entryMode' : 'professionalStatus'
                
                const isSelected = formData[fieldName] === option.value
                
                return (
                  <div
                    key={option.value}
                    className={`relative group ${currentStepData.options.length % 2 !== 0 && index === currentStepData.options.length - 1 ? 'md:col-span-2' : ''}`}
                  >
                    <input
                      type="radio"
                      id={option.value}
                      name={fieldName}
                      value={option.value}
                      checked={isSelected}
                      onChange={() => handleOptionSelect(fieldName, option.value)}
                      className="sr-only"
                    />
                    <label
                      htmlFor={option.value}
                      className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                        isSelected
                          ? 'border-red-500 bg-gradient-to-br from-red-50 to-red-100 shadow-lg scale-105'
                          : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-50'
                      }`}
                    >
                      {/* Option Content */}
                      <div className="flex items-start space-x-4">
                        {/* Custom Radio */}
                        <div className="flex-shrink-0 mt-1">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? 'border-red-500 bg-red-500 shadow-lg'
                              : 'border-gray-300 group-hover:border-red-400'
                          }`}>
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                            )}
                          </div>
                        </div>
                        
                        {/* Option Text */}
                        <div className="flex-grow">
                          <div className={`font-semibold text-lg mb-1 ${
                            isSelected ? 'text-red-700' : 'text-gray-800'
                          }`}>
                            {option.label}
                          </div>
                          
                          {/* Add descriptions for better UX */}
                          {option.description && (
                            <div className={`text-sm ${
                              isSelected ? 'text-red-600' : 'text-gray-500'
                            }`}>
                              {option.description}
                            </div>
                          )}
                        </div>
                        
                        {/* Selection Icon */}
                        {isSelected && (
                          <div className="flex-shrink-0">
                            <svg className="w-6 h-6 text-red-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* Hover Effect Overlay */}
                      <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
                        isSelected 
                          ? 'bg-gradient-to-r from-red-500/10 to-red-500/10 opacity-100' 
                          : 'bg-gradient-to-r from-red-500/5 to-red-500/5 opacity-0 group-hover:opacity-100'
                      }`}></div>
                    </label>
                  </div>
                )
              })}
            </div>
          ) : (
            /* Enhanced Contact Form */
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prénom Field */}
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{color: '#12255D'}}>
                    Prénom *
                  </label>
                  <input
                    type="text"
                    value={formData.contact.firstName}
                    onChange={(e) => handleContactChange('firstName', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                    placeholder="Prénom"
                  />
                </div>
                
                {/* Nom Field */}
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{color: '#12255D'}}>
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={formData.contact.lastName}
                    onChange={(e) => handleContactChange('lastName', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                    placeholder="Nom"
                  />
                </div>
                
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{color: '#12255D'}}>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email *
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                      placeholder="votre.email@exemple.com"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {formData.contact.email && isValidEmail(formData.contact.email) && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{color: '#12255D'}}>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Téléphone *
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.contact.phone}
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                      placeholder="06 XX XX XX XX"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    {formData.contact.phone && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                                 </div>
               </div>
               
               {/* Document Upload Field */}
               <div className="md:col-span-2">
                 <label className="block text-sm font-semibold mb-3" style={{color: '#12255D'}}>
                   <div className="flex items-center">
                     <svg className="w-5 h-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                     </svg>
                     Document OQTF (optionnel)
                   </div>
                   <span className="text-xs text-gray-500 font-normal">
                     Formats acceptés : PDF, JPG, PNG (max 5MB)
                   </span>
                 </label>
                 <div className="relative">
                   <input
                     type="file"
                     id="document-upload"
                     accept=".pdf,.jpg,.jpeg,.png"
                     onChange={(e) => handleContactChange('document', e.target.files[0])}
                     className="sr-only"
                   />
                   <label
                     htmlFor="document-upload"
                     className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:bg-blue-50 ${
                       formData.contact.document 
                         ? 'border-blue-500 bg-blue-50' 
                         : 'border-gray-300 bg-gray-50 hover:border-blue-400'
                     }`}
                   >
                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
                       {formData.contact.document ? (
                         <>
                           <svg className="w-8 h-8 mb-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                           </svg>
                           <p className="text-sm text-blue-600 font-semibold">
                             {formData.contact.document.name}
                           </p>
                           <p className="text-xs text-gray-500">
                             {(formData.contact.document.size / 1024 / 1024).toFixed(2)} MB
                           </p>
                         </>
                       ) : (
                         <>
                           <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                           </svg>
                           <p className="text-sm text-gray-600">
                             <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                           </p>
                           <p className="text-xs text-gray-500">
                             Votre document OQTF si vous l'avez reçu
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
                       className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                       title="Supprimer le fichier"
                     >
                       <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                       </svg>
                     </button>
                   )}
                 </div>
               </div>
               
               {/* Privacy Notice */}
               <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:col-span-2">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-blue-700">
                    <strong>Vos données sont protégées.</strong> Nous utilisons vos informations uniquement pour vous contacter concernant votre évaluation. Aucune donnée n'est partagée avec des tiers.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
                         <button
               onClick={prevStep}
               disabled={currentStep === 1}
               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                 currentStep === 1
                   ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                   : 'bg-gray-500 text-white hover:bg-gray-600 hover:scale-105'
               }`}
             >
               Précédent
             </button>

             {currentStep < totalSteps ? (
               <button
                 onClick={nextStep}
                 disabled={!getCurrentFieldValue()}
                 className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-white hover:scale-105 ${
                   getCurrentFieldValue()
                     ? 'cursor-pointer'
                     : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                 }`}
                 style={getCurrentFieldValue() ? {backgroundColor: '#12255D'} : {}}
                 onMouseEnter={(e) => {
                   if (getCurrentFieldValue()) {
                     e.target.style.backgroundColor = '#0f1d4d'
                   }
                 }}
                 onMouseLeave={(e) => {
                   if (getCurrentFieldValue()) {
                     e.target.style.backgroundColor = '#12255D'
                   }
                 }}
               >
                 Suivant
               </button>
             ) : (
               <button
                 onClick={handleSubmit}
                 disabled={!isContactFormValid() || isSubmitting}
                 className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-white hover:scale-105 ${
                   isContactFormValid() && !isSubmitting
                     ? 'cursor-pointer'
                     : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                 }`}
                 style={isContactFormValid() && !isSubmitting ? {backgroundColor: '#12255D'} : {}}
                 onMouseEnter={(e) => {
                   if (isContactFormValid() && !isSubmitting) {
                     e.target.style.backgroundColor = '#0f1d4d'
                   }
                 }}
                 onMouseLeave={(e) => {
                   if (isContactFormValid() && !isSubmitting) {
                     e.target.style.backgroundColor = '#12255D'
                   }
                 }}
               >
                 {isSubmitting ? 'ENVOI EN COURS...' : 'Obtenir mon évaluation'}
               </button>
             )}
          </div>
        </div>

      </div>
    </section>
  )

  function getCurrentFieldValue() {
    switch(currentStep) {
      case 1: return formData.oqtfType
      case 2: return formData.nationality
      case 3: return formData.entryDate
      case 4: return formData.entryMode
      case 5: return formData.professionalStatus
      case 6: return isContactFormValid()
      default: return false
    }
  }

  function isContactFormValid() {
    return formData.contact.firstName && formData.contact.lastName && formData.contact.email && formData.contact.phone && isValidEmail(formData.contact.email)
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function getOptionDescription(fieldName, value) {
    const descriptions = {
      oqtfType: {
        'simple': 'Délai standard pour quitter le territoire',
        'assignation': 'Obligation de résider à une adresse',
        'retention': 'Placement immédiat en centre de rétention',
        'irtf': 'Interdiction de revenir en France',
        'pas_encore': 'Évaluation préventive de votre situation'
      },
      timeline: {
        'moins_7j': 'Délai très court, action urgente requise',
        '7_15j': 'Délai court, procédure d\'urgence',
        '15_30j': 'Délai standard, recours possible',
        'plus_30j': 'Délai dépassé, options limitées'
      },
      family: {
        'conjoint_francais': 'Mariage avec ressortissant français',
        'enfants_francais': 'Parent d\'enfants de nationalité française',
        'parents_france': 'Famille résidant légalement en France',
        'aucune': 'Pas d\'attaches familiales particulières'
      }
    }
    
    return descriptions[fieldName]?.[value] || ''
  }
}

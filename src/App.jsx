import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ServicesGrid from './components/ServicesGrid'
import FranceSection from './components/FranceSection'
import MapSection from './components/MapSection'
import InfoCards from './components/InfoCards'
import TestimonialSection from './components/TestimonialSection'
import ContactForm from './components/ContactForm'
import TeamSection from './components/TeamSection'
import NewsSection from './components/NewsSection'
import FAQSection from './components/FAQSection'
import ProgressFormSection from './components/ProgressFormSection'
import AboutSection from './components/AboutSection'
import ReviewsSection from './components/ReviewsSection'
import Footer from './components/Footer'
import ContactPopup from './components/ContactPopup'
import ScrollToTop from './components/ScrollToTop'
import FloatingButtons from './components/FloatingButtons'

// Import pages
import Home from './pages/Home'
import OQTFAssignation from './pages/OQTFAssignation'
import OQTFSimple from './pages/OQTFSimple'
import OQTFPlacement from './pages/OQTFPlacement'
import OQTF30Jours from './pages/OQTF30Jours'
import IRTF from './pages/IRTF'
import Paris from './pages/Paris'
import Nice from './pages/Nice'
import Blog from './pages/Blog'
import BlogArticle from './pages/BlogArticle'
import About from './pages/About'
import MentionsLegales from './pages/MentionsLegales'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'

export default function App() {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)

  useEffect(() => {
    const showPopupWithDelay = () => {
      if (!hasShownPopup) {
        const timer = setTimeout(() => {
          setShowPopup(true)
          setHasShownPopup(true)
        }, 1000) // Délai de 1 seconde
        return timer
      }
    }

    // Afficher le popup au chargement de la page
    const loadTimer = showPopupWithDelay()

    // Afficher le popup quand l'utilisateur revient sur l'onglet/fenêtre
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !hasShownPopup) {
        showPopupWithDelay()
      }
    }

    // Afficher le popup quand la fenêtre reprend le focus
    const handleFocus = () => {
      if (!hasShownPopup) {
        showPopupWithDelay()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)

    return () => {
      if (loadTimer) clearTimeout(loadTimer)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [hasShownPopup])

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  // Fonction pour réinitialiser le popup (optionnel - pour les tests)
  const resetPopup = () => {
    setShowPopup(false)
    setHasShownPopup(false)
  }

  const handleOpenPopup = () => {
    setShowPopup(true)
  }

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Header onOpenPopup={handleOpenPopup} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oqtf-assignation" element={<OQTFAssignation />} />
        <Route path="/oqtf-simple" element={<OQTFSimple />} />
        <Route path="/oqtf-placement" element={<OQTFPlacement />} />
        <Route path="/oqtf-30-jours" element={<OQTF30Jours />} />
        <Route path="/irtf" element={<IRTF />} />
        <Route path="/paris" element={<Paris />} />
        <Route path="/nice" element={<Nice />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogArticle />} />
        <Route path="/about" element={<About />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      </Routes>
      
      <Footer /> 
      
      <ContactPopup 
        isOpen={showPopup} 
        onClose={handleClosePopup} 
      />
      
      <FloatingButtons onOpenPopup={handleOpenPopup} />
    </div>
  )
}

import React from 'react'
import HeroSection from '../components/HeroSection'
import CitySection from '../components/CitySection'
import ServicesGrid from '../components/ServicesGrid'
import FranceSection from '../components/FranceSection'
import MapSection from '../components/MapSection'
import InfoCards from '../components/InfoCards'
import TestimonialSection from '../components/TestimonialSection'
import ContactForm from '../components/ContactForm'
import TeamSection from '../components/TeamSection'
import NewsSection from '../components/NewsSection'
import FAQSection from '../components/FAQSection'
import ProgressFormSection from '../components/ProgressFormSection'
import AboutSection from '../components/AboutSection'
import ReviewsSection from '../components/ReviewsSection'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CitySection />
      <ProgressFormSection />
      
      <ServicesGrid />
      <FAQSection />
     
      <ReviewsSection />
    </div>
  )
}
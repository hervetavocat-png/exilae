import React, {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import cabinetNiceImage from '../IMG/cabinet_nice.png'
import cabinetParisImage from '../IMG/cabinet_paris.png'
import backgroundImage from '../IMG/background.jpg'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function CitySection() {
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <div className="py-20 relative bg-white">
     <div className="absolute w-full h-80 bottom-0 bg-blue-100 pointer-events-none">  </div> 
      <div className="max-w-6xl mx-auto px-4 sm:px-6 z-10 lg:px-8">
        {/* Section Header */}
        <div className="text-left sm:text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{backgroundColor: '#12255D'}}>
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>
            Nous sommes compétents sur toute la France pour faire annuler votre OQTF
          </h2>
          <p className="text-md max-w-3xl mx-auto leading-relaxed" style={{color: '#12255D'}}>
            Sur Paris, Nice ou partout en France, nos avocats experts vous accompagnent où que vous soyez
          </p>
        </div>

        {/* Cities Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Paris Card */}
          <div className="relative group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl shadow-xl" style={{width: '400px', height: '500px'}}>
              <img 
                src={cabinetParisImage} 
                alt="Cabinet Paris" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Red button below the card */}
            <Link
              to="/paris" 
              className="block w-full mt-4 py-3 px-6 bg-[#DC2626] rounded-full text-white font-bold text-lg transition-all duration-300 hover:bg-blue-900 text-center"
            >
              Découvrir
            </Link>
          </div>

          {/* Nice Card */}
          <div className="relative group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl shadow-xl" style={{width: '400px', height: '500px'}}>
              <img 
                src={cabinetNiceImage} 
                alt="Cabinet Nice" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Red button below the card */}
            <Link
              to="/nice" 
              className="block w-full mt-4 py-3 px-6 bg-[#DC2626] rounded-full text-white font-bold text-lg transition-all duration-300 hover:bg-blue-900 text-center"
            >
              Découvrir
            </Link>
          </div>
        </div>
      </div>
     
    </div>
  )
}
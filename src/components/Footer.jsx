import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="text-white" style={{backgroundColor: '#12255D'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">exilae</div>
            <p className="text-blue-200 mb-4 text-sm leading-relaxed">
              Cabinet d'avocats spécialisé dans le droit des étrangers. 
              Nous défendons vos droits avec expertise et détermination.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>Nos services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/oqtf-simple" className="text-blue-200 hover:text-white transition-colors">OQTF Simple (30 jours)</Link></li>
              <li><Link to="/oqtf-assignation" className="text-blue-200 hover:text-white transition-colors">Assignation à résidence</Link></li>
              <li><Link to="/oqtf-placement" className="text-blue-200 hover:text-white transition-colors">Avec placement en CRA</Link></li>
              <li><Link to="/irtf" className="text-blue-200 hover:text-white transition-colors">IRTF</Link></li>
              <li><Link to="/" className="text-blue-200 hover:text-white transition-colors">Recours urgents</Link></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">À propos</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Notre équipe</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Actualités</a></li>
              <li><Link to="/mentions-legales" className="text-blue-200 hover:text-white transition-colors">Mentions légales</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{fontFamily: 'Poppins, sans-serif', fontWeight: 'bold'}}>Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-200 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div className="text-blue-200">
                  <strong>Paris:</strong> 94 Bd Flandrin, 75016 Paris<br />
                  <strong>Nice:</strong> 22 Rue de l'Hôtel des Postes, 06000 Nice
                </div>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-200 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:0763560150" className="text-blue-200 hover:text-white transition-colors">
                  07 63 56 01 50
                </a>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-200 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:contact@exilae.fr" className="text-blue-200 hover:text-white transition-colors">
                  contact@exilae.fr
                </a>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-200 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <div className="text-blue-200">
                  7j/7 de 8h à 22h<br />
                  Urgences acceptées
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t py-6" style={{borderColor: 'rgba(255, 255, 255, 0.2)'}}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm">
              © 2024 Exilae. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/politique-confidentialite" className="text-blue-200 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

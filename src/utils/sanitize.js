// Utilitaire de sanitisation modérée pour protéger contre XSS et SQL Injection
// Sans bloquer l'utilisation normale des formulaires

/**
 * Sanitise une chaîne de caractères contre XSS
 * Protection modérée : enlève seulement les balises script et les événements dangereux
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  
  let sanitized = input
  
  // Supprimer les balises script
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  
  // Supprimer les événements JavaScript inline (onclick, onerror, etc.)
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
  sanitized = sanitized.replace(/on\w+\s*=\s*[^\s>]*/gi, '')
  
  // Supprimer javascript: dans les liens
  sanitized = sanitized.replace(/javascript:/gi, '')
  
  // Supprimer les balises iframe
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
  
  return sanitized.trim()
}

/**
 * Sanitise un objet entier (formulaire)
 */
export function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj
  
  const sanitized = {}
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      
      if (typeof value === 'string') {
        sanitized[key] = sanitizeInput(value)
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        sanitized[key] = sanitizeObject(value)
      } else {
        sanitized[key] = value
      }
    }
  }
  
  return sanitized
}

/**
 * Validation d'email (protection contre injection)
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false
  
  // Pattern simple mais efficace
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  // Vérifier qu'il n'y a pas de caractères suspects
  const suspiciousChars = /<|>|;|'|"|`|\\/
  
  return emailPattern.test(email) && !suspiciousChars.test(email)
}

/**
 * Validation de téléphone
 */
export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false
  
  // Accepter les formats français et internationaux basiques
  const phonePattern = /^[\d\s\+\-\(\)\.]{8,20}$/
  
  return phonePattern.test(phone)
}

/**
 * Protection contre les mots-clés SQL dangereux (sans être trop restrictif)
 */
export function hasSQLInjection(input) {
  if (typeof input !== 'string') return false
  
  // Détecter seulement les patterns SQL vraiment dangereux
  const dangerousPatterns = [
    /(\b(DROP|DELETE|TRUNCATE)\s+(TABLE|DATABASE)\b)/i,
    /(UNION\s+SELECT)/i,
    /(;\s*DROP\s+)/i,
    /(exec\s*\()/i,
    /(execute\s*\()/i
  ]
  
  return dangerousPatterns.some(pattern => pattern.test(input))
}

/**
 * Sanitise et valide les données d'un formulaire
 */
export function sanitizeFormData(formData) {
  // Sanitiser l'objet
  const sanitized = sanitizeObject(formData)
  
  // Vérifications spécifiques
  const errors = {}
  
  // Email
  if (sanitized.email && !isValidEmail(sanitized.email)) {
    errors.email = 'Format d\'email invalide'
  }
  
  // Téléphone
  if (sanitized.telephone && !isValidPhone(sanitized.telephone)) {
    errors.telephone = 'Format de téléphone invalide'
  }
  if (sanitized.phone && !isValidPhone(sanitized.phone)) {
    errors.phone = 'Format de téléphone invalide'
  }
  
  // Vérifier SQL Injection dans tous les champs texte
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string' && hasSQLInjection(sanitized[key])) {
      errors[key] = 'Contenu non autorisé détecté'
    }
  })
  
  return {
    data: sanitized,
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Escape HTML pour affichage (mais garde les retours à la ligne)
 */
export function escapeHTML(text) {
  if (typeof text !== 'string') return text
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  
  return text.replace(/[&<>"']/g, m => map[m])
}





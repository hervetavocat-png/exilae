// Middleware de sanitisation pour protéger contre XSS et SQL Injection
// Protection modérée pour permettre l'utilisation normale des formulaires

/**
 * Sanitise une chaîne de caractères
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return str
  
  let sanitized = str
  
  // Supprimer les balises script
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  
  // Supprimer les événements JavaScript inline
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
  sanitized = sanitized.replace(/on\w+\s*=\s*[^\s>]*/gi, '')
  
  // Supprimer javascript: dans les liens
  sanitized = sanitized.replace(/javascript:/gi, '')
  
  // Supprimer les balises iframe
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
  
  return sanitized.trim()
}

/**
 * Sanitise un objet récursivement
 */
function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj
  
  const sanitized = {}
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      
      if (typeof value === 'string') {
        sanitized[key] = sanitizeString(value)
      } else if (Array.isArray(value)) {
        sanitized[key] = value.map(item => 
          typeof item === 'string' ? sanitizeString(item) : item
        )
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = sanitizeObject(value)
      } else {
        sanitized[key] = value
      }
    }
  }
  
  return sanitized
}

/**
 * Détecte les patterns SQL dangereux
 */
function hasDangerousSQLPattern(str) {
  if (typeof str !== 'string') return false
  
  const dangerousPatterns = [
    /(\b(DROP|DELETE|TRUNCATE)\s+(TABLE|DATABASE)\b)/i,
    /(UNION\s+SELECT)/i,
    /(;\s*(DROP|DELETE|UPDATE|INSERT)\s+)/i,
    /(exec\s*\()/i,
    /(execute\s*\()/i,
    /(xp_cmdshell)/i,
    /(';\s*--)/i,  // Commentaire SQL après quote
    /(--\s*$)/     // Commentaire SQL en fin de ligne
  ]
  
  return dangerousPatterns.some(pattern => pattern.test(str))
}

/**
 * Vérifie un objet pour détecter SQL Injection
 */
function checkSQLInjection(obj) {
  if (typeof obj === 'string') {
    return hasDangerousSQLPattern(obj)
  }
  
  if (typeof obj === 'object' && obj !== null) {
    return Object.values(obj).some(value => checkSQLInjection(value))
  }
  
  return false
}

/**
 * Middleware Express pour sanitiser les inputs
 */
function sanitizeMiddleware(req, res, next) {
  try {
    // Ne sanitiser que les requêtes POST, PUT, PATCH (pas GET)
    const shouldSanitizeBody = ['POST', 'PUT', 'PATCH'].includes(req.method)
    
    // Sanitiser req.body seulement pour POST/PUT/PATCH
    if (shouldSanitizeBody && req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
      // Vérifier SQL Injection avant sanitisation
      if (checkSQLInjection(req.body)) {
        console.log('⚠️ SQL Injection détecté dans req.body:', req.body)
        return res.status(400).json({
          success: false,
          error: 'Contenu non autorisé détecté dans la requête'
        })
      }
      
      req.body = sanitizeObject(req.body)
    }
    
    // Sanitiser req.query (légèrement, sans bloquer)
    if (req.query && typeof req.query === 'object' && Object.keys(req.query).length > 0) {
      // Ne pas bloquer les requêtes GET avec query params normaux
      const hasDangerousQuery = checkSQLInjection(req.query)
      if (hasDangerousQuery) {
        console.log('⚠️ Contenu suspect dans req.query:', req.query)
        // Nettoyer mais ne pas bloquer
        req.query = sanitizeObject(req.query)
      }
    }
    
    // Sanitiser req.params (légèrement)
    if (req.params && typeof req.params === 'object' && Object.keys(req.params).length > 0) {
      const hasDangerousParams = checkSQLInjection(req.params)
      if (hasDangerousParams) {
        console.log('⚠️ SQL Injection détecté dans req.params:', req.params)
        return res.status(400).json({
          success: false,
          error: 'Contenu non autorisé détecté dans l\'URL'
        })
      }
      
      req.params = sanitizeObject(req.params)
    }
    
    next()
  } catch (error) {
    console.error('❌ Erreur dans le middleware de sanitisation:', error)
    console.error('Stack:', error.stack)
    // Ne pas bloquer la requête en cas d'erreur du middleware
    next()
  }
}

module.exports = sanitizeMiddleware


export const CONSENT_STORAGE_KEY = 'exilae_cookie_consent'

export const ConsentStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
}

export function getConsentStatus() {
  if (typeof window === 'undefined') return ConsentStatus.PENDING
  
  const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
  if (!stored) return ConsentStatus.PENDING
  
  try {
    const consent = JSON.parse(stored)
    return consent.status || ConsentStatus.PENDING
  } catch {
    return ConsentStatus.PENDING
  }
}

export function saveConsentStatus(status, preferences = {}) {
  if (typeof window === 'undefined') return
  
  const consentData = {
    status,
    preferences,
    timestamp: new Date().toISOString()
  }
  
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData))
}

export function initializeConsentMode() {
  if (typeof window === 'undefined' || !window.dataLayer) return
  
  const consentStatus = getConsentStatus()
  
  if (consentStatus === ConsentStatus.ACCEPTED) {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      })
    }
  } else if (consentStatus === ConsentStatus.REJECTED) {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      })
    }
  }
}

export function updateConsentMode(accepted, preferences = {}) {
  if (typeof window === 'undefined' || !window.dataLayer) return
  
  const status = accepted ? ConsentStatus.ACCEPTED : ConsentStatus.REJECTED
  saveConsentStatus(status, preferences)
  
  const consentParams = accepted ? {
    'analytics_storage': 'granted',
    'ad_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted'
  } : {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied'
  }
  
  if (window.gtag) {
    window.gtag('consent', 'update', consentParams)
  }
}


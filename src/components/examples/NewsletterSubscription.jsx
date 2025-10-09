import React, { useState } from 'react';
import { newsletterService } from '../services';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus({
        type: 'error',
        message: 'Veuillez saisir votre email'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const result = await newsletterService.quickSubscribe(email);
      const statusInfo = newsletterService.handleSubscriptionResponse(result);
      setStatus(statusInfo);
      
      if (result.success) {
        setEmail('');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Une erreur s\'est produite'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        📧 Newsletter Juridique
      </h3>
      <p className="text-gray-600 mb-4">
        Recevez nos conseils et actualités du droit des étrangers
      </p>
      
      {status && (
        <div className={`mb-4 p-3 rounded-md text-sm ${
          status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
          status.type === 'info' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
          'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {status.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {isSubmitting ? '...' : 'S\'abonner'}
        </button>
      </form>
    </div>
  );
};

export default NewsletterSubscription;

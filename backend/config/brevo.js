const SibApiV3Sdk = require('@sendinblue/client');
require('dotenv').config();

// Configuration du client Brevo
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'stevenkuti20@gmail.com';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'urgenceoqtf@gmail.com';
const SENDER_NAME = process.env.SENDER_NAME || 'Exilae Admin';

// Vérifier la configuration
if (process.env.BREVO_API_KEY) {
  console.log('📧 Configuration Brevo:');
  console.log('   - API Key: ✅ Chargée');
  console.log(`   - Admin Email: ✅ ${ADMIN_EMAIL}`);
  console.log(`   - Sender Email: ${SENDER_EMAIL}`);
  console.log(`   - Sender Name: ${SENDER_NAME}`);
  console.log('✅ Notifications email Brevo activées');
} else {
  console.log('⚠️ Notifications email désactivées (configuration Brevo manquante)');
}

const envoyerNotificationOQTF = async (donnees) => {
  if (!process.env.BREVO_API_KEY) {
    console.log('⚠️ Email non envoyé : Brevo non configuré');
    return { success: false, error: 'Brevo non configuré' };
  }

  try {
    const {
      nom,
      prenom,
      email,
      telephone,
      type_oqtf,
      description_situation,
      delai_restant,
      prefecture,
      priorite
    } = donnees;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = `🚨 Nouvelle demande OQTF - ${prenom} ${nom}`;
    sendSmtpEmail.sender = { name: SENDER_NAME, email: SENDER_EMAIL };
    sendSmtpEmail.to = [{ email: ADMIN_EMAIL, name: 'Admin Exilae' }];
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
            .info-row { margin: 15px 0; padding: 12px; background: white; border-radius: 6px; border-left: 4px solid #667eea; }
            .label { font-weight: bold; color: #667eea; display: inline-block; min-width: 150px; }
            .value { color: #333; }
            .urgent { background: #fee2e2; border-left-color: #ef4444; }
            .btn { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🚨 Nouvelle Demande OQTF</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Urgence ${priorite || 'Non spécifiée'}</p>
            </div>
            <div class="content">
              <div class="info-row ${priorite === 'Haute' ? 'urgent' : ''}">
                <span class="label">👤 Client :</span>
                <span class="value">${prenom} ${nom}</span>
              </div>
              <div class="info-row">
                <span class="label">📧 Email :</span>
                <span class="value">${email}</span>
              </div>
              <div class="info-row">
                <span class="label">📱 Téléphone :</span>
                <span class="value">${telephone}</span>
              </div>
              <div class="info-row">
                <span class="label">📋 Type OQTF :</span>
                <span class="value">${type_oqtf || 'Non spécifié'}</span>
              </div>
              <div class="info-row">
                <span class="label">⏱️ Délai restant :</span>
                <span class="value">${delai_restant || 'Non renseigné'} jours</span>
              </div>
              <div class="info-row">
                <span class="label">📍 Préfecture :</span>
                <span class="value">${prefecture || 'Non spécifiée'}</span>
              </div>
              <div class="info-row">
                <span class="label">📝 Situation :</span>
                <span class="value">${description_situation || 'Non renseignée'}</span>
              </div>
              <div style="text-align: center;">
                <a href="https://admineexilae.fr" class="btn">📊 Consulter le Dashboard</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`📧 Email envoyé avec succès ! Message ID: ${data.messageId}`);
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error('❌ Erreur envoi email Brevo:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { envoyerNotificationOQTF };

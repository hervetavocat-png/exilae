const db = require('../services/database');

class NewsletterModel {
  // S'abonner à la newsletter
  static async subscribe(data) {
    const {
      email,
      nom,
      prenom,
      interets = [],
      source = 'website',
      ip_address
    } = data;

    // Vérifier si l'email existe déjà
    const existingQuery = 'SELECT * FROM newsletter_subscriptions WHERE email = $1;';
    const existing = await db.query(existingQuery, [email]);

    if (existing.rows.length > 0) {
      // Réactiver si désabonné
      if (existing.rows[0].statut === 'desabonne') {
        const updateQuery = `
          UPDATE newsletter_subscriptions 
          SET statut = 'actif', date_desabonnement = NULL, updated_at = CURRENT_TIMESTAMP
          WHERE email = $1 
          RETURNING *;
        `;
        const result = await db.query(updateQuery, [email]);
        return { ...result.rows[0], action: 'reactivated' };
      }
      return { ...existing.rows[0], action: 'already_subscribed' };
    }

    // Nouvel abonnement
    const insertQuery = `
      INSERT INTO newsletter_subscriptions 
      (email, nom, prenom, interets, source, ip_address)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [email, nom, prenom, JSON.stringify(interets), source, ip_address];
    const result = await db.query(insertQuery, values);
    return { ...result.rows[0], action: 'subscribed' };
  }

  // Se désabonner
  static async unsubscribe(email) {
    const query = `
      UPDATE newsletter_subscriptions 
      SET statut = 'desabonne', date_desabonnement = CURRENT_TIMESTAMP 
      WHERE email = $1 AND statut = 'actif'
      RETURNING *;
    `;
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  // Récupérer tous les abonnés actifs
  static async findAllActive(limit = 100, offset = 0) {
    const query = `
      SELECT * FROM newsletter_subscriptions 
      WHERE statut = 'actif' 
      ORDER BY date_inscription DESC 
      LIMIT $1 OFFSET $2;
    `;
    const result = await db.query(query, [limit, offset]);
    return result.rows;
  }

  // Récupérer par intérêts
  static async findByInterest(interet) {
    const query = `
      SELECT * FROM newsletter_subscriptions 
      WHERE statut = 'actif' 
      AND interets::jsonb ? $1
      ORDER BY date_inscription DESC;
    `;
    const result = await db.query(query, [interet]);
    return result.rows;
  }

  // Statistiques
  static async getStats() {
    const query = `
      SELECT 
        COUNT(CASE WHEN statut = 'actif' THEN 1 END) as actifs,
        COUNT(CASE WHEN statut = 'desabonne' THEN 1 END) as desabonnes,
        COUNT(*) as total,
        COUNT(CASE WHEN date_inscription >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as nouveaux_ce_mois
      FROM newsletter_subscriptions;
    `;
    const result = await db.query(query);
    return result.rows[0];
  }

  // Vérifier le statut d'un email
  static async checkStatus(email) {
    const query = 'SELECT statut, date_inscription FROM newsletter_subscriptions WHERE email = $1;';
    const result = await db.query(query, [email]);
    return result.rows[0] || { statut: 'non_abonne' };
  }
}

module.exports = NewsletterModel;

const db = require('../services/database');

class ContactFormModel {
  // Créer un nouveau formulaire de contact
  static async create(data) {
    const {
      nom,
      email,
      telephone,
      sujet,
      message,
      type_formulaire = 'contact',
      document_url,
      ip_address,
      user_agent
    } = data;

    const query = `
      INSERT INTO contact_forms 
      (nom, email, telephone, sujet, message, type_formulaire, document_url, ip_address, user_agent)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const values = [nom, email, telephone, sujet, message, type_formulaire, document_url, ip_address, user_agent];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  // Récupérer tous les formulaires de contact
  static async findAll(limit = 50, offset = 0) {
    const query = `
      SELECT * FROM contact_forms 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2;
    `;
    const result = await db.query(query, [limit, offset]);
    return result.rows;
  }

  // Récupérer un formulaire par ID
  static async findById(id) {
    const query = 'SELECT * FROM contact_forms WHERE id = $1;';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // Récupérer par email
  static async findByEmail(email) {
    const query = 'SELECT * FROM contact_forms WHERE email = $1 ORDER BY created_at DESC;';
    const result = await db.query(query, [email]);
    return result.rows;
  }

  // Compter le total
  static async count() {
    const query = 'SELECT COUNT(*) as total FROM contact_forms;';
    const result = await db.query(query);
    return parseInt(result.rows[0].total);
  }
}

module.exports = ContactFormModel;

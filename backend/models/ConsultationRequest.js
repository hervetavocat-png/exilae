const db = require('../services/database');

class ConsultationRequestModel {
  // Créer une nouvelle demande de consultation
  static async create(data) {
    const {
      nom,
      prenom,
      email,
      telephone,
      date_naissance,
      nationalite,
      situation_actuelle,
      type_procedure,
      urgence_niveau = 'normal',
      ville_consultation,
      date_souhaitee,
      heure_souhaitee,
      message_complementaire,
      document_url,
      documents_fournis = {}
    } = data;

    const query = `
      INSERT INTO consultation_requests 
      (nom, prenom, email, telephone, date_naissance, nationalite, situation_actuelle, 
       type_procedure, urgence_niveau, ville_consultation, date_souhaitee, 
       heure_souhaitee, message_complementaire, document_url, documents_fournis)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *;
    `;

    const values = [
      nom, prenom, email, telephone, date_naissance, nationalite, situation_actuelle,
      type_procedure, urgence_niveau, ville_consultation, date_souhaitee,
      heure_souhaitee, message_complementaire, document_url, JSON.stringify(documents_fournis)
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  // Récupérer toutes les demandes
  static async findAll(limit = 50, offset = 0) {
    const query = `
      SELECT * FROM consultation_requests 
      ORDER BY 
        CASE urgence_niveau 
          WHEN 'urgent' THEN 1 
          WHEN 'important' THEN 2 
          ELSE 3 
        END,
        created_at DESC 
      LIMIT $1 OFFSET $2;
    `;
    const result = await db.query(query, [limit, offset]);
    return result.rows;
  }

  // Récupérer par statut
  static async findByStatus(statut, limit = 50) {
    const query = `
      SELECT * FROM consultation_requests 
      WHERE statut = $1 
      ORDER BY created_at DESC 
      LIMIT $2;
    `;
    const result = await db.query(query, [statut, limit]);
    return result.rows;
  }

  // Récupérer les demandes urgentes
  static async findUrgent() {
    const query = `
      SELECT * FROM consultation_requests 
      WHERE urgence_niveau = 'urgent' 
      ORDER BY created_at ASC;
    `;
    const result = await db.query(query);
    return result.rows;
  }

  // Mettre à jour le statut
  static async updateStatus(id, statut) {
    const query = `
      UPDATE consultation_requests 
      SET statut = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $2 
      RETURNING *;
    `;
    const result = await db.query(query, [statut, id]);
    return result.rows[0];
  }

  // Récupérer par ID
  static async findById(id) {
    const query = 'SELECT * FROM consultation_requests WHERE id = $1;';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = ConsultationRequestModel;

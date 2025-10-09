const db = require('../services/database');

class OQTFUrgenceModel {
  // Créer une nouvelle demande d'urgence OQTF
  static async create(data) {
    const {
      nom,
      prenom,
      email,
      telephone,
      date_naissance,
      nationalite,
      numero_oqtf,
      date_reception_oqtf,
      type_oqtf,
      delai_restant,
      prefecture,
      situation_familiale,
      enfants_scolarises = false,
      emploi_actuel,
      duree_sejour_france,
      documents_disponibles = {},
      description_situation,
      aide_juridictionnelle = false,
      priorite = 1,
      date_entree_france,
      mode_entree,
      statut_familial,
      statut_professionnel
    } = data;

    const query = `
      INSERT INTO oqtf_urgence 
      (nom, prenom, email, telephone, date_naissance, nationalite, numero_oqtf,
       date_reception_oqtf, type_oqtf, delai_restant, prefecture, situation_familiale,
       enfants_scolarises, emploi_actuel, duree_sejour_france, documents_disponibles,
       description_situation, aide_juridictionnelle, priorite,
       date_entree_france, mode_entree, statut_familial, statut_professionnel)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
      RETURNING *;
    `;

    const values = [
      nom, prenom, email, telephone, date_naissance, nationalite, numero_oqtf,
      date_reception_oqtf, type_oqtf, delai_restant, prefecture, situation_familiale,
      enfants_scolarises, emploi_actuel, duree_sejour_france, JSON.stringify(documents_disponibles),
      description_situation, aide_juridictionnelle, priorite,
      date_entree_france, mode_entree, statut_familial, statut_professionnel
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  // Récupérer toutes les demandes OQTF par priorité
  static async findAll(limit = 50, offset = 0) {
    const query = `
      SELECT *, 
        CASE 
          WHEN delai_restant <= 7 THEN 'CRITIQUE'
          WHEN delai_restant <= 15 THEN 'URGENT'
          WHEN delai_restant <= 30 THEN 'IMPORTANT'
          ELSE 'NORMAL'
        END as niveau_urgence
      FROM oqtf_urgence 
      ORDER BY priorite ASC, delai_restant ASC, created_at ASC
      LIMIT $1 OFFSET $2;
    `;
    const result = await db.query(query, [limit, offset]);
    return result.rows;
  }

  // Récupérer les cas critiques (délai <= 7 jours)
  static async findCritical() {
    const query = `
      SELECT * FROM oqtf_urgence 
      WHERE delai_restant <= 7 
      ORDER BY delai_restant ASC, created_at ASC;
    `;
    const result = await db.query(query);
    return result.rows;
  }

  // Récupérer par type d'OQTF
  static async findByType(type_oqtf) {
    const query = `
      SELECT * FROM oqtf_urgence 
      WHERE type_oqtf = $1 
      ORDER BY delai_restant ASC;
    `;
    const result = await db.query(query, [type_oqtf]);
    return result.rows;
  }

  // Mettre à jour le statut
  static async updateStatus(id, statut) {
    const query = `
      UPDATE oqtf_urgence 
      SET statut = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $2 
      RETURNING *;
    `;
    const result = await db.query(query, [statut, id]);
    return result.rows[0];
  }

  // Mettre à jour la priorité
  static async updatePriority(id, priorite) {
    const query = `
      UPDATE oqtf_urgence 
      SET priorite = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $2 
      RETURNING *;
    `;
    const result = await db.query(query, [priorite, id]);
    return result.rows[0];
  }

  // Récupérer par ID
  static async findById(id) {
    const query = 'SELECT * FROM oqtf_urgence WHERE id = $1;';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // Statistiques par délai
  static async getStatsByDelay() {
    const query = `
      SELECT 
        COUNT(CASE WHEN delai_restant <= 7 THEN 1 END) as critique,
        COUNT(CASE WHEN delai_restant BETWEEN 8 AND 15 THEN 1 END) as urgent,
        COUNT(CASE WHEN delai_restant BETWEEN 16 AND 30 THEN 1 END) as important,
        COUNT(CASE WHEN delai_restant > 30 THEN 1 END) as normal,
        COUNT(*) as total
      FROM oqtf_urgence 
      WHERE statut = 'urgent';
    `;
    const result = await db.query(query);
    return result.rows[0];
  }
}

module.exports = OQTFUrgenceModel;

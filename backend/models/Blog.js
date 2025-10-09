const db = require('../services/database');

class BlogModel {
  // Récupérer tous les articles publiés
  static async findAllPublished(limit = 20, offset = 0) {
    const query = `
      SELECT 
        id,
        titre as title,
        auteur as author,
        email_auteur as email_author,
        contenu as content,
        extrait as excerpt,
        statut as status,
        image_couverture as image_url,
        created_at,
        updated_at,
        published_at as published_date,
        created_by,
        updated_by
      FROM blog_articles 
      WHERE statut = 'publié' 
      ORDER BY published_at DESC, created_at DESC 
      LIMIT $1 OFFSET $2;
    `;
    const result = await db.query(query, [limit, offset]);
    return result.rows;
  }

  // Récupérer un article par son ID
  static async findById(id) {
    const query = `
      SELECT 
        id,
        titre as title,
        auteur as author,
        email_auteur as email_author,
        contenu as content,
        extrait as excerpt,
        statut as status,
        image_couverture as image_url,
        created_at,
        updated_at,
        published_at as published_date,
        created_by,
        updated_by
      FROM blog_articles 
      WHERE id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // Récupérer tous les articles (avec filtre par statut)
  static async findAll(statut = null, limit = 50, offset = 0) {
    let query = `
      SELECT 
        id,
        titre as title,
        auteur as author,
        email_auteur as email_author,
        contenu as content,
        extrait as excerpt,
        statut as status,
        image_couverture as image_url,
        created_at,
        updated_at,
        published_at as published_date,
        created_by,
        updated_by
      FROM blog_articles
    `;
    
    const params = [];
    let paramIndex = 1;
    
    if (statut) {
      query += ` WHERE statut = $${paramIndex++}`;
      params.push(statut);
    }
    
    query += ` ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    params.push(limit, offset);
    
    const result = await db.query(query, params);
    return result.rows;
  }

  // Créer un nouvel article
  static async create(data) {
    const {
      titre,
      auteur,
      emailAuteur,
      contenu,
      extrait,
      statut = 'brouillon',
      imageCouverture,
      createdBy
    } = data;

    const publishedAt = statut === 'publié' ? new Date() : null;

    const query = `
      INSERT INTO blog_articles 
      (titre, auteur, email_auteur, contenu, extrait, statut, image_couverture, published_at, created_by, updated_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9)
      RETURNING *;
    `;

    const values = [titre, auteur, emailAuteur, contenu, extrait, statut, imageCouverture, publishedAt, createdBy];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  // Mettre à jour un article
  static async update(id, data) {
    const updateFields = [];
    const updateValues = [];
    let paramIndex = 1;

    if (data.titre !== undefined) {
      updateFields.push(`titre = $${paramIndex++}`);
      updateValues.push(data.titre);
    }
    if (data.auteur !== undefined) {
      updateFields.push(`auteur = $${paramIndex++}`);
      updateValues.push(data.auteur);
    }
    if (data.emailAuteur !== undefined) {
      updateFields.push(`email_auteur = $${paramIndex++}`);
      updateValues.push(data.emailAuteur);
    }
    if (data.contenu !== undefined) {
      updateFields.push(`contenu = $${paramIndex++}`);
      updateValues.push(data.contenu);
    }
    if (data.extrait !== undefined) {
      updateFields.push(`extrait = $${paramIndex++}`);
      updateValues.push(data.extrait);
    }
    if (data.statut !== undefined) {
      updateFields.push(`statut = $${paramIndex++}`);
      updateValues.push(data.statut);
      
      // Si le statut passe à "publié", mettre à jour published_at
      if (data.statut === 'publié') {
        updateFields.push(`published_at = $${paramIndex++}`);
        updateValues.push(new Date());
      }
    }
    if (data.imageCouverture !== undefined) {
      updateFields.push(`image_couverture = $${paramIndex++}`);
      updateValues.push(data.imageCouverture);
    }
    if (data.updatedBy !== undefined) {
      updateFields.push(`updated_by = $${paramIndex++}`);
      updateValues.push(data.updatedBy);
    }

    if (updateFields.length === 0) {
      return null;
    }

    updateValues.push(id);

    const query = `
      UPDATE blog_articles 
      SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramIndex}
      RETURNING *;
    `;

    const result = await db.query(query, updateValues);
    return result.rows[0];
  }

  // Supprimer un article
  static async delete(id) {
    const query = `
      DELETE FROM blog_articles 
      WHERE id = $1 
      RETURNING id, titre;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // Compter les articles publiés
  static async countPublished() {
    const query = `
      SELECT COUNT(*) as total 
      FROM blog_articles 
      WHERE statut = 'publié';
    `;
    const result = await db.query(query);
    return parseInt(result.rows[0].total);
  }

  // Statistiques du blog
  static async getStats() {
    const query = `
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE statut = 'publié') as publies,
        COUNT(*) FILTER (WHERE statut = 'brouillon') as brouillons,
        COUNT(*) FILTER (WHERE statut = 'archivé') as archives
      FROM blog_articles;
    `;
    const result = await db.query(query);
    return result.rows[0];
  }
}

module.exports = BlogModel;


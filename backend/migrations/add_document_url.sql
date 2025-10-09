-- Migration pour ajouter la colonne document_url aux tables existantes

-- Ajouter document_url à la table contact_forms
ALTER TABLE contact_forms 
ADD COLUMN IF NOT EXISTS document_url TEXT;

-- Ajouter document_url à la table consultation_requests
ALTER TABLE consultation_requests 
ADD COLUMN IF NOT EXISTS document_url TEXT;

-- Ajouter document_url à la table oqtf_urgence
ALTER TABLE oqtf_urgence 
ADD COLUMN IF NOT EXISTS document_url TEXT;

-- Vérification des colonnes ajoutées
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'consultation_requests' 
AND column_name = 'document_url';
